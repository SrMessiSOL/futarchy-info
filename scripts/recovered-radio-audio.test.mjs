import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createHash} from 'node:crypto'
const read=p=>JSON.parse(fs.readFileSync(p))
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex')
test('recovered Radio audio corrections reconstruct the previous published transcripts',()=>{
 const evidence=read('maintenance/recovered-radio-audio-2026-10-16/evidence.json')
 const transcripts=read('content/transcripts.json')
 const prior=read('maintenance/recovered-radio-2026-10-15/evidence.json')
 for(const review of evidence.reviews){
  const t=transcripts.find(t=>t.resourceId===review.resourceId)
  assert.equal(hash(t.segments),review.publishedSegmentsSha256)
  assert.equal(t.audioSha256,review.audioSha256)
  const segments=structuredClone(t.segments)
  for(const c of evidence.changes.filter(c=>c.resourceId===t.resourceId).reverse()){
   assert.deepEqual(segments[c.index],c.replacement)
   assert.equal(c.original.start,c.replacement.start)
   assert.equal(c.original.end,c.replacement.end)
   assert.ok(c.evidence.length)
   segments[c.index]=c.original
  }
  assert.equal(hash(segments),review.previousSegmentsSha256)
  assert.equal(hash(segments),prior.recordings.find(r=>r.resourceId===t.resourceId).publishedSegmentsSha256)
 }
 assert.equal(evidence.audioRechecks.length,8)
 for(const c of evidence.audioRechecks){assert.match(c.pcmSha256,/^[a-f0-9]{64}$/);assert.ok(c.segments.length)}
 const r3=transcripts.find(t=>t.resourceId==='ownership-radio-3-recording')
 assert.ok(r3.segments.some(s=>s.text.includes('[raise cap unclear]')))
 const r5=transcripts.find(t=>t.resourceId==='ownership-radio-5-recording')
 assert.match(r5.title,/partial clips/i)
 assert.equal(r5.sourceParts.length,45)
})
