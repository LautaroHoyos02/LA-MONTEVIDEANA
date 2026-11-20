const previousPlaceholderIds=new Set(['lm-caja-palitos','lm-caja-bombones','lm-caja-cucuruchos','lm-bulto-crema','lm-bulto-chocolate','lm-bulto-frutilla']);
// Una actualización de recursos no borra solicitudes, precios editados o productos personalizados.
export function reconcileCatalog(state,seeds,version){
 const revision=state.catalogRevision??state.settings?.catalogVersion??0;
 if(revision>=version)return{...state,catalogRevision:version};
 const byId=new Map((state.products||[]).map(p=>[p.id,p]));
 const products=seeds.map(seed=>byId.has(seed.id)?{...seed,...byId.get(seed.id),image:seed.image,sourceFile:seed.sourceFile}:structuredClone(seed));
 const seedIds=new Set(seeds.map(p=>p.id));
 for(const p of state.products||[]){if(seedIds.has(p.id))continue;products.push(previousPlaceholderIds.has(p.id)?{...p,active:false,archived:true}:p)}
 return{...state,products,catalogRevision:version,settings:{...state.settings,catalogVersion:version}};
}
