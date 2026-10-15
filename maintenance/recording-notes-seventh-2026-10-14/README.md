# Recording review, seventh batch

PR #42 is merged and verified live on futarchy.info. The production workflow succeeded for c729a39b92c6f6bd743e979fd18c69a9b0e39151; both notes exactly match their Markdown/JSON responses, and all 541 access checks pass. Evidence is stored in deployment.json and previous-merge-live-*.json. That evidence predates the new guide in this PR.

## New guide

**res-176, Jup & Juice with Kollan House:** original January 15, 2026 publisher post and all 21 chapter entries reviewed. The embedded recording displays 53:06. The guide uses those chapter timestamps and original paraphrases. No full transcript or manual audio review was completed. Replace the previous claim of futarchy's superiority with an attributed description of the interview's subjects. Discussion of Jupiter DAO is not proof of adoption or a raise; ownership coins are not equated with legal equity.

## Remaining research

The no-notes queue falls from 14 to 13 through one new guide, without hiding or deleting any recording. See reviews.json for five source checks and queue.json for the full remaining list. Pine Analytics exposes a 22:47 replay but browser download failed; Future Podcast's 37:04 episode lacks chapters; the two-hour MCG broadcast needs its founder segment located; ThreadGuy's December replay fails on both the original post and direct broadcast; The Armen Show has a publisher page with recovery leads. These remain incomplete rather than receiving title-only guides. Loyal remains the previously checked private-video gap, not a new funded-project review.

No third-party transcript or audio is published, and no dates, source URLs, IDs, project funding status or publication exceptions change.

## Validation

Run npm run check and npm run build. local-note-payloads.json verifies the new guide's exact Markdown and JSON payloads. local-access.json checks all public note/transcript routes and verifies the remaining queue against the served catalog. This new batch is proposed in a PR, not merged or deployed.
