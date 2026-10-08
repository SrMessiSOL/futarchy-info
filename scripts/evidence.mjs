import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {safeFetch,textOnly} from './network.mjs';
import {canonicalUrl} from './catalog.mjs';
import {createHash} from 'node:crypto';
const read=async p=>JSON.parse(await readFile(p,'utf8'));
const sources=await read('maintenance/sources.json');
const state=await read('maintenance/discovery.json');
const known=new Set((await read('content/resources.json')).map(r=>canonicalUrl(r.url)));
const candidates=state.candidates.filter(c=>c.status==='pending'&&!known.has(canonicalUrl(c.url))).sort((a,b)=>b.discoveredAt.localeCompare(a.discoveredAt));
const evidence=[];
// Rotate by week so inaccessible or irrelevant entries cannot permanently starve the backlog.
const offset=candidates.length ? (Math.floor(Date.now()/604800000)*15)%candidates.length : 0;
for(const candidate of [...candidates.slice(offset),...candidates.slice(0,offset)].slice(0,15)) {
  const source=sources.find(s=>s.id===candidate.sourceId);
  if(!source)continue;
  try{
    const r=await safeFetch(candidate.url,{hosts:source.hosts});
    if(r.status!==200)throw new Error(`HTTP ${r.status}`);
    const text=textOnly(r.text);const truncated=text.length>45000;
    evidence.push({...candidate,fetchedAt:new Date().toISOString().slice(0,10),finalUrl:r.url,status:'fetched',truncated,text:text.slice(0,45000)});
  }catch(e){evidence.push({...candidate,status:'unavailable',reason:e.message});}
}
await mkdir('work',{recursive:true});
await writeFile('work/evidence.json',JSON.stringify(evidence,null,2)+'\n');
// Public workflow artifacts carry provenance metadata, not full publisher text.
await writeFile('work/evidence-provenance.json',JSON.stringify(evidence.map(({text,...entry})=>({...entry,textLength:text?.length ?? 0,sha256:text ? createHash('sha256').update(text).digest('hex') : null})),null,2)+'\n');
console.log(`Prepared ${evidence.length} candidate evidence records.`);
