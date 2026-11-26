// Reconoce errores del proveedor sin interpretar enlaces PKCE o tokens válidos como rutas.
export function authCallbackError(href){
 const url=new URL(href),fragment=url.hash.slice(1);
 const hash=fragment.startsWith('/')?new URLSearchParams():new URLSearchParams(fragment);
 const query=url.searchParams;
 if(!query.has('error')&&!query.has('error_code')&&!hash.has('error')&&!hash.has('error_code'))return null;
 const code=hash.get('error_code')||query.get('error_code');
 const message=code==='otp_expired'?'El enlace venció, ya fue utilizado o no es válido. Solicitá una nueva confirmación y abrí únicamente el último correo.':'No pudimos completar la confirmación del correo. Podés solicitar un nuevo enlace o volver a iniciar sesión si ya confirmaste tu cuenta.';
 for(const key of ['error','error_code','error_description','sb'])query.delete(key);
 url.hash='/cuenta?mode=confirmar';
 return {href:url.href,message};
}
