// Mensajes seguros: no exponer respuestas crudas, tokens o datos de otros usuarios.
export function authErrorMessage(error){
 const code=error?.code||'';
 if(code==='email_not_confirmed')return 'Falta confirmar tu correo. Abrí el mensaje de Supabase y confirmá la cuenta antes de ingresar.';
 if(code==='invalid_credentials')return 'El correo o la contraseña no coinciden. Si no recordás la contraseña, usá «Olvidé mi contraseña».';
 if(['over_request_rate_limit','over_email_send_rate_limit'].includes(code)||error?.status===429)return 'Hubo demasiados intentos. Esperá unos minutos antes de volver a ingresar.';
 if(code==='account_load_failed')return 'El correo y la contraseña fueron aceptados, pero no pudimos cargar tu cuenta y sus permisos. '+(error.reference?'Referencia: '+error.reference+'. ':'')+'Contactá al administrador para revisar el acceso.';
 if(error?.name==='AuthRetryableFetchError'||error?.name==='TypeError')return 'No pudimos conectar con el servicio de cuentas. Revisá tu conexión y volvé a intentar.';
 return 'No pudimos completar el ingreso. Volvé a intentar; si continúa, compartí este mensaje con el administrador.';
}
