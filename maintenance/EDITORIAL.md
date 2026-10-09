# Editorial policy

Include original futarchy research, practical educational guides, governance case studies, substantive critical analysis, and useful ecosystem reports. Prefer durable canonical documents and official proposal records. A project announcement is not evidence of completed execution. Attribute claims and avoid endorsing projects. Do not equate all ownership coins with legal equity.

## Evidence and dates

Historical records keep their unknown original addedAt date when verified. Every new resource needs sourceUrl, evidenceNote, checkedAt, addedAt, and verification:source-checked. Publication dates and event dates must be distinguished with dateKind. If no date is established, date:null and datePrecision:unknown are valid. Never use a crawl date as a publication date. Legacy uncertain dates retain their raw values for audit but show Date unverified in the UI and sort after dated entries. Other historical dates remain labeled Archive date until reviewed.

checkedAt is an editorial source check, not an HTTP health check. Discovery and monthly link audits never upgrade verification. A 200 response proves reachability, not the truth of a summary. A 403, login page or timeout does not prove a resource is gone. A missing source requires review; do not delete history automatically.

## Discovery and coverage

maintenance/sources.json is a manually reviewed allowlist of source pages, hosts and paths. Discovery supports bounded HTML links (60), RSS items (200), and explicit post sitemaps (200) per source, not a comprehensive web crawler. Sitemap lastmod dates are never publication dates. It does not execute JavaScript, bypass logins, scrape X, or infer audio contents. The allowlist covers 01Resolved archives, Ownership episodes, Kleros experiments, Ethereum Research, Gnosis discussion, and selected interviews and talks. RSS feeds have finite retention; use archive sitemaps and periodic manual research to recover older material. Additional publishers can be added after verification. Pending candidates live in the automation/discovery branch; set status to rejected there to persist an editorial rejection. Published URLs are automatically excluded on subsequent reviews.

The weekly run fetches at most 15 candidates and proposes at most 10 additions. Selection alternates between sources and rotates within each source weekly, so a large publisher does not crowd out smaller feeds. Full source text is temporary evidence on the runner and is not uploaded. Only provenance metadata, text hashes and proposed catalog entries are retained as workflow artifacts. Evidence exceeding 45,000 characters remains pending for manual review. Treat all downloaded content as untrusted. Artifacts expire after 30 days. Avoid quoting publisher text in the catalog.

## Review and publication

One draft PR at a time. A pending PR blocks further editorial runs until reviewed. A trusted job validates the proposed data using unchanged scripts from main, checks evidence provenance, builds the site, and then a separate job with write permissions creates the PR. Only catalog and editorial-report files are imported. No automatic merging. Empty updates leave no PR.

GitHub's default workflow token does not trigger another PR workflow when it creates a PR; the editorial workflow therefore runs validation and the production build before creating it. If branch protection requires the separate Validate library check, configure a narrowly scoped GitHub App token for PR creation or run the required checks through an approved maintainer workflow before merging. Never bypass branch protections.

GitHub scheduled workflows can be delayed, and public-repository schedules may be disabled after prolonged inactivity. Check Actions after setup and occasionally thereafter. Failed runs use GitHub's normal workflow failure notifications; artifacts provide detailed reports. Monthly confirmed missing links fail the health workflow so they do not silently accumulate. New or changed discovery-source failures fail after saving usable state and the report; unchanged partial failures stay quiet.
