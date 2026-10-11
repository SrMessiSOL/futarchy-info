# MetaDAO ecosystem backfill

The archive contains 371 records (366 visible), including 156 source-checked records. This PR adds 141 records to the original 230; the final ecosystem pass adds 87 beyond the earlier 54. All original IDs remain.

## Project roster

Reviewed 25 company profiles: 21 currently listed companies, three historical raises (Paystream, Ranger, ZKLSOL), and the failed Hurupay attempt. The 24 funded-project count excludes Hurupay. Governance-only legacy partners are not counted as fundraising projects. Directory badges and rendered rows did not agree, so the count comes from individually reviewed records. This is a dated roster reconciliation, not a claim that no undiscovered historical project exists.

| Project | Coverage | Tagged resources | New proposal records |
|---|---|---:|---:|
| [Rip Cars](https://metadao.fi/companies/ripcars) | raise | 11 | 4 |
| [Credible](https://metadao.fi/companies/credible) | raise | 7 | 2 |
| [Laso Finance](https://metadao.fi/companies/laso-finance) | raise | 6 | 1 |
| [Avici](https://metadao.fi/companies/avici) | raise | 19 | 1 |
| [Umbra](https://metadao.fi/companies/umbra) | raise | 36 | 6 |
| [Solomon](https://metadao.fi/companies/solomon) | raise | 40 | 4 |
| [P2P Protocol](https://metadao.fi/companies/p2p-protocol) | raise | 4 | 1 |
| [Omnipair](https://metadao.fi/companies/omnipair) | raise | 15 | 5 |
| [Jurassic Finance](https://metadao.fi/companies/jurassic-finance) | raise | 3 | 1 |
| [Ordr](https://metadao.fi/companies/ordr) | raise | 2 | 0 |
| [Kimia](https://metadao.fi/companies/kimia) | raise | 4 | 1 |
| [Futardio Cult](https://metadao.fi/companies/futardio-cult) | raise | 10 | 4 |
| [GeSIM](https://metadao.fi/companies/gesim) | raise | 1 | 0 |
| [Loyal](https://metadao.fi/companies/loyal) | raise | 31 | 3 |
| [HiveBits](https://metadao.fi/companies/hivebits) | raise | 1 | 0 |
| [Basket](https://metadao.fi/companies/basket) | raise | 3 | 2 |
| [LFOwn](https://metadao.fi/companies/lfown) | raise | 4 | 3 |
| [Areal Finance](https://metadao.fi/companies/areal-finance) | raise | 2 | 1 |
| [ACCRUE](https://metadao.fi/companies/accrue) | raise | 2 | 1 |
| [Superclaw](https://metadao.fi/companies/superclaw) | raise | 5 | 2 |
| [PREDICT](https://metadao.fi/companies/predict) | raise | 4 | 3 |
| [Paystream](https://metadao.fi/companies/paystream) | historical-raise | 15 | 3 |
| [Ranger](https://metadao.fi/companies/ranger) | historical-raise | 17 | 2 |
| [ZKLSOL / ZKFG](https://metadao.fi/companies/zklsol) | historical-raise | 12 | 5 |
| [Hurupay](https://metadao.fi/companies/hurupay) | failed-raise | 4 | 0 |

## What was checked

- Company overviews, primary website links, and available decision lists were inspected in the rendered MetaDAO application.
- 54 original proposal pages were read; 52 were added because two were already present. Their dates are creation events. Failed and unresolved proposals remain distinct from passed proposals; none establishes execution.
- Added 22 publisher updates from Loyal, Umbra and Solomon, including an Avici partnership. Some older material was recovered to explain the project history. Dates are the displayed publication dates; republications and attestation snapshot differences are noted.
- Added 13 missing company profiles and refreshed 12 existing IDs with canonical company URLs. Dynamic profiles are undated and do not inflate monthly news counts.
- Failed Hurupay outcome is corroborated by [SolanaFloor](https://solanafloor.com/nl/news/hurupay-fails-to-raise-3-m-ico-target-on-meta-dao-is-the-ico-meta-over); refund execution was not independently checked.

## Boundaries and follow-up

MetaDAO direct HTTP discovery remains blocked, although its normal browser pages were readable. Two automated sources (MetaDAO decisions and blog) are unavailable; seven active sources return links. No authentication or bot protections were bypassed. Smaller companies without dated primary announcements have a company record rather than fabricated news. Private chats, unindexed X posts and audio without transcripts are not exhaustively covered. Existing publisher-note-only interview summaries retain that limitation.

Each monthly editorial review should reconcile the directory with content/projects.json, inspect every company’s primary links, revisit unresolved proposals, and record missing evidence. The recurring evidence budget now excludes inactive general-research sources. New company discovery still needs a maintainer to approve its registry and source additions.

## Publication and automation

Local checks and production build must pass before pushing. This branch is a review PR, not a production deployment. Daily discovery, weekly draft editorial PRs and monthly link checks are implemented. Scheduled workflows need this PR merged to the default branch, OPENAI_API_KEY and GitHub permission for Actions to create PRs; deployment additionally needs the documented Vercel secrets. No paid editorial run or deployment was performed.
