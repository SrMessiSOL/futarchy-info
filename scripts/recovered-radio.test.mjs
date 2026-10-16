import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createHash} from 'node:crypto'
import {auditTranscript} from './audit-transcripts.mjs'
const transcripts=JSON.parse(fs.readFileSync('content/transcripts.json'))
const resources=JSON.parse(fs.readFileSync('content/resources.json'))
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex')

test('Radio 1 opening preserves the previously reviewed second-part source and timestamps',()=>{
 const t=transcripts.find(t=>t.resourceId==='ownership-radio-1-recording')
 assert.equal(t.audioSha256,'125f21ac891da6422378349ff534de228b67d864edbcd69059e64004fa9f01da')
 assert.equal(hash(t.segments),'7be7a4cf479b58ab15c619a7a1b486d6912feaceab78577fb633ae5100ceb5fe')
 assert.equal(t.openingPart.audioSha256,'49cd498de771d5d564ecd565f1681fc7e67927bb1baee84e16bdbf058b0d9b07')
 assert.ok(t.openingPart.durationSeconds>1674 && t.openingPart.durationSeconds<1675)
 assert.equal(hash(t.openingPart.segments),t.openingPart.qualityAudit.publishedSegmentsSha256)
 assert.equal(auditTranscript(t.openingPart).issues.filter(i=>i.type!=='untranscribed-interval').length,0)
})

test('Radio 5 remains a partial clip collection with explicit source-local timing and missing clip 28',()=>{
 const t=transcripts.find(t=>t.resourceId==='ownership-radio-5-recording')
 const r=resources.find(r=>r.id===t.resourceId)
 assert.match(r.title,/partial clips/i)
 assert.match(t.warning,/PARTIAL CLIPS/)
 assert.equal(t.kind,'machine-generated-clip-collection')
 assert.equal(t.audioSha256,null)
 assert.deepEqual(t.sourceParts.map(p=>p.clipNumber),Array.from({length:46},(_,i)=>i+1).filter(n=>n!==28))
 let offset=0
 for(const p of t.sourceParts){assert.equal(p.offset,offset);offset+=p.durationSeconds}
 assert.equal(t.durationSeconds,offset)
 for(const s of t.segments){
  const p=t.sourceParts.find(p=>p.clipNumber===s.sourceClip)
  assert.ok(p)
  assert.ok(s.sourceStart>=0 && s.sourceEnd<=p.durationSeconds)
  assert.ok(Math.abs(s.start-p.offset-s.sourceStart)<1e-6)
  assert.ok(Math.abs(s.end-p.offset-s.sourceEnd)<1e-6)
 }
 assert.equal(t.audioManifestSha256,hash(t.sourceParts.map(p=>({clipNumber:p.clipNumber,audioSha256:p.audioSha256}))))
})

test('recovered Radio shows replace internal reminders without inventing backup publication dates',()=>{
 for(const n of [3,5,7,15]){
  const id=`ownership-radio-${n}-recording`,r=resources.find(r=>r.id===id)
  const reminder=resources.find(r=>new RegExp('^Ownership Radio #'+n+' . announcement$').test(r.title))
  assert.ok(r && !r.catalogOnly)
  assert.equal(reminder.catalogOnly,true)
  assert.equal(reminder.supersededBy,id)
  assert.ok(transcripts.find(t=>t.resourceId===id))
  if(n===3){assert.equal(r.date,'2026-03-22');assert.equal(r.dateKind,'event')}
  else {assert.equal(r.date,null);assert.equal(r.datePrecision,'unknown')}
 }
 assert.ok(!transcripts.some(t=>t.resourceId==='ownership-radio-4-recording'))
 assert.ok(!transcripts.some(t=>t.resourceId==='ownership-radio-13-recording'))
})

test('transcription lengths match independently decoded complete sources',()=>{
 for(const [n,duration] of [[3,5721.8346875],[7,12597.8453125],[15,7974.05]]){
  const t=transcripts.find(t=>t.resourceId===`ownership-radio-${n}-recording`)
  assert.ok(Math.abs(t.durationSeconds-duration)<0.1,`Radio ${n} must not stop at a rounded chunk boundary`)
  assert.ok(t.segments.at(-1).end>duration-180)
 }
})

test('mislabeled Radio 13 backup is documented as identical audio to existing Radio 12',()=>{
 const evidence=JSON.parse(fs.readFileSync('maintenance/recovered-radio-2026-10-15/evidence.json'))
 assert.equal(evidence.duplicateBackup.decodedSources.length,2)
 assert.equal(new Set(evidence.duplicateBackup.decodedSources.map(x=>x.decodedMono16kPcmHash)).size,1)
 assert.equal(evidence.duplicateBackup.canonicalResourceId,'ownership-radio-12-recording')
})

test('recovery exceptions authorize only these shows and do not republish unrelated failed-raise sources',()=>{
 const exceptions=JSON.parse(fs.readFileSync('content/publication-exceptions.json'));
 assert.deepEqual(exceptions.recoveredRadio.resourceIds.slice().sort(),[3,5,7,15].map(n=>`ownership-radio-${n}-recording`).sort());
 assert.equal(exceptions.resourceIds.length,37);
 const tributary=resources.filter(r=>r.tags?.includes('project:tributary')&&r.id!=='ownership-radio-7-recording');
 assert.ok(tributary.length>0);
 assert.ok(tributary.every(r=>r.catalogOnly));
});
