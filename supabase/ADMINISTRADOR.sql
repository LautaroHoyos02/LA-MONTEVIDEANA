-- Ejecutar SOLO desde Supabase > SQL Editor después de registrar y confirmar tu cuenta.
-- Reemplazar CAMBIAR_POR_TU_CORREO por el correo exacto de la cuenta administrativa.
-- No se crean contraseñas ni se asigna administrador al primer usuario automáticamente.
do $$
declare account_id uuid;
begin
 select id into account_id from auth.users where lower(email)=lower('CAMBIAR_POR_TU_CORREO');
 if account_id is null then raise exception 'Primero registrá la cuenta y reemplazá CAMBIAR_POR_TU_CORREO'; end if;
 update public.profiles set role='admin' where id=account_id;
 if not found then raise exception 'Primero ejecutá INSTALAR.sql'; end if;
end $$;
