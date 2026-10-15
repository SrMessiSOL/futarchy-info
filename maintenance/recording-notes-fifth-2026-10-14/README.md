# Recording review, fifth batch

Four new reading guides contain 39 topic markers. One alternate Bankless upload is consolidated, reducing the public no-notes backlog from 22 to 17. Original IDs, URLs, date values and project status remain intact.

## Review boundaries

- **res-30:** all available automatic captions read (00:06 to 03:53, displayed duration 04:00), plus the expanded Solana publisher description. Caption gaps or garbling around 00:44–00:56 and 03:04–03:20 are explicitly disclosed. No manual audio or slide review. Proposed metrics remain plans; the Dean’s List example is a speaker account, not execution proof. The transcript hash is recorded in reviews.json, but the text is not published.
- **res-29:** original Spotify description and all 20 publisher chapter entries read. Eighteen non-advertising markers retained. No full transcript or audio review. Uniswap and Aave examples do not establish implementation or MetaDAO fundraising. The publisher description mistakenly calls Hanson “Robert”; the guide uses Robin only in the chapter where the publisher itself correctly identifies him.
- **res-160:** original Lightspeed X post and all 10 chapter entries read, with six non-advertising markers retained. Full embedded recording is displayed as 1:01:46. Corrects “Lighspeed” author spelling. No full transcript or listening review.
- **res-163:** original Lightspeed X post and all 14 chapter entries read, with 10 non-advertising markers retained. Full embedded recording is displayed as 1:00:08. This is broader ecosystem coverage; the MetaDAO chapter starts at 15:36. No full transcript or listening review.

The displayed publication dates match the existing dates. These guides describe discussion topics and do not assert current specifications, investment outcomes or legal guarantees.

## Bankless consolidation

The original res-64 X post contains the full 1:26:37 recording, dated October 20, 2025. It matches res-246 in publisher, title, guests and ordered chapter topics. It is not just an announcement. The X and podcast versions have different chapter offsets, consistent with different ad placement, but no audio-level comparison was performed. Preserve the X link in the public res-246 reading note; retain res-64 internally using catalogOnly and supersededBy. Do not assign duplicateOf because their URLs differ. Podcast chapter timestamps are unchanged. The original X post misspells Felipe’s surname; no new identity is inferred from that typo.

## Gaps

Exit Liquidity’s res-31 video is accessible (58:39), but its caption export is unavailable and it has no publisher description. No guide is claimed from its title alone. Loyal’s res-102 remains the previously documented private-video gap; a focused search established no public alternate. The remaining queue is a no-notes backlog, not a count of all recordings needing deeper audio review.

## Validation

Required checks: npm run check and npm run build. local-note-payloads.json verifies exact text and JSON for the four new notes. local-access.json audits public note/transcript endpoints and held-source boundaries, including res-64. Prior merged PR #40 notes were already verified live; this batch does not merge or deploy itself.
