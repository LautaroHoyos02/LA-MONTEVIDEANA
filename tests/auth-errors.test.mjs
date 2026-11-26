import {test} from 'node:test';import assert from 'node:assert/strict';import {authErrorMessage} from '../public/auth-errors.js';
test('ingreso distingue confirmación, credenciales, límites y carga posterior sin exponer respuestas',()=>{
 assert.match(authErrorMessage({code:'email_not_confirmed'}),/Falta confirmar/);
 assert.match(authErrorMessage({code:'invalid_credentials'}),/no coinciden/);
 assert.match(authErrorMessage({status:429}),/demasiados intentos/);
 const load=authErrorMessage({code:'account_load_failed',reference:'PGRST116'});
 assert.match(load,/fueron aceptados/);assert.match(load,/PGRST116/);
 assert.doesNotMatch(authErrorMessage({message:'token privado y datos personales'}),/token privado|datos personales/);
});
