import {readFile,appendFile} from 'node:fs/promises';
import {validateCatalog,canonicalUrl} from './catalog.mjs';
const read=async p=>JSON.parse(await readFile(p,'utf8'));
export function validateProposal(baseline, proposed, evidence) {
let changes=0, additions=0;
for(const old of baseline) if(!proposed.find(r=>r.id===old.id))throw new Error(`Cannot remove ${old.id}`);
for(const row of proposed){
  const old=baseline.find(r=>r.id===row.id);
  if(JSON.stringify(old)===JSON.stringify(row))continue;
  changes++; if(!old)additions++;
  if(old && (old.url!==row.url || old.duplicateOf!==row.duplicateOf))throw new Error(`URL/alias changes require manual review: ${row.id}`);
  const proof=evidence.find(e=>e.status==='fetched' && !e.truncated && [e.url,e.finalUrl].some(u=>canonicalUrl(u)===canonicalUrl(row.sourceUrl)));
  if(!proof || proof.textLength<200 || !proof.sha256)throw new Error(`No complete fetched evidence for ${row.id}`);
  if(![proof.url,proof.finalUrl].some(u=>canonicalUrl(u)===canonicalUrl(row.url)))throw new Error(`Resource URL does not match its evidence: ${row.id}`);
  if(row.verification!=='source-checked'||row.checkedAt!==proof.fetchedAt||(!old&&row.addedAt!==proof.fetchedAt))throw new Error(`Invalid verification dates for ${row.id}`);
  if(old&&row.addedAt!==old.addedAt)throw new Error(`Cannot rewrite addition history: ${row.id}`);
}
if(additions>10)throw new Error('At most 10 additions per weekly batch');
if(changes>15)throw new Error('At most 15 changed records per weekly batch');
return {changes,additions};
}
if(process.argv[1]?.endsWith('validate-proposal.mjs')) {
  const result=validateProposal(await read('work/baseline.json'),validateCatalog(await read('content/resources.json'),await read('maintenance/legacy-ids.json')),await read('work/evidence-provenance.json'));
  console.log(`Evidence gate passed: ${result.changes} changes, ${result.additions} additions.`);
  if(process.env.GITHUB_OUTPUT)await appendFile(process.env.GITHUB_OUTPUT,`changed=${result.changes>0}\n`);
}
