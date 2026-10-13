# OwnershipFM audio gap review

All 38 original intervals received two local audio-recognition passes: small.en with VAD and up to five seconds of boundary context, then base.en without VAD in independent 30-second windows. Exact digital-zero windows were skipped in the second pass. Ten selected context windows received small.en beam-5 recognition with word timestamps. No paid transcription service was used. This is machine audio analysis, not manual listening.

## Accepted changes

- Radio #1, 133.84–134.64: add “Yeah. Yeah.” before the existing introduction.
- Radio #8, 332.38–333.22: add “All right.” before the existing greeting.
- Radio #14, 270.96–272.84: add “All right, everybody.” before the existing introduction.
- Radio #12: correct “Thank you everybody” to “Good morning, everybody” and move the opening start from 254.77 to 253.94. Preserve the following words and original segment end.

Two recognition passes agree on the accepted words; timestamps remain estimates. The recovered greetings introduce no new project names or financial numbers. Radio #14's spoken episode number agrees with the existing show title. No complete new discussion was recovered.

## Remaining limits

There are still 38 intervals longer than 30 seconds without accepted transcript text; four leading boundaries are now shorter. Processing an interval does not prove that it contains no speech. The other 34 intervals yielded no additional reliable text. Repeated syllables in Roadshow #3 were rejected as dialogue. That opening remains unresolved. Radio #6/#32 closing “Thanks” candidates were not corroborated by context and were not added. Report #2's first-pass 9.94-second start conflicts with word alignment at 161.94, effectively the existing 162-second caption boundary; no early greeting was invented. All remaining intervals retain uncertainty in the public text and JSON exports.

## Names, tickers and numbers

Radio #29 now carries separate editorial reference checks for [Umbra](https://metadao.fi/decisions/umbra-006), [Credible](https://metadao.fi/decisions/cred-001) and [Omnipair](https://metadao.fi/decisions/omfg-006): proposal caps of 300,000, 250,000 and 130,000 USDC, respectively, with USDv as the destination. [Solomon's company page](https://metadao.fi/companies/solomon) corroborates the USDv spelling. These primary pages were read during this review. The checks clarify entity/ticker recognition separately from verbatim speech and do not establish execution. The separate $2 million MetaDAO statement remains explicitly unverified. Radio #14's host name remains unresolved rather than replacing one recognizer's phonetic guess with another.

This is not verification of every name or number across all 57 full recordings.

## Evidence and reproduction

`evidence.json` records every original interval, audio hash, recognition-output hashes, candidate counts, decisions and accepted segment changes. The original research transcript hashes and prior repair evidence are preserved. New published-segment hashes identify the corrected exports. Publisher-caption tracks keep their caption provenance; the newly downloaded review audio hash is nested under `qualityAudit.audioGapReview`.

The Python helpers in this directory document the exact decoding/model settings and selected context windows. Run from the repository root with the existing local tools under `work/deep-review/media-tools`, cached faster-whisper models and official recordings. The first pass can download missing official YouTube audio; the remaining passes use local files. Raw outputs remain in ignored `work/audio-gap-*.json`; their per-entry hashes are recorded in the evidence. They are candidate output, never automatically publishable transcript text. Reject out-of-range timestamps, repeated phrases and words unsupported by context.

Validation: all 40 tests, content validation, TypeScript checks and production build pass. All 57 local production JSON/text transcript endpoints were checked for segment text, counts, timestamps and audit metadata; both affected reading-note endpoints include editorial checks. Numeric comparisons allow the production bundler's sub-nanosecond floating-point rounding. Published-segment hashes bind repository JSON serialization, not reserialized bundled API numbers. No deployment was performed.
