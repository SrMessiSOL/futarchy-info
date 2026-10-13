import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {beforeContextReview,contextEvidence as evidence} from './transcript-context-evidence.mjs'
const read=p=>JSON.parse(fs.readFileSync(p))

test('context edits reconstruct all earlier segments and preserve audio provenance, numbers and uncertainty',()=>{
 const ts=read('content/transcripts.json'),notes=read('content/media-notes.json')
 assert.equal(evidence.reviews.length,ts.length)
 assert.equal(new Set(evidence.reviews.map(r=>r.resourceId)).size,ts.length)
 for(const t of ts){
  const r=evidence.reviews.find(r=>r.resourceId===t.resourceId),before=beforeContextReview(t)
  assert.equal(before.length,t.segments.length)
  assert.equal(t.audioSha256,r.audioSha256)
  assert.equal(t.researchTranscriptSha256,r.researchTranscriptSha256)
  assert.deepEqual(notes.find(n=>n.resourceId===t.resourceId).editorialChecks??[],t.editorialChecks??[])
  for(let i=0;i<before.length;i++){
   // Proph3t is the only added digit: financial amounts must remain untouched.
   const digits=s=>(s.replace(/Proph3t/g,'Prophet').match(/\d+(?:[.,]\d+)*/g)||[])
   assert.deepEqual(digits(before[i].text),digits(t.segments[i].text))
   assert.deepEqual(before[i].text.match(/\[[^\]]*unclear[^\]]*\]/g),t.segments[i].text.match(/\[[^\]]*unclear[^\]]*\]/g))
  }
 }
})

test('context exceptions keep technical metadata, metal, financial profit and ordinary backable',()=>{
 const ts=read('content/transcripts.json'),text=(id,i)=>ts.find(t=>t.resourceId===id).segments[i].text
 for(const key of evidence.preservedMetadata){const i=key.lastIndexOf(':');assert.match(text(key.slice(0,i),Number(key.slice(i+1))),/metadata/i)}
 assert.match(text('ownership-backfill-3',870),/metal coins/)
 assert.match(text('ownership-roadshow-5-recording',745),/VC backable/)
 assert.match(text('ownership-radio-1-recording',26),/profit opportunity/)
 assert.match(text('ownership-radio-32-recording',17),/Backable.*Futardio/)
 assert.match(text('ownership-radio-19-recording',538),/Futardio Cult treasury/)
})
