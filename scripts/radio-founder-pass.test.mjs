import{beforeNumericReview}from'./radio-numeric-evidence.mjs'
import test from'node:test';import assert from'node:assert/strict';import fs from'node:fs';import{createHash}from'node:crypto';
const read=p=>JSON.parse(fs.readFileSync(p)),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
test('founder pass preserves the prior correction chain and original source timing',()=>{
 const e=read('maintenance/radio-founder-pass-2026-10-16/evidence.json'),ts=read('content/transcripts.json'),prior=read('maintenance/recovered-radio-audio-2026-10-16/evidence.json');
 for(const r of e.reviews){const t=beforeNumericReview(ts.find(t=>t.resourceId===r.resourceId));assert.equal(hash(t.segments),r.publishedSegmentsSha256);assert.equal(t.audioSha256,r.audioSha256);assert.equal(t.researchTranscriptSha256,r.researchTranscriptSha256);const segments=structuredClone(t.segments);for(const c of e.changes.filter(c=>c.resourceId===t.resourceId).reverse()){assert.deepEqual(segments[c.index],c.replacement);if(c.operation==='insert')segments.splice(c.index,1);else{assert.equal(c.original.start,c.replacement.start);assert.equal(c.original.end,c.replacement.end);segments[c.index]=c.original}}assert.equal(hash(segments),r.previousSegmentsSha256);assert.equal(hash(segments),prior.reviews.find(x=>x.resourceId===r.resourceId).publishedSegmentsSha256)}
 assert.equal(e.audioRechecks.length,6);assert.equal(e.confirmations.length,2);for(const r of [...e.audioRechecks,...e.confirmations])assert.match(r.pcmSha256,/^[a-f0-9]{64}$/);
 const t15=ts.find(t=>t.resourceId==='ownership-radio-15-recording');assert.ok(t15.segments.some(s=>s.text.includes('[agent name unclear]')));assert.ok(t15.segments.some(s=>s.text.includes('[tester count unclear]')));
})
