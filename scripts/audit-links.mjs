import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {safeFetch} from './network.mjs';
const rows=JSON.parse(await readFile('content/resources.json','utf8'));
const results=[];
// Small concurrency and per-request deadlines; a blocked source is not a deleted resource.
const urls=[...new Set(rows.map(r=>r.url))];
let index=0;
await Promise.all(Array.from({length:4},async()=>{
  while(index<urls.length){
    const url=urls[index++];
    try{
      let result=await safeFetch(url,{method:'HEAD'});
      if([403,405,501].includes(result.status)) result=await safeFetch(url,{maxBytes:500000});
      results.push({url,status:result.status,finalUrl:result.url,classification:result.status===200?'reachable':[404,410].includes(result.status)?'missing':'unverified'});
    }catch(e){results.push({url,classification:'unverified',reason:e.message});}
  }
}));
results.sort((a,b)=>a.url.localeCompare(b.url));
await mkdir('work',{recursive:true});
await writeFile('work/link-audit.json',JSON.stringify({checkedAt:new Date().toISOString(),results},null,2)+'\n');
const problems=results.filter(r=>r.classification!=='reachable');
await writeFile('work/link-audit.md',`# Link audit\n\n${results.length} URLs checked; ${results.length-problems.length} reachable; ${problems.length} require review. HTTP reachability does not verify content.\n\n`+problems.map(r=>`- ${r.classification}: ${r.url} (${r.status??r.reason})`).join('\n')+'\n');
console.log(`${results.length} URLs checked; ${problems.length} require review. See work/link-audit.md.`);
if(results.some(r=>r.classification==='missing'))process.exitCode=1;
