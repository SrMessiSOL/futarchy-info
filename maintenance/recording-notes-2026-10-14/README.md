# Recording reading notes — October 14, 2026

## Previous merge is live

PR #35 merged as cb78560baea99813e2fd3d27777794f3f418c4cc. Production deployment run 38654970147 succeeded. The production URL recorded by the workflow is https://futarchy-library-9b4klw5wq-srmessisols-projects.vercel.app. Direct checks against https://futarchy.info confirmed exact JSON equality for all four corrected transcripts, their editorial checks, all 51 topic entries and reader review limits. All 473 production endpoint checks passed. Evidence is in previous-merge-live-payloads.json and previous-merge-live-access.json.

## First notes batch

Added eight written-source reading notes with 60 navigation entries. Five sources concern funded projects directly (Umbra, Avici, Solomon and historical Ranger discussion); three cover MetaDAO and its launchpad, including Bankless's Umbra example. No new project or recording was added. Original IDs, URLs and date values are preserved; displayed publication dates corroborate the retained dates. Revised descriptions explicitly attribute claims to publishers. Original descriptions and review limits are in reviews.json.

| ID | Source | Review basis |
| --- | --- | --- |
| res-82 | Seb Montgomery: Umbra/MetaDAO ICO overview | Expanded YouTube description and six publisher chapters |
| res-97 | 3.0 TV: Avici presale | Expanded YouTube description and eight displayed chapters |
| res-118 | Seb Montgomery: Solomon ICO | Expanded YouTube description and eight publisher chapters |
| res-127 | Onchain Trenches: ownership coins | Expanded YouTube description and ten publisher chapters, including historical Ranger material |
| res-87 | Sol Brothers: Kru/Umbra | Publisher Podbean description and Podscan preview only through 08:09; five preview topic markers |
| res-246 | Bankless: Felipe Montealegre and Proph3t | Apple Podcasts episode description and thirteen selected publisher chapters |
| res-201 | Lightspeed: permissionless launchpad | Solana Media description and six publisher chapters |
| res-42 | Colosseum: Proph3t | Complete expanded RSS.com episode notes and four publisher timestamps |

This is not full audio listening or complete transcript review. No new transcript is hosted. Most transcript statuses remain not-reviewed; res-82 records an unsuccessful export attempt, not proof that no caption track exists. Its visible transcript panel remained loading. The Seb Montgomery pages display a Creative Commons Attribution license, which is recorded as a possible future recovery route rather than incorrectly requiring OwnershipFM permission.

Sol Brothers's $155M headline is distinguished from its description's $3M reportedly retained. Neither is independently reconciled onchain in this pass. Avici's pre-sale commitments and valuation scenarios are not final proceeds. Solomon product/yield descriptions and Ranger discussion remain historical, not current promotional updates. No source was moved across publication or project-retention gates.

## Remaining queue

queue.json preserves all 43 original records and marks eight as written-source-notes-added. Thirty-five still lack notes. The Loyal ICO video res-102 returned “This video is private” in the normal browser; it remains pending an authorized alternate, with no invented summary or deletion. The other pending entries are not claimed reviewed. Continue with funded-project material, then MetaDAO context; full-recording review of this batch remains separate from the no-notes count.

Publication references and chapter paraphrases are in reviews.json. The public notes expose the review method, sources and limits. They must not be described as full transcripts or verified founder statements.

Validation: npm run check passed (50 tests and TypeScript); npm run build passed. All 489 local production endpoint checks passed. All eight note JSON payloads, descriptions, review limits and 60 guide entries matched the edited source. Public counts remain 640 resources and 167 recordings, now with 132 notes and 65 transcripts. New notes require PR merge and deployment.
