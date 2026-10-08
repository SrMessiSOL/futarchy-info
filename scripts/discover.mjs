import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { safeFetch, extractLinks } from './network.mjs';
import { canonicalUrl } from './catalog.mjs';
export function mergeCandidates(state, links, sourceId, known, today) {
  const pending=new Set(state.candidates.map(c=>canonicalUrl(c.url)));
  let added=0;
  for(const link of links) {
    const key=canonicalUrl(link.url);
    if(known.has(key)||pending.has(key))continue;
    state.candidates.push({...link,sourceId,discoveredAt:today,status:'pending'});pending.add(key);added++;
  }
  return added;
}
export async function discover() {
  const read=async p=>JSON.parse(await readFile(p,'utf8'));
  const sources=await read('maintenance/sources.json');
  const state=await read('maintenance/discovery.json');
  const known=new Set((await read('content/resources.json')).map(r=>canonicalUrl(r.url)));
  const today=new Date().toISOString().slice(0,10);let total=0;let newFailures=0;const failures=[];
  for(const source of sources) {
    try {
      const result=await safeFetch(source.url,{hosts:source.hosts});
      if(result.status!==200)throw new Error(`HTTP ${result.status}`);
      const links=extractLinks(result.text,source);
      if(!links.length)throw new Error('No matching links; source may require JavaScript or its structure changed');
      total+=mergeCandidates(state,links,source.id,known,today);
      state.sources[source.id]={status:'ok',lastSuccess:today,links:links.length};
    }catch(e){
      if(state.sources[source.id]?.status!=='unavailable' || state.sources[source.id]?.reason!==e.message)newFailures++;
      state.sources[source.id]={...state.sources[source.id],status:'unavailable',lastAttempt:today,reason:e.message};failures.push(`${source.name}: ${e.message}`);
    }
  }
  // Keep rejected candidates as durable seen history; never silently forget them.
  await writeFile('maintenance/discovery.json',JSON.stringify(state,null,2)+'\n');
  await mkdir('work',{recursive:true});
  await writeFile('work/discovery-report.md',`# Discovery\n\nNew candidates: ${total}. Pending: ${state.candidates.filter(c=>c.status==='pending'&&!known.has(canonicalUrl(c.url))).length}.\n\n${failures.map(f=>'- '+f).join('\n') || 'All configured sources returned links.'}\n`);
  console.log(`Discovered ${total} new candidates; ${failures.length} unavailable sources.`);
  if(newFailures>0 || failures.length===sources.length) process.exitCode=1;
}
if(process.argv[1]?.endsWith('discover.mjs'))await discover();
