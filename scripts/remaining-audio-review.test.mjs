import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {beforeRemainingReview} from './transcript-context-evidence.mjs'
const read=p=>JSON.parse(fs.readFileSync(p))
test('remaining audio corrections preserve source provenance and the settled listener decision',()=>{
 const ts=read('content/transcripts.json'),e=read('maintenance/remaining-audio-review-2026-10-13/evidence.json')
 for(const r of e.reviews){
  const t=ts.find(t=>t.resourceId===r.resourceId)
  assert.equal(beforeRemainingReview(t).length,t.segments.length)
  assert.equal(t.audioSha256,r.audioSha256)
  assert.equal(t.researchTranscriptSha256,r.researchTranscriptSha256)
  assert.equal(t.captionSourceSha256??null,r.captionSourceSha256)
 }
 const listener=read('maintenance/listener-feedback-2026-10-13.json')
 assert.deepEqual(ts.find(t=>t.resourceId===listener.resourceId).segments.find(s=>s.start===listener.replacement.start),listener.replacement)
 const decisions=read('maintenance/remaining-audio-review-2026-10-13/decisions.json')
 assert.equal(decisions.length,12)
 for(const d of decisions.filter(d=>d.status==='unresolved')){
  const t=ts.find(t=>t.resourceId===d.resourceId)
  assert.equal(t.segments.find(s=>s.start===d.start).text,d.text)
 }
})
