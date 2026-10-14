import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'

export const contextEvidence = JSON.parse(fs.readFileSync('maintenance/transcript-context-review-2026-10-13/evidence.json'))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const listener = JSON.parse(fs.readFileSync('maintenance/listener-feedback-2026-10-13.json'))
const remaining = JSON.parse(fs.readFileSync('maintenance/remaining-audio-review-2026-10-13/evidence.json'))

export function beforeRemainingReview(transcript) {
  const segments = structuredClone(transcript.segments)
  const review = remaining.reviews.find(r => r.resourceId === transcript.resourceId)
  if (!review) return segments
  assert.equal(hash(segments), review.publishedSegmentsSha256)
  for (const change of remaining.changes.filter(c => c.resourceId === transcript.resourceId).reverse()) {
    assert.deepEqual(segments[change.segmentIndex], change.replacement)
    assert.equal(change.original.start, change.replacement.start)
    assert.equal(change.original.end, change.replacement.end)
    segments[change.segmentIndex] = structuredClone(change.original)
  }
  assert.equal(hash(segments), review.originalSegmentsSha256)
  return segments
}

export function beforeListenerReview(transcript) {
  const segments = beforeRemainingReview(transcript)
  if (transcript.resourceId !== listener.resourceId) return segments
  assert.equal(hash(segments), listener.publishedSegmentsSha256)
  const index = segments.findIndex(s => s.start === listener.replacement.start)
  assert.deepEqual(segments[index], listener.replacement)
  assert.equal(listener.original.start, listener.replacement.start)
  assert.equal(listener.original.end, listener.replacement.end)
  segments[index] = structuredClone(listener.original)
  assert.equal(hash(segments), listener.originalSegmentsSha256)
  return segments
}

// Restore the previous published state before testing earlier immutable repairs.
export function beforeContextReview(transcript) {
  const segments = beforeListenerReview(transcript)
  const review = contextEvidence.reviews.find(r => r.resourceId === transcript.resourceId)
  assert.ok(review)
  assert.equal(hash(segments), review.publishedSegmentsSha256)
  for (const change of contextEvidence.changes.filter(c => c.resourceId === transcript.resourceId).reverse()) {
    assert.deepEqual(segments[change.segmentIndex], change.replacement)
    assert.equal(change.original.start, change.replacement.start)
    assert.equal(change.original.end, change.replacement.end)
    segments[change.segmentIndex] = structuredClone(change.original)
  }
  assert.equal(hash(segments), review.originalSegmentsSha256)
  return segments
}
