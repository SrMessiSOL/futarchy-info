import{beforeProjectReview}from'./radio-project-evidence.mjs'
import fs from'node:fs';import assert from'node:assert/strict';import{createHash}from'node:crypto';
const evidence=JSON.parse(fs.readFileSync('maintenance/radio-numeric-pass-2026-10-16/evidence.json'));const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
// Restore the prior published edition before validating earlier immutable review layers.
export function beforeNumericReview(transcript){const t=beforeProjectReview(transcript),r=evidence.reviews.find(r=>r.resourceId===t.resourceId);if(!r)return t;assert.equal(hash(t.segments),r.publishedSegmentsSha256);for(const c of evidence.changes.filter(c=>c.resourceId===t.resourceId).reverse()){assert.deepEqual(t.segments[c.index],c.replacement);assert.equal(c.original.start,c.replacement.start);assert.equal(c.original.end,c.replacement.end);t.segments[c.index]=structuredClone(c.original)}assert.equal(hash(t.segments),r.previousSegmentsSha256);return t;}
