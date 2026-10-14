import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
const rows = JSON.parse(fs.readFileSync('content/resources.json'))
const notes = JSON.parse(fs.readFileSync('content/media-notes.json'))
const transcripts = JSON.parse(fs.readFileSync('content/transcripts.json'))

test('public transcripts have explicit OwnershipFM permission, provenance and usable timed segments', () => {
  const ids = new Set()
  for (const transcript of transcripts) {
    assert.ok(!ids.has(transcript.resourceId)); ids.add(transcript.resourceId)
    const resource = rows.find(row => row.id === transcript.resourceId)
    assert.ok(resource && !resource.catalogOnly && !resource.duplicateOf)
    assert.match(resource.author, /ownership/i)
    assert.equal(transcript.permission.grantedAt, '2026-10-12')
    if (transcript.kind === 'publisher-auto-captions') {
      assert.equal(transcript.audioSha256, null)
      assert.match(transcript.sourceUrl, /^https:\/\/www\.youtube\.com\/watch\?v=/)
      assert.match(transcript.captionSourceSha256, /^[a-f0-9]{64}$/)
      assert.equal(transcript.captionSourceSha256, transcript.researchTranscriptSha256)
      assert.match(transcript.timestampAdjustments, /inferred intervals/)
      assert.match(transcript.reviewBoundary, /not been fully read/)
    } else assert.match(transcript.audioSha256, /^[a-f0-9]{64}$/)
    assert.match(transcript.researchTranscriptSha256, /^[a-f0-9]{64}$/)
    assert.ok(transcript.segments.length > 0)
    for (const segment of transcript.segments) {
      assert.ok(Number.isFinite(segment.start) && Number.isFinite(segment.end))
      assert.ok(segment.start >= 0 && segment.end >= segment.start)
      assert.ok(segment.end <= transcript.durationSeconds + 1)
      assert.equal(typeof segment.text, 'string')
    }
    const note = notes.find(row => row.resourceId === transcript.resourceId)
    assert.equal(note?.transcript.status, 'available')
    assert.equal(note.transcript.sha256, transcript.researchTranscriptSha256)
  }
  for (const note of notes.filter(row => row.transcript.status === 'available')) assert.ok(ids.has(note.resourceId))
})
test('Ownership publisher playlists reconcile to single show entries without reminder duplicates', () => {
  const coverage = JSON.parse(fs.readFileSync('maintenance/ownershipfm-archive-2026-10-12/coverage.json'))
  assert.equal(coverage.episodes.length, 25)
  const ids = new Set(), urls = new Set()
  for (const episode of coverage.episodes) {
    assert.ok(!ids.has(episode.resourceId)); ids.add(episode.resourceId)
    assert.ok(!urls.has(episode.url)); urls.add(episode.url)
    const row = rows.find(row => row.id === episode.resourceId)
    assert.ok(row && !row.catalogOnly && !row.duplicateOf)
    assert.equal(row.url, episode.url)
    assert.equal(row.type, 'video')
    const note = notes.find(note => note.resourceId === row.id)
    assert.equal(note?.transcript.status, episode.transcriptStatus ?? episode.captionStatus)
    if (episode.transcriptKind === 'machine-generated-transcript') {
      const transcript = transcripts.find(t => t.resourceId === episode.resourceId)
      assert.equal(episode.captionStatus, 'unavailable')
      assert.equal(transcript?.kind, episode.transcriptKind)
      assert.equal(transcript.audioSha256, episode.audioSha256)
      assert.equal(transcript.researchTranscriptSha256, episode.researchTranscriptSha256)
      assert.equal(transcript.segments.length, episode.segmentCount)
      assert.equal(transcript.durationSeconds, episode.durationSeconds)
    }
    if (episode.widerContext) assert.ok(!row.tags.some(tag => tag.startsWith('project:')))
  }
})
test('Radio reminders stay internal and available shows keep their original IDs', () => {
  const reminders = rows.filter(row => /^Ownership Radio #\d+ . announcement$/.test(row.title))
  assert.equal(reminders.length, 32)
  for (const reminder of reminders) {
    assert.equal(reminder.catalogOnly, true)
    const episode = reminder.title.match(/#(\d+)/)[1]
    const show = rows.find(row => row.id === `ownership-radio-${episode}-recording`)
    assert.equal(reminder.supersededBy, show?.id)
    if (show) assert.ok(!show.catalogOnly)
  }
})

test('reading notes preserve source evidence and never advertise nonexistent transcript assets', () => {
  assert.equal(new Set(notes.map(n => n.resourceId)).size, notes.length)
  for (const note of notes) {
    assert.ok(rows.some(row => row.id === note.resourceId))
    assert.ok(note.reviewMethod && note.reviewBoundary && note.checkedAt)
    assert.ok(['available', 'permission-required', 'unavailable', 'not-reviewed'].includes(note.transcript.status))
    if (note.transcript.status === 'available') {
      assert.equal(note.transcript.textUrl, `/api/transcripts/${note.resourceId}`)
      assert.equal(note.transcript.jsonUrl, `/api/transcripts/${note.resourceId}?format=json`)
    } else {
      assert.equal(note.transcript.textUrl, undefined)
      assert.equal(note.transcript.jsonUrl, undefined)
    }
  }
})
