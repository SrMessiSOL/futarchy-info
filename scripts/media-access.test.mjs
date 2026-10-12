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
    assert.match(transcript.audioSha256, /^[a-f0-9]{64}$/)
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
