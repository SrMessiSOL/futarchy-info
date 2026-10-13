import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { auditTranscript, repetitionSignal } from './audit-transcripts.mjs'

test('published audit hashes and replacement evidence match the served segments',()=>{
 const ts=JSON.parse(fs.readFileSync('content/transcripts.json'))
 const hash=v=>createHash('sha256').update(JSON.stringify(v)).digest('hex')
 const evidence=JSON.parse(fs.readFileSync('maintenance/transcript-quality-2026-10-12/repair-evidence.json'))
 for(const t of ts){
  assert.equal(t.qualityAudit.publishedSegmentsSha256,hash(t.segments))
  assert.equal(auditTranscript(t).issues.filter(i=>['invalid-timing','repetition-candidate'].includes(i.type)).length,0)
 }
 for(const r of evidence.repairs){
  const t=ts.find(t=>t.resourceId===r.resourceId)
  assert.equal(t.audioSha256,r.audioSha256)
  assert.equal(hash(r.segments),r.replacementSegmentsSha256)
  for(const s of r.segments)assert.ok(t.segments.some(x=>JSON.stringify(x)===JSON.stringify(s)))
 }
})

test('quality triage flags severe loops and out-of-order timestamps without treating ordinary repetition as corruption',()=>{
 assert.equal(repetitionSignal('No, no, no, I mean the market can change.'),null)
 assert.ok(repetitionSignal('I think so. '.repeat(30)))
 const result=auditTranscript({resourceId:'sample',kind:'machine',durationSeconds:100,segments:[{start:40,end:60,text:'hello'},{start:55,end:58,text:'yes'},{start:50,end:54,text:'fine'}]})
 assert.equal(result.issues.filter(i=>i.type==='invalid-timing').length,1)
 assert.equal(result.issues.filter(i=>i.type==='untranscribed-interval').length,2)
})

test('note regeneration preserves published repairs instead of rebuilding from stale research files',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'ownership-notes-'))
 try {
  const write=(p,v)=>{fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.writeFileSync(path.join(root,p),JSON.stringify(v))}
  const id='ownership-radio-18-recording',sha='a'.repeat(64)
  const published={resourceId:id,researchTranscriptSha256:sha,segments:[{start:0,end:2,text:'Published repair'}],qualityAudit:{status:'machine-reviewed'}}
  const note={resourceId:id,reviewBoundary:'Preserve correction limits',transcript:{status:'available',sha256:sha}}
  write('content/resources.json',[{id,type:'podcast'}]);write('content/transcripts.json',[published]);write('content/media-notes.json',[note])
  write('maintenance/source-review-2026-10-12/radio18-content-review.json',{resourceId:id,boundary:'Old research boundary'})
  write('maintenance/source-review-2026-10-12/ownership-audio-reviews.json',{reviews:[]})
  write('maintenance/source-review-2026-10-11/full-content-decisions.json',{decisions:[]})
  write('maintenance/source-review-2026-10-12/funded-founder-final-pass.json',{decisions:[]})
  write('work/deep-review/audio-transcript-radio18.json',{segments:[{start:0,end:2,text:'Stale repetition'}],sha256:'bad'})
  execFileSync(process.execPath,[path.resolve('scripts/prepare-media-notes.mjs')],{cwd:root})
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root,'content/transcripts.json'))),[published])
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root,'content/media-notes.json'))),[note])
 } finally {fs.rmSync(root,{recursive:true,force:true})}
})
