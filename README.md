# Futarchy Info

An independent research library for futarchy, decision markets, and ownership coins. Built with Next.js; content lives in `content/resources.json`.

The public archive retains failed-raise projects only when they actually appeared on Ownership Radio. Reviewed recording references live in `content/ownership-radio-projects.json`; excluded project records retain their IDs internally. Exact raise dates are labeled Raise start. Living profiles/documentation with no single publication date are labeled Undated reference; explicit source-update dates are kept separate.

## Agent access

`/llms.txt` describes `/api/library` (main), `?scope=historical` and `?scope=everything`. Reviewed media exposes `/api/library/[id]` in Markdown or `?format=json`, with summaries, review limits and timestamped topic guides where recorded. Cards link to Reading notes.

The 32 available OwnershipFM transcripts are published with explicit team permission: `/api/transcripts/[id]` serves text; `?format=json` serves timed segments, provenance and permission metadata. Cards label them Transcript (machine). These are uncorrected machine outputs, not verified quotations. Partial recovered recordings retain their coverage limits. Other publishers have notes only until transcript permission is established. Public APIs use the same lifecycle, reminder and duplicate filters as the website.

`scripts/prepare-media-notes.mjs` regenerates original notes from review records and permissioned transcripts from locally retained research evidence. It requires the ignored `work/deep-review` files to rebuild full OwnershipFM transcripts. CI consumes the committed validated outputs and does not download or transcribe media.

## Run locally

Use Node.js 22.15 or newer and npm. Commit `package-lock.json` when updating dependencies; npm is the only supported package manager. Do not generate pnpm or Yarn lockfiles.

Install and validate with:

```sh
npm ci --ignore-scripts
npm run check
npm run build
npm run start
```

`npm run dev` starts the development server. The catalog works without a database. Engagement counts and voting need the existing Vercel KV environment variables; without them counts fall back to zero and voting is unavailable. Never fabricate engagement metrics.

## Automated upkeep

| Workflow | Argentina time | Result |
| --- | --- | --- |
| Discover library sources | Daily, 08:20 | Candidates and source status saved on `automation/discovery`; no production changes |
| Weekly library review | Monday, 09:30 | Bounded Codex review, independent validation and build, then one draft PR |
| Monthly library health | First day, 09:40 | Link-health report and dependency audit |
| Deploy to Vercel | Push to main or manual | Validates, builds and deploys approved changes |

Schedules use UTC equivalents and may be delayed by GitHub. They activate only after these files reach the default branch. No ongoing Codex desktop session or powered-on personal computer is required.

The daily collector is deterministic and needs no AI key. Weekly editorial work uses the Codex GitHub Action and billed OpenAI API usage. It processes at most 15 candidates and adds at most 10 items per run; a 20-minute job timeout bounds runtime but is **not** a dollar spending cap. Configure an appropriate project budget/usage alerts before enabling it.

## Activation

1. Review and merge this change after checks pass.
2. In [repository Actions secrets](https://github.com/SrMessiSOL/futarchy-info/settings/secrets/actions), add `OPENAI_API_KEY` for weekly editorial work. Enter the value directly in GitHub, never in chat or a committed file.
3. In [Actions settings](https://github.com/SrMessiSOL/futarchy-info/settings/actions), allow GitHub Actions to create pull requests. Job permissions are declared explicitly; do not grant general write access to unrelated workflows.
4. For the supplied deployment workflow, configure `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`. Keep the existing KV environment configuration in Vercel. If native Vercel Git integration already deploys main, choose one deployment mechanism to avoid duplicate deployments.
5. Run discovery manually, inspect its report, then run weekly review manually. Review the first draft PR and its evidence metadata before relying on the schedule. No AI run or deployment is claimed until that rehearsal succeeds.

At setup inspection on October 8, 2026, this repository had no repository-level Actions secrets and workflow PR creation was disabled. Environment/org secrets and Vercel account configuration have not been verified.

Read [editorial policy](maintenance/EDITORIAL.md), [initial audit](maintenance/initial-audit.md), and [validation](maintenance/VALIDATION.md) for the evidence boundaries and remaining work. The allowlist now includes RSS feeds and an archive sitemap; see [backfill coverage](maintenance/backfill-coverage.md) for checked sources and unresolved gaps. Some official pages block automated requests; this is reported explicitly. Scheduled discovery cannot guarantee exhaustive coverage of X, podcasts, academic papers, or JavaScript-only sites.

## Content tools

```sh
npm run content:validate
npm run content:discover
npm run content:evidence
npm run content:audit
```

Discovery and evidence commands use the public internet. An unchanged scan creates no new candidates. Health checks never mark an article source-checked. Local reports and temporary source text live in ignored `work/`; only provenance metadata is exported by the workflow. See `maintenance/sources.json` to review allowed sources and `maintenance/editorial-prompt.md` for the saved agent instructions.

To pause upkeep, disable the relevant workflow in GitHub Actions. To roll back a published content batch, revert its merge commit; preserve historical resource IDs.

## MetaDAO project coverage

The library tracks the raised-project roster in `content/projects.json`, including historical projects and failed raises as separate categories. Browse by project in the website. See [the coverage report](maintenance/backfill-coverage.md) for source checks, project counts, and limitations. Automated reviews prioritize project updates and decisions; general futarchy history remains available.
