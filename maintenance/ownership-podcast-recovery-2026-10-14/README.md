# Ownership podcast recovery — October 14, 2026

## Previous release verified live

PR #32 merged as 7e03074712e8e12a7d64d32ee1d21f1065b425a2. The automatic Vercel production run succeeded; futarchy.info served all 124 reading-note links and the existing 57 transcripts. All 449 first-party endpoint checks passed. See previous-release-live.json.

## New transcript batch

Recovered all eight remaining cataloged Ownership podcast audios from the official RSS enclosures. Downloaded byte counts match the publisher feed; SHA-256 hashes and decoded durations are recorded per episode. The feed exposes no podcast:transcript links. Existing OwnershipFM permission applies.

Processed 22008 seconds of official audio into 804 timestamped segments using the existing local faster-whisper base.en model. Added 123 contextual terminology corrections, retaining original and replacement wording in evidence.json. No full manual listening or complete verbatim verification is claimed. Catalog summaries, project classifications, dates and IDs are unchanged. All 57 previous transcript assets remain unchanged as JSON objects.

| Recording | Seconds | Segments | Corrected passages |
|---|---:|---:|---:|
| Ownership Podcast S1 E7: Proph3t (MetaDAO) | 3487 | 128 | 22 |
| Ownership Podcast S1 E9: Hunter (Laso) | 2861 | 103 | 25 |
| Ownership Podcast S1E6: Maushish (Paystream) | 2902 | 104 | 16 |
| Ownership S1E0: 8bitpenis (Ownership) | 734 | 25 | 5 |
| Ownership Podcast S2 E01: Tim (The Syndicate) | 2987 | 112 | 8 |
| Ownership Podcast S1 E12: Tony (Epicentral) | 2677 | 100 | 10 |
| Ownership Podcast S1 E8: Arad (Lightcone) | 3103 | 113 | 19 |
| Ownership S1 E1: Anas (FlashTrade) | 3257 | 119 | 18 |

Priority started with Proph3t/MetaDAO, Hunter/Laso and Maushish/Paystream. The Syndicate is also recorded as raised through Backable in the project registry. Other existing episodes retain their wider-context treatment; transcript recovery is not new evidence of a MetaDAO raise.

## Review boundaries and remaining uncertainty

The initial FlashTrade transcript had one severe repetition loop at 1092.91-1122.74 seconds. It was replaced with a targeted small.en re-recognition of that audio interval; original, replacement and raw recheck segments are retained in evidence.json and the transcript repair metadata. This is machine repair, not manual listening. All final segments passed the timestamp/severe-repetition scan. No interval longer than 30 seconds lacked generated transcript text; this does not establish complete speech coverage or transcription accuracy. Targeted terminology corrections distinguish MetaDAO from Meta as an employer, futarchy from ordinary future references, and Backable from its Futardio history. Financial amounts were not silently rewritten.

Paystream at 243.74–273.38 seconds: the initial model renders an amount as 75tk. A small.en recheck of 235–280 seconds reads 750k, matching the earlier host introduction of 750,000. The original amount remains in the text with an editorial uncertainty note. Neither ASR agreement nor publisher statements independently verify fundraising proceeds.

Proper-name errors, numbers and other wording may still need listening. Product plans, DevNet availability, projections, ownership/legal claims, liquidation claims and fundraising statements remain attributed historical speech, not verified outcomes.

## Access and validation

This PR increases hosted transcripts from 57 to 65. All eight use the existing reader, plain-text and JSON routes; notes remain 124 across 167 public recordings. Publication and retention gates remain shared with the library. New transcripts are not live until this PR is merged and deployed.

Validation results are recorded in local-access.json after the production-build endpoint audit.

New segment timestamps are normalized to microsecond precision to remove floating-point arithmetic artifacts; original research transcript hashes are retained. Exact local production API payload comparison verifies served segments and their hashes.
