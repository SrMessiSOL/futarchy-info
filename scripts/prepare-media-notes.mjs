import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

// Published permissioned transcripts are authoritative; never rebuild them from older research drafts.
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'))
const catalog = read('content/resources.json')
const byId = new Map(catalog.map(resource => [resource.id, resource]))
// Preserve publisher metadata notes and captions recovered through the browser.
const notes = new Map(read('content/media-notes.json').map(note => [note.resourceId, note]))
const publishedNotes = new Map(notes)
function add(review) {
  const resource = byId.get(review.resourceId)
  if (!resource || !['podcast', 'video'].includes(resource.type)) return
  notes.set(resource.id, {
    resourceId: resource.id,
    checkedAt: review.checkedAt ?? resource.checkedAt,
    reviewMethod: review.method ?? review.transcriptModel ?? 'Complete available generated transcript review',
    reviewBoundary: review.boundary ?? review.reviewBoundary ?? resource.evidenceNote,
    sections: review.sections ?? [],
    transcript: { status: 'permission-required', sha256: review.transcriptSha256 ?? review.textSha256 ?? null },
  })
}
const directory = 'maintenance/source-review-2026-10-12'
for (const file of fs.readdirSync(directory).filter(file => /^radio\d+-content-review\.json$/.test(file))) add(read(path.join(directory, file)))
for (const review of read(`${directory}/ownership-audio-reviews.json`).reviews) add(review)
for (const decision of read('maintenance/source-review-2026-10-11/full-content-decisions.json').decisions) {
  if (!/complete.*caption/i.test(decision.method ?? '')) continue
  for (const resourceId of decision.resourceIds ?? []) {
    if (!notes.has(resourceId)) add({ ...decision, resourceId, boundary: decision.note })
  }
}
for (const decision of read(`${directory}/funded-founder-final-pass.json`).decisions) {
  if (decision.type === 'video') add({ ...decision, method: 'Complete available public English auto-generated captions' })
}
const permission = { grantedBy: 'OwnershipFM team member in this chat', grantedAt: '2026-10-12', scope: 'Existing OwnershipFM recordings and transcripts; excludes other publishers' }
const podcastFiles = { 'res-259': 'Sheldon', 'res-257': 'rakka', 'res-258': 'Chris', 'ownership-backfill-2': 'Shrii', 'res-199': 'Kru', 'ownership-backfill-3': 'Ranga' }
const transcripts = read('content/transcripts.json')
let published = 0
for (const note of notes.values()) {
  const number = note.resourceId.match(/^ownership-radio-(\d+)-recording$/)?.[1]
  const name = number ? `radio${number}` : podcastFiles[note.resourceId]
  if (!name) continue // OwnershipFM permission does not cover other publishers.
  const existing = transcripts.find(t => t.resourceId === note.resourceId)
  if (existing) {
    const saved = publishedNotes.get(note.resourceId)
    if (!saved || saved.transcript.status !== 'available' || saved.transcript.sha256 !== existing.researchTranscriptSha256) throw new Error(`Published transcript/note mismatch: ${note.resourceId}`)
    notes.set(note.resourceId, saved)
    continue
  }
  const file = `work/deep-review/audio-transcript-${name}.json`
  if (!fs.existsSync(file)) continue
  const original = fs.readFileSync(file)
  const transcript = JSON.parse(original)
  const resource = byId.get(note.resourceId)
  if (!transcript.segments?.length) throw new Error(`Empty transcript: ${file}`)
  if (transcript.sha256 !== (read(`${directory}/ownership-radio-recordings.json`).episodes.find(e => e.resourceId === note.resourceId)?.audioSha256 ?? read(`${directory}/ownership-audio-reviews.json`).reviews.find(e => e.resourceId === note.resourceId)?.audioSha256)) throw new Error(`Audio provenance mismatch: ${file}`)
  const payload = {
    resourceId: resource.id, title: resource.title, sourceUrl: resource.url,
    publisher: 'OwnershipFM', permission, language: transcript.language,
    kind: 'machine-generated-transcript', model: transcript.model,
    durationSeconds: transcript.duration, audioSha256: transcript.sha256,
    researchTranscriptSha256: createHash('sha256').update(original).digest('hex'),
    warning: 'Uncorrected machine transcription. May contain invented or repeated passages, inaccurate names, numbers and timestamps. No speaker identities inferred. Not a verified verbatim record.',
    reviewBoundary: note.reviewBoundary,
    timestampAdjustments: 'Segments starting beyond the audio end are omitted; overrun end times are clipped to the measured duration. Original end time retained where clipped.',
    omittedOutOfRangeSegments: transcript.segments.filter(s => s.start > transcript.duration).length,
    segments: transcript.segments.filter(s => s.start <= transcript.duration).map(({start, end, text}) => ({start, end: Math.min(end, transcript.duration), ...(end > transcript.duration ? {originalEnd: end} : {}), text})),
  }
  const existingIndex = transcripts.findIndex(transcript => transcript.resourceId === payload.resourceId)
  if (existingIndex < 0) transcripts.push(payload)
  else transcripts[existingIndex] = payload
  const base = `/api/transcripts/${resource.id}`
  note.transcript = { status: 'available', permission, sha256: payload.researchTranscriptSha256, jsonUrl: `${base}?format=json`, textUrl: base }
  published++
}
fs.writeFileSync('content/transcripts.json', JSON.stringify(transcripts, null, 2) + '\n')
fs.writeFileSync('content/media-notes.json', JSON.stringify([...notes.values()].sort((a,b) => a.resourceId.localeCompare(b.resourceId)), null, 2) + '\n')
console.log(`Prepared ${notes.size} media reading notes and ${transcripts.length} permissioned OwnershipFM transcripts (${published} rebuilt from research audio).`)
