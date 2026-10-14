import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createHash} from 'node:crypto'
import {auditTranscript, repetitionSignal} from './audit-transcripts.mjs'

test('recovered Ownership podcasts match source evidence and retain recovery limits',()=>{
 const evidence=JSON.parse(fs.readFileSync('maintenance/ownership-podcast-recovery-2026-10-14/evidence.json'))
 const ts=JSON.parse(fs.readFileSync('content/transcripts.json'))
 const notes=JSON.parse(fs.readFileSync('content/media-notes.json'))
 assert.equal(evidence.recordings.length,8)
 assert.equal(new Set(evidence.recordings.map(r=>r.id)).size,8)
 for(const r of evidence.recordings){
  const t=ts.find(t=>t.resourceId===r.id),n=notes.find(n=>n.resourceId===r.id)
  assert.ok(t)
  assert.equal(t.sourceUrl,r.sourceUrl)
  assert.equal(t.audioSha256,r.audioSha256)
  assert.equal(t.researchTranscriptSha256,r.researchTranscriptSha256)
  assert.equal(t.segments.length,r.segmentCount)
  assert.equal(t.qualityAudit.publishedSegmentsSha256,r.publishedSegmentsSha256)
  assert.equal(createHash('sha256').update(JSON.stringify(t.segments)).digest('hex'),r.publishedSegmentsSha256)
  const parts=r.feedDuration.split(':').map(Number),seconds=parts.reduce((a,x)=>a*60+x,0)
  assert.ok(Math.abs(t.durationSeconds-seconds)<2,'decoded audio matches publisher duration')
  assert.deepEqual(t.qualityAudit.untranscribedIntervals.map(({start,end})=>({start,end})),auditTranscript(t).issues.filter(i=>i.type==='untranscribed-interval').map(({start,end})=>({start,end})))
  for(const c of r.terminologyCorrections){
   assert.equal(t.segments[c.index].text,c.replacement)
   assert.equal(t.segments[c.index].start,c.start)
   const amounts=text=>(text.replace(/Proph3t/g,'Prophet').replace(/8[- ]?bit[- ]?penis/gi,'host').match(/\d+(?:[.,]\d+)*/g)??[])
   assert.deepEqual(amounts(c.original),amounts(c.replacement),'terminology edits preserve amounts')
  }
  if(r.asrRepair){
   assert.ok(repetitionSignal(r.asrRepair.original.text))
   assert.equal(repetitionSignal(r.asrRepair.replacement.text),null)
   assert.ok(t.segments.some(s=>JSON.stringify(s)===JSON.stringify(r.asrRepair.replacement)))
   assert.equal(r.asrRepair.original.start,r.asrRepair.replacement.start)
   assert.equal(r.asrRepair.original.end,r.asrRepair.replacement.end)
   assert.deepEqual(t.asrRepairs,[r.asrRepair])
  }
  assert.match(t.reviewBoundary,/not a complete manual/)
  assert.equal(n.transcript.status,'available')
  assert.equal(n.transcript.sha256,r.researchTranscriptSha256)
 }
})
