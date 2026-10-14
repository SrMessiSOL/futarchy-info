# Agent access audit — October 14, 2026

Scope: every currently public podcast/video record, across main and historical scopes. This audits our notes, transcript APIs and readers; it does not establish third-party source health, complete speech coverage, or a new full-content review.

## Results

- Production before changes: 167 recordings; 112 with notes, including 57 with hosted machine transcripts. All 425 endpoint checks passed.
- Proposed update: expose 12 already documented source reviews as notes, retaining their original review dates and boundaries. Ten are publisher-page/show-note reviews; two documented transcript reviews remain permission-required. No new audio transcription or listening is claimed.
- Local production build: 124 recordings with notes (57 with transcripts, 67 notes-only), 43 without notes. All 449 endpoint checks passed. Structured access labels checked for all 640 public entries.
- All six excluded media records continue returning 404 through notes, metadata, transcript and reader routes. These are deliberate publication/retention/duplicate gates, not broken links.
- Catalog IDs, source descriptions, dates, project eligibility and transcript assets are unchanged. Changes are not live until the PR is merged and deployed.

## Remaining work

110 public recordings have no hosted transcript: 57 are marked permission-required and 53 have no documented transcript review/recovery. Of those 53, ten now expose publisher-note reviews; the other 43 remain legacy records without notes. These counts concern this catalog, not an exhaustive inventory of publisher archives.

Eight newly exposed Ownership podcast notes have no documented transcript recovery: 8bitpenis (S1E0), Maushish/Paystream (S1E6), Tim/The Syndicate (S2E01), Tony/Epicentral (S1E12), Hunter/Laso (S1E9), Arad/Lightcone (S1E8), Proph3t/MetaDAO (S1E7), and Anas/FlashTrade (S1E1). Prioritize MetaDAO and eligible funded-project interviews; wider-context appearances do not establish a MetaDAO raise. Existing closed-project restrictions still apply.

The accompanying coverage.json lists every remaining no-notes record and every recording without a hosted transcript, with IDs and source links. Its top-level counts describe the production baseline; localVerification describes this PR. Missing hosted transcripts are not automatically broken access: some are permission boundaries, others need research or recovery.

## Reproduce

Run `node scripts/audit-agent-access.cjs https://futarchy.info work/agent-access-audit.json` from the repository root. For a local production server, substitute its base URL. The report records individual endpoint outcomes and fails on unexpected status/content. It makes read-only requests and does not inspect third-party recordings.

Validation: npm run check (48 tests plus catalog/type checks), npm run build, full local endpoint audit, and structured access assertions.
