import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createHash} from 'node:crypto'
const read=p=>JSON.parse(fs.readFileSync(p))
const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex')
test('founder correction chains reconstruct originals and match funded published interviews',()=>{
 const ts=read('content/transcripts.json'),notes=read('content/media-notes.json'),projects=read('content/projects.json')
 const evidence=read('maintenance/founder-transcript-review-2026-10-13/evidence.json')
 assert.equal(evidence.reviews.length,6)
 for(const review of evidence.reviews){
  assert.ok(['raise','historical-raise'].includes(projects.find(p=>p.id===review.projectId).coverage))
  const t=ts.find(t=>t.resourceId===review.resourceId),restored=structuredClone(t.segments)
  assert.equal(t.audioSha256,review.audioSha256)
  const followup=read('maintenance/founder-uncertainty-followup-2026-10-13/evidence.json')
  const next=followup.reviews.find(r=>r.resourceId===t.resourceId)
  if(next){
   assert.equal(t.audioSha256,next.audioSha256)
   assert.equal(hash(restored),next.publishedSegmentsSha256)
   for(const c of followup.changes.filter(c=>c.resourceId===t.resourceId).reverse()){
    const index=restored.findIndex(s=>s.start===c.replacement.start)
    assert.deepEqual(restored[index],c.replacement)
    assert.equal(c.original.start,c.replacement.start);assert.equal(c.original.end,c.replacement.end)
    restored[index]=c.original
   }
   assert.equal(hash(restored),next.originalSegmentsSha256)
  }
  for(const c of evidence.changes.filter(c=>c.resourceId===t.resourceId).reverse()){
   const index=restored.findIndex(s=>s.start===c.replacement.start)
   assert.deepEqual(restored[index],c.replacement)
   assert.equal(c.original.start,c.replacement.start);assert.equal(c.original.end,c.replacement.end)
   restored[index]=c.original
  }
  assert.equal(hash(restored),review.originalSegmentsSha256)
  assert.equal(hash(t.segments),t.qualityAudit.publishedSegmentsSha256)
  assert.deepEqual(notes.find(n=>n.resourceId===t.resourceId).editorialChecks,t.editorialChecks)
 }
 const p2p=ts.find(t=>t.resourceId==='res-259')
 assert.ok(p2p.segments.find(s=>s.start===493.63).text.includes('[unclear amount]'))
 assert.ok(p2p.editorialChecks.some(c=>c.status==='unresolved-amount'))
 const loyal=ts.find(t=>t.resourceId==='res-258')
 assert.ok(loyal.segments.find(s=>s.start===18.74).text.includes('episode five'))
 assert.ok(loyal.editorialChecks.some(c=>c.status==='publisher-numbering'))
})
