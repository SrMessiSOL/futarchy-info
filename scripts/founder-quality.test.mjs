import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createHash} from 'node:crypto'
const read=p=>JSON.parse(fs.readFileSync(p))
const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex')
test('founder corrections preserve research provenance and reconstruct the prior published edition',()=>{
 const e=read('maintenance/founder-quality-2026-10-14/evidence.json'),ts=read('content/transcripts.json'),notes=read('content/media-notes.json')
 const audio=read('maintenance/founder-quality-2026-10-14/audio-rechecks.json')
 assert.deepEqual(e.recordings.map(r=>r.resourceId).sort(),['ownership-backfill-0','ownership-backfill-4','ownership-backfill-6','res-260'])
 for(const r of e.recordings){
  const t=ts.find(x=>x.resourceId===r.resourceId),n=notes.find(x=>x.resourceId===r.resourceId),prior=structuredClone(t.segments)
  assert.equal(t.audioSha256,r.audioSha256);assert.equal(t.researchTranscriptSha256,r.researchTranscriptSha256)
  assert.equal(n.transcript.sha256,r.researchTranscriptSha256)
  assert.equal(hash(t.segments),r.afterSegmentsSha256);assert.equal(t.qualityAudit.publishedSegmentsSha256,r.afterSegmentsSha256)
  assert.equal(new Set(r.changes.map(c=>c.index)).size,r.changes.length)
  for(const c of [...r.changes].reverse()){
   assert.equal(prior[c.index].text,c.replacement);assert.equal(prior[c.index].start,c.start);assert.equal(prior[c.index].end,c.end)
   prior[c.index].text=c.original
  }
  assert.equal(hash(prior),r.beforeSegmentsSha256)
  assert.equal(n.reviewBoundary,t.reviewBoundary);assert.deepEqual(n.editorialChecks,t.editorialChecks)
  for(const c of t.editorialChecks){assert.ok(Array.isArray(c.sources)&&c.sources.length>0);assert.ok(c.end<=t.durationSeconds)}
  assert.deepEqual(n.sections,r.guide);assert.ok(n.sections.length>=10)
  let last=-1
  for(const section of n.sections){const [m,s]=section.start.split(':').map(Number),start=m*60+s;assert.ok(start>last&&start<t.durationSeconds);last=start}
  assert.match(t.reviewBoundary,/not a complete manual listening/)
  for(const clip of audio.filter(c=>c.resourceId===r.resourceId)){
   assert.equal(clip.audioSha256,t.audioSha256);assert.ok(clip.start>=0&&clip.end<=t.durationSeconds)
   assert.ok(clip.segments.length);assert.match(clip.model,/not manual listening/)
  }
 }
 const amount=e.recordings.find(r=>r.resourceId==='res-260').changes.find(c=>c.index===8)
 assert.match(amount.original,/75tk/);assert.match(amount.replacement,/750k/)
 assert.ok(audio.find(c=>c.resourceId==='res-260'&&c.start===235).segments.some(s=>s.text.includes('750k')))
 // Re-recognition did not settle these ambiguities: keep the words and surface the limits.
 assert.match(ts.find(t=>t.resourceId==='res-260').segments[78].text,/haven't/)
 assert.match(ts.find(t=>t.resourceId==='ownership-backfill-0').segments[93].text,/850, 850, 160/)
 assert.ok(notes.find(n=>n.resourceId==='ownership-backfill-0').editorialChecks.some(c=>c.status==='uncertain-user-counts'))
})
