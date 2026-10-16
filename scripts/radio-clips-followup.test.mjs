import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import{createHash}from'node:crypto'
const read=p=>JSON.parse(fs.readFileSync(p)),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex')
test('clip follow-up reconstructs the original recovery and preserves every original timestamp',()=>{
 const e=read('maintenance/radio-clips-followup-2026-10-16/evidence.json'),ts=read('content/transcripts.json'),prior=read('maintenance/recovered-radio-2026-10-15/evidence.json')
 for(const r of e.reviews){const t=ts.find(t=>t.resourceId===r.resourceId),part=r.part==='opening'?t.openingPart:t,segments=structuredClone(part.segments);assert.equal(hash(segments),r.publishedSegmentsSha256);assert.equal(part.audioSha256,r.audioSha256)
  for(const c of e.changes.filter(c=>c.part===r.part).reverse()){assert.deepEqual(segments[c.index],c.replacement);if(c.operation==='insert'){assert.equal(c.original,null);segments.splice(c.index,1)}else{assert.equal(c.original.start,c.replacement.start);assert.equal(c.original.end,c.replacement.end);segments[c.index]=c.original}}
  assert.equal(hash(segments),r.previousSegmentsSha256);assert.equal(hash(segments),r.part==='opening'?prior.opening.publishedSegmentsSha256:prior.recordings.find(r=>r.resourceId===t.resourceId).publishedSegmentsSha256)
 }
 const t5=ts.find(t=>t.resourceId==='ownership-radio-5-recording');assert.equal(hash(t5.sourceParts),e.sourcePartsSha256);assert.match(t5.title,/partial clips/i);assert.equal(t5.sourceParts.length,45)
 assert.equal(e.changes.filter(c=>c.operation==='insert').length,3);assert.equal(e.audioRechecks.length,6);assert.equal(e.confirmations.length,3)
 for(const x of [...e.audioRechecks,...e.confirmations])assert.match(x.pcmSha256,/^[a-f0-9]{64}$/)
 for(const c of e.changes.filter(c=>c.operation==='insert')){const s=c.replacement,p=t5.sourceParts.find(p=>p.clipNumber===s.sourceClip);assert.ok(s.sourceStart>=0&&s.sourceEnd<=p.durationSeconds);assert.ok(Math.abs(s.start-p.offset-s.sourceStart)<1e-6)}
})
