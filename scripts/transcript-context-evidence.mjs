import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createHash} from 'node:crypto'

export const contextEvidence = JSON.parse(fs.readFileSync('maintenance/transcript-context-review-2026-10-13/evidence.json'))
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')

// Restore the previous published state before testing earlier immutable repairs.
export function beforeContextReview(transcript) {
  const segments = structuredClone(transcript.segments)
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
