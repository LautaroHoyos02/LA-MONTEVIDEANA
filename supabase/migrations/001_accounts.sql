-- Ejecutar como propietario desde Supabase > SQL Editor. No contiene contraseñas.
begin;
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 name text not null default '' check(length(name)<=150),
 business text not null default '' check(length(business)<=150),
 role text not null default 'wholesale_pending' check(role in ('admin','wholesale','wholesale_pending','suspended')),
 created_at timestamptz not null default now()
);
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.profiles where id=auth.uid() and role='admin');
$$;
create or replace function public.has_wholesale() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.profiles where id=auth.uid() and role in ('admin','wholesale'));
$$;
create or replace function public.on_user_created() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.profiles(id,name,business) values(new.id,left(coalesce(new.raw_user_meta_data->>'name',''),150),left(coalesce(new.raw_user_meta_data->>'business',''),150));
 return new;
end $$;
drop trigger if exists lm_new_user on auth.users;
create trigger lm_new_user after insert on auth.users for each row execute function public.on_user_created();
insert into public.profiles(id,name,business) select id,left(coalesce(raw_user_meta_data->>'name',''),150),left(coalesce(raw_user_meta_data->>'business',''),150) from auth.users on conflict(id) do nothing;

create table if not exists public.products (
 id text primary key check(length(id)<=100),
 data jsonb not null check(jsonb_typeof(data)='object' and length(data::text)<=1600000),
 retail_price integer not null default 0 check(retail_price between 0 and 10000000),
 stock integer check(stock between 0 and 10000000),
 active boolean not null default true
);
create table if not exists public.wholesale_prices (
 product_id text primary key references public.products(id) on delete cascade,
 price integer not null default 0 check(price between 0 and 10000000)
);
create table if not exists public.branches (id text primary key, data jsonb not null check(jsonb_typeof(data)='object'));
create table if not exists public.site_settings (id text primary key check(id='brand'), data jsonb not null check(jsonb_typeof(data)='object'));
create table if not exists public.inquiries (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 request_key uuid not null,
 created_at timestamptz not null default now(),
 status text not null default 'Consulta preparada' check(status in ('Consulta preparada','En seguimiento','Consulta cerrada')),
 snapshot jsonb not null,
 unique(user_id,request_key)
);
create table if not exists public.favorites (
 user_id uuid not null references auth.users(id) on delete cascade,
 product_id text not null references public.products(id) on delete cascade,
 primary key(user_id,product_id)
);
create table if not exists public.activity (
 id bigint generated always as identity primary key,
 actor uuid references auth.users(id) on delete set null,
 at timestamptz not null default now(),
 action text not null
);
create or replace function public.audit_change() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.activity(actor,action) values(auth.uid(),tg_op||' '||tg_table_name||' '||coalesce(to_jsonb(new)->>'id',to_jsonb(old)->>'id',to_jsonb(new)->>'product_id',''));
 return coalesce(new,old);
end $$;
do $$ declare t text; begin
 foreach t in array array['profiles','products','wholesale_prices','branches','site_settings','inquiries'] loop
 execute format('drop trigger if exists lm_audit on public.%I',t);
 execute format('create trigger lm_audit after insert or update or delete on public.%I for each row execute function public.audit_change()',t);
 end loop;
end $$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.wholesale_prices enable row level security;
alter table public.branches enable row level security;
alter table public.site_settings enable row level security;
alter table public.inquiries enable row level security;
alter table public.favorites enable row level security;
alter table public.activity enable row level security;
-- Grants explícitos: funciona también con los grants automáticos desactivados.
revoke all on public.profiles,public.products,public.wholesale_prices,public.branches,public.site_settings,public.inquiries,public.favorites,public.activity from anon,authenticated;
grant usage on schema public to anon,authenticated;
grant select on public.profiles,public.wholesale_prices,public.inquiries,public.activity to authenticated;
grant update(name,business) on public.profiles to authenticated;
grant update(status) on public.inquiries to authenticated;
grant select on public.branches,public.site_settings to anon,authenticated;
grant insert,update,delete on public.branches,public.site_settings to authenticated;
grant select,insert,delete on public.favorites to authenticated;
-- Products se consultan únicamente mediante get_catalog: no se exponen precios privados.
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select to authenticated using(id=auth.uid() or public.is_admin());
drop policy if exists profiles_edit on public.profiles;
create policy profiles_edit on public.profiles for update to authenticated using(id=auth.uid()) with check(id=auth.uid());
drop policy if exists wholesale_read on public.wholesale_prices;
create policy wholesale_read on public.wholesale_prices for select to authenticated using(public.has_wholesale());
drop policy if exists inquiries_read on public.inquiries;
create policy inquiries_read on public.inquiries for select to authenticated using(user_id=auth.uid() or public.is_admin());
drop policy if exists inquiries_edit on public.inquiries;
create policy inquiries_edit on public.inquiries for update to authenticated using(public.is_admin()) with check(public.is_admin());
drop policy if exists favorites_own on public.favorites;
create policy favorites_own on public.favorites for all to authenticated using(user_id=auth.uid()) with check(user_id=auth.uid());
drop policy if exists activity_admin on public.activity;
create policy activity_admin on public.activity for select to authenticated using(public.is_admin());
do $$ declare t text; begin
 foreach t in array array['branches','site_settings'] loop
 execute format('drop policy if exists public_read on public.%I',t);
 execute format('create policy public_read on public.%I for select to anon,authenticated using(true)',t);
 execute format('drop policy if exists admin_write on public.%I',t);
 execute format('create policy admin_write on public.%I for all to authenticated using(public.is_admin()) with check(public.is_admin())',t);
 end loop;
end $$;

create or replace function public.get_catalog() returns setof jsonb language sql stable security definer set search_path='' as $$
 select (p.data - array['price','retailPrice','wholesalePrice','stock','active','id']) || jsonb_build_object('id',p.id,'active',p.active,'stock',p.stock,'price',case when public.has_wholesale() then coalesce(w.price,p.retail_price) else p.retail_price end,'priceTier',case when public.has_wholesale() then 'wholesale' else 'retail' end)
 || case when public.is_admin() then jsonb_build_object('retailPrice',p.retail_price,'wholesalePrice',coalesce(w.price,0)) else '{}'::jsonb end
 from public.products p left join public.wholesale_prices w on w.product_id=p.id where p.active or public.is_admin() order by p.id;
$$;
create or replace function public.admin_save_product(product jsonb) returns void language plpgsql security definer set search_path='' as $$
declare rid text; rp integer; wp integer;
begin
 if not public.is_admin() then raise exception 'Acceso administrativo requerido' using errcode='42501'; end if;
 rid:=product->>'id'; rp:=(product->>'retailPrice')::integer; wp:=(product->>'wholesalePrice')::integer;
 if rid is null or rp is null or wp is null or rp<0 or wp<0 or wp>rp then raise exception 'Revisá ambos precios: el mayorista no puede superar al minorista'; end if;
 if length(coalesce(product->>'name','')) not between 1 and 150 then raise exception 'Nombre inválido'; end if;
 if product->>'saleUnit' not in ('caja','bulto') then raise exception 'Presentación inválida'; end if;
 if not ((product->>'image') ~ '^/assets/' or (product->>'image') ~ '^data:image/(jpeg|png|webp);base64,') then raise exception 'Imagen inválida'; end if;
 insert into public.products(id,data,retail_price,stock,active) values(rid,product-array['price','retailPrice','wholesalePrice','priceTier','stock','active'],rp,(product->>'stock')::integer,coalesce((product->>'active')::boolean,true))
 on conflict(id) do update set data=excluded.data,retail_price=excluded.retail_price,stock=excluded.stock,active=excluded.active;
 insert into public.wholesale_prices(product_id,price) values(rid,wp) on conflict(product_id) do update set price=excluded.price;
end $$;
create or replace function public.admin_set_role(target uuid,new_role text) returns void language plpgsql security definer set search_path='' as $$
begin
 if not public.is_admin() then raise exception 'Acceso administrativo requerido' using errcode='42501'; end if;
 -- Asignar administradores se realiza únicamente desde SQL Editor, no desde el navegador.
 if new_role not in ('wholesale','wholesale_pending','suspended') or target=auth.uid() then raise exception 'Cambio de permiso no permitido'; end if;
 update public.profiles set role=new_role where id=target and role<>'admin';
 if not found then raise exception 'Cliente no encontrado o administrador protegido'; end if;
end $$;
create or replace function public.admin_import_stock(items jsonb) returns void language plpgsql security definer set search_path='' as $$
declare item jsonb;
begin
 if not public.is_admin() then raise exception 'Acceso administrativo requerido' using errcode='42501'; end if;
 if jsonb_typeof(items)<>'array' or jsonb_array_length(items)>1000 then raise exception 'Inventario inválido'; end if;
 for item in select value from jsonb_array_elements(items) loop
 update public.products set stock=(item->>'stock')::integer where id=item->>'id';
 if not found then raise exception 'Producto inexistente'; end if;
 end loop;
end $$;
create or replace function public.create_inquiry(items jsonb,branch_id text,notes text,request_id uuid) returns jsonb language plpgsql security definer set search_path='' as $$
declare item jsonb; p record; b jsonb; lines jsonb:='[]'; qty integer; unit_price integer; total bigint:=0; result public.inquiries; snap jsonb; customer public.profiles;
begin
 if auth.uid() is null then raise exception 'Iniciá sesión' using errcode='42501'; end if;
 select * into customer from public.profiles where id=auth.uid();
 if customer.role='suspended' or customer.id is null then raise exception 'Cuenta no disponible' using errcode='42501'; end if;
 if request_id is null or length(coalesce(notes,''))>500 or jsonb_typeof(items)<>'array' or jsonb_array_length(items) not between 1 and 100 then raise exception 'Consulta inválida'; end if;
 select * into result from public.inquiries where user_id=auth.uid() and request_key=request_id;
 if found then return result.snapshot||jsonb_build_object('id',result.id,'created',result.created_at,'status',result.status); end if;
 select data||jsonb_build_object('id',id) into b from public.branches where id=branch_id;
 if b is null then raise exception 'Elegí una sucursal vigente'; end if;
 if (select count(distinct value->>'id') from jsonb_array_elements(items))<>jsonb_array_length(items) then raise exception 'Productos repetidos'; end if;
 for item in select value from jsonb_array_elements(items) loop
 qty:=(item->>'qty')::integer;
 if qty is null or qty not between 1 and 9999 or (item->>'qty') !~ '^[0-9]+$' then raise exception 'Cantidad inválida'; end if;
 select products.*,w.price wholesale_price into p from public.products left join public.wholesale_prices w on w.product_id=products.id where products.id=item->>'id' and products.active;
 if not found then raise exception 'Producto no disponible'; end if;
 unit_price:=case when public.has_wholesale() then coalesce(p.wholesale_price,p.retail_price) else p.retail_price end;
 lines:=lines||jsonb_build_array((p.data-array['price','retailPrice','wholesalePrice','priceTier'])||jsonb_build_object('id',p.id,'qty',qty,'price',unit_price,'unit',unit_price,'total',unit_price::bigint*qty));
 total:=total+unit_price::bigint*qty;
 end loop;
 snap:=jsonb_build_object('number','LM-'||upper(left(request_id::text,8)),'kind','inquiry','customer',jsonb_build_object('name',customer.name,'business',customer.business,'notes',coalesce(notes,'')),'lines',lines,'subtotal',total,'total',total,'branchSnapshot',b,'stockConfirmed',false,'priceTier',case when public.has_wholesale() then 'wholesale' else 'retail' end,'delivery',jsonb_build_object('mode','pickup','branchId',branch_id,'cost',null,'date',null,'time',null));
 insert into public.inquiries(user_id,request_key,snapshot) values(auth.uid(),request_id,snap) on conflict(user_id,request_key) do nothing;
 select * into result from public.inquiries where user_id=auth.uid() and request_key=request_id;
 return result.snapshot||jsonb_build_object('id',result.id,'created',result.created_at,'status',result.status);
end $$;
-- Funciones con privilegios elevados: acceso explícito, sin EXECUTE público implícito.
revoke all on function public.on_user_created(),public.audit_change(),public.is_admin(),public.has_wholesale(),public.get_catalog(),public.admin_save_product(jsonb),public.admin_set_role(uuid,text),public.admin_import_stock(jsonb),public.create_inquiry(jsonb,text,text,uuid) from public,anon,authenticated;
grant execute on function public.is_admin(),public.has_wholesale(),public.get_catalog() to anon,authenticated;
grant execute on function public.admin_save_product(jsonb),public.admin_set_role(uuid,text),public.admin_import_stock(jsonb),public.create_inquiry(jsonb,text,text,uuid) to authenticated;
commit;
