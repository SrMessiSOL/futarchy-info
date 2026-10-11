# Validation — October 8, 2026

## Verified locally

- Catalog validation: 371 records, 366 visible, 141 new additions and 156 source-checked records overall. All 230 original IDs retained.
- 23 automated tests passed: invalid/unknown/future dates, evidence requirements, stable IDs, duplicates, tracking-URL normalization, idempotent discovery, rejected-candidate history, host/path restrictions, private address blocking, editorial evidence gating, workflow parsing and job separation.
- TypeScript check passed. Removed the previous ignoreBuildErrors setting.
- Next.js 16.4.0 production build passed with all page/API routes generated. npm dependency audit reports zero known vulnerabilities at this check.
- Expanded discovery tested twice: 24 additional candidates on the first scan, zero on the second. The final ecosystem allowlist has nine routes: seven return links and two MetaDAO routes remain blocked. Three cross-platform podcast duplicates were explicitly rejected. RSS, sitemap extraction, bounded results, and source-balanced sampling have tests.
- Evidence collection was exercised again with 15 source-balanced candidates. Per-source fetch results remain in ignored work/evidence-provenance.json. Public artifacts contain provenance metadata and hashes, not full publisher text.
- HTTP audit: 235 URLs checked, 157 reachable, 3 HTTP 404, 75 inconclusive. See initial-audit.md and the JSON snapshot.
- Browser inspection of production preview: refreshed homepage, reading path, recent additions, catalog rendering, search for Endgame, visible Date unverified label. Desktop and 390px mobile layout inspected; no horizontal overflow at the mobile viewport. Removed a failing external banner image.

## Not yet verified or activated

- No paid Codex editorial run has been performed. The OPENAI_API_KEY repository secret is absent.
- Scheduled workflows have not run on GitHub; schedules activate on the default branch after merge.
- Automated PR creation needs the repository Actions setting allowing PR creation; currently disabled.
- No production deployment was performed. Repository-level VERCEL_TOKEN, VERCEL_ORG_ID and VERCEL_PROJECT_ID secrets are absent. Vercel account settings and any environment/org secrets remain unverified.
- Local KV credentials are absent, so the catalog was tested with its existing zero-count fallback. Live votes and persisted counts were not tested.
- Historical source summaries and dates remain pending verification. Current source discovery is partial and is not a comprehensive ecosystem monitor. See backfill-coverage.md for project-by-project coverage and remaining gaps.

The Linux GitHub CI build is separate from the successful Windows local build. Review the pull request's current checks before merging.

## Final ecosystem pass

- Added a 25-project roster: 24 funded projects plus one failed raise, with explicit project tags and navigation. A contract test checks roster uniqueness, linked records and orphan tags.
- Production preview confirmed Basket filters to its three relevant records and Hurupay is labeled as a failed raise.
- General research sources no longer consume the recurring evidence budget. Verified Loyal, Umbra and Solomon discovery routes were added.
