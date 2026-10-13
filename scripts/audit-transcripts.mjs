import fs from 'node:fs'
import { createHash } from 'node:crypto'

// Triage signals only: repetition and timestamp gaps do not establish what was spoken.
export function repetitionSignal(text) {
  const words = text.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? []
  for (let width = 1; width <= 12; width++) {
    let run = 0
    for (let i = width; i < words.length; i++) {
      run = words[i] === words[i - width] ? run + 1 : 0
      if (run + width >= Math.max(40, width * 8)) return { repeatedWords: run + width, phrase: words.slice(i - width + 1, i + 1).join(' ') }
    }
  }
  return null
}

export function auditTranscript(t) {
  const issues = []
  let end = 0, previousStart = -1
  t.segments.forEach((s, index) => {
    if (!Number.isFinite(s.start) || !Number.isFinite(s.end) || s.start < 0 || s.end < s.start || s.end > t.durationSeconds + 0.001 || s.start < previousStart) issues.push({type:'invalid-timing',index,start:s.start,end:s.end})
    if (s.start - end > 30) issues.push({type:'untranscribed-interval',start:end,end:s.start,knownOmission:(t.omittedUnreliableRanges ?? []).some(r=>r.start<=end && r.end>=s.start)})
    const repetition = repetitionSignal(s.text)
    if (repetition) issues.push({type:'repetition-candidate',index,start:s.start,end:s.end,...repetition})
    if (!s.text.trim()) issues.push({type:'empty-text',index,start:s.start,end:s.end})
    end = Math.max(end,s.end); previousStart=s.start
  })
  if (t.durationSeconds-end>30) issues.push({type:'untranscribed-interval',start:end,end:t.durationSeconds,knownOmission:false})
  return {resourceId:t.resourceId,kind:t.kind,durationSeconds:t.durationSeconds,segments:t.segments.length,issues}
}

if (process.argv[1]?.replaceAll('\\','/').endsWith('/audit-transcripts.mjs')) {
  const raw=fs.readFileSync('content/transcripts.json'),ts=JSON.parse(raw)
  const resources=JSON.parse(fs.readFileSync('content/resources.json')),projects=JSON.parse(fs.readFileSync('content/projects.json'))
  const funded=new Set(projects.filter(p=>['raise','historical-raise'].includes(p.coverage)).map(p=>'project:'+p.id))
  const transcripts=ts.map(t=>({...auditTranscript(t),fundedProjectPriority:resources.find(r=>r.id===t.resourceId)?.tags?.some(tag=>funded.has(tag))??false}))
  const result={method:'Structural scan of every segment; heuristic repetition triage, not full manual reading, listening, factual validation or proof of complete speech coverage. Caption end times are inferred and cannot establish absence of gaps.',catalogSha256:createHash('sha256').update(raw).digest('hex'),transcriptCount:ts.length,transcripts}
  const out=process.argv[2]??'work/transcript-quality-audit.json'
  fs.writeFileSync(out,JSON.stringify(result,null,2)+'\n')
  console.log(JSON.stringify({transcripts:ts.length,flagged:transcripts.filter(t=>t.issues.length).map(t=>({id:t.resourceId,priority:t.fundedProjectPriority,issues:t.issues}))},null,2))
}
