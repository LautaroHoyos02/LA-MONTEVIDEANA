import {createClient} from './vendor/supabase.js';
import {supabaseConfig} from './supabase-config.js';
export function createBackend({storage,fetch,origin}){
 const client=createClient(supabaseConfig.url,supabaseConfig.publishableKey,{auth:{storage,storageKey:'lm-supabase-auth',flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true},global:{fetch}});
 const check=async promise=>{const {data,error}=await promise;if(error)throw error;return data};
 const rows=async table=>check(client.from(table).select('*'));
 return {
  client,
  async user(){const {data:{session},error}=await client.auth.getSession();if(error)throw error;if(!session)return null;return (await check(client.auth.getUser())).user},
  catalog:()=>check(client.rpc('get_catalog')),
  branches:()=>rows('branches'),
  settings:async()=>{const r=await rows('site_settings');return r.find(x=>x.id==='brand')?.data||{}},
  profile:async id=>check(client.from('profiles').select('*').eq('id',id).single()),
  profiles:()=>check(client.from('profiles').select('*').order('created_at',{ascending:false})),
  orders:async()=> (await check(client.from('inquiries').select('*').order('created_at',{ascending:false}))).map(r=>({...r.snapshot,id:r.id,created:r.created_at,status:r.status,userId:r.user_id})),
  favorites:async id=>(await check(client.from('favorites').select('product_id').eq('user_id',id))).map(r=>r.product_id),
  favorite:(userId,id,enabled)=>enabled?check(client.from('favorites').insert({user_id:userId,product_id:id})):check(client.from('favorites').delete().eq('user_id',userId).eq('product_id',id)),
  activity:async()=> (await check(client.from('activity').select('*').order('at',{ascending:false}).limit(250))).map(r=>({...r,actor:r.actor||'Configuración inicial'})),
  login:(email,password)=>check(client.auth.signInWithPassword({email,password})),
  signup:(email,password,name,business)=>check(client.auth.signUp({email,password,options:{data:{name,business},emailRedirectTo:origin+'/'}})),
  reset:email=>check(client.auth.resetPasswordForEmail(email,{redirectTo:origin+'/'})),
  password:password=>check(client.auth.updateUser({password})),
  logout:()=>check(client.auth.signOut({scope:'local'})),
  saveProfile:(id,name,business)=>check(client.from('profiles').update({name,business}).eq('id',id)),
  saveProduct:product=>check(client.rpc('admin_save_product',{product})),
  saveBranches:branches=>check(client.from('branches').upsert(branches.map(b=>({id:b.id,data:b})))),
  saveSettings:data=>check(client.from('site_settings').upsert({id:'brand',data})),
  setRole:(target,new_role)=>check(client.rpc('admin_set_role',{target,new_role})),
  stock:items=>check(client.rpc('admin_import_stock',{items})),
  status:(id,status)=>check(client.from('inquiries').update({status}).eq('id',id)),
  inquiry:(items,branch_id,notes,request_id)=>check(client.rpc('create_inquiry',{items,branch_id,notes,request_id}))
 };
}
