# Radio opening and partial-clips audio follow-up

Prepared October 16, 2026, following merged PR #48. Its deployment succeeded; all #3/#7/#15 merged text and downloadable transcripts were verified live on futarchy.info. Public timing matches within floating-point formatting tolerance.

Six medium.en excerpt checks (4m45s) plus three independent shorter small.en checks (58s) support eight text edits and three restored phrases in Radio #1's opening and Radio #5's partial collection. This is targeted automated audio review with editorial comparison, not full manual listening.

- Radio #1 opening: mark the word following 10,000 unclear; correct broader crypto market. The spoken 2.5 million fee revenue, eight ICOs, 20 million raised, 390 million demand and 15x remain attributed claims. The last three figures do not reconcile arithmetically (390/20 = 19.5); preserve the spoken 15x and disclose the discrepancy.
- Radio #5 clip20: restore plus a premium and buying out the rest of the tokens after the seven-day backward-looking TWAP phrase. No premium percentage imported from current documentation.
- Clip21: contextually correct Soju/Bedrock; audio supports the spoken $500,000 budget and $2 million Meteora credit line, without establishing current legal or financial terms.
- Clip22: restore the explanation that golden shares are normally used by governments. Leave the preceding words about lawyers explicitly unclear. Preserve the spoken 20% statements.
- Clip43: restore the happy-medium/in-case-of qualifier; retain the spoken 90-day P2P discussion and valuation examples. Correct 100k in revenue. These statements do not establish current P2P policy.

All original segment timestamps, source hashes and clip manifests are preserved. The three restored phrases use the original gaps as approximate phrase boundaries; they are not word-aligned by manual listening. Radio #5 still has 45 partial clips and missing clip28. Prior unresolved #3/#15 readings remain unresolved.

Evidence: maintenance/radio-clips-followup-2026-10-16/evidence.json. The new regression test reverses every insertion/edit and reconstructs both original recovery hashes.

Validation: npm run check passed, including 58 tests and TypeScript. Production build passed locally with npm run build -- --webpack. No merge or deployment of this follow-up.

---

# Recovered Radio: names and numbers audio follow-up

Prepared October 16, 2026. Eight audio excerpts (475 seconds) reprocessed with medium.en and compared with the published transcripts. This is targeted automated audio review, not full manual listening.

- 14 segment corrections across Radio #3, #7 and #15.
- Radio #3: resolve GeSIM's garbled count as 530 users, retaining the speaker's 180 paying-users claim; correct buyback, Futardio, USDC, duplicated million and the missing negation in "the market is going to decide, not me". Existing $7,000/$3,000 and stake figures remain attributed historical claims.
- Radio #7: resolve Milian's name from the audio introduction and the published Arcium interview; normalize dWallet Labs, 2PC-MPC and REFHE. Later Milian occurrences are contextual corrections, not individually re-listened passages.
- Radio #15: correct Authensus, ClearSig's self-custody terminology and the Safe/Squads comparison. Mark the unresolved additional chain name explicitly unclear.
- Stealf's 1k waitlist reading is supported. The new model suggests more than 5,000 testers, but the previously unresolved count stays uncertain. No claim that historical product/financial statements were independently verified.
- Radio #3's previously unresolved raise cap is not changed. Radio #1, Radio #5 and all other transcripts are unchanged. #5 remains partial clips. No dates, catalog membership or publication policy changed.

Evidence: maintenance/recovered-radio-audio-2026-10-16/evidence.json includes original/replacement segments, eight raw excerpt transcriptions, PCM hashes and previous/current published hashes. The new regression test reconstructs each previous transcript and checks its original recovery hash.

Validation: npm run check passed (57 tests, content validation and TypeScript). npm run build -- --webpack passed locally. Hosted standard-build validation is required on the PR. No merge or deployment.

---

# Recovered Ownership Radio recordings

Prepared October 15, 2026 for review. No merge or deployment performed.

- Added Radio #3 (GeSIM/P2P), #7 (Jurassic Finance, payments and privacy builders), #15 (privacy builders, MycoRealms and ClearSig), and #5 explicitly labelled partial clips.
- Added the 27m55s opening of #1 without altering the existing resumed transcript.
- Added downloadable text/JSON and agent discovery links; retained source clocks, hashes and uncertainty.
- Radio #5 has 45 clips, with clip 28 and intervening material missing.
- The file named Radio 13 is identical decoded audio to Radio 12. No duplicate episode published. Missing audio: #4 and #13.
- March 22, 2026 for #3 is supported by the stream timestamp. #5/#7/#15 dates remain unknown.
- Every accepted generated segment was read, with targeted terminology corrections; no claim of full manual listening or independent verification of speaker claims.
- Catalog: 800 records, 641 publication-eligible, 69 transcript assets. Detailed evidence and corrections: recovered-radio-2026-10-15/.

Validation: content validation, 56 tests and TypeScript passed. Production build passed with `npm run build -- --webpack`; default Turbopack failed locally with a Windows CSS worker process error (after an initial restricted-network font fetch failure). Local production smoke checks passed for all five affected readers, text/JSON attachment downloads, main-library agent discovery, and missing #4/#13 transcript 404s. Hosted default-build validation remains required on the PR.

---

## Recording review, tenth batch (October 14, 2026)

Reviewed all generated transcript text from the original Exit Liquidity YouTube interview with Proph3t and Nallok and the original Future Podcast audio with DIRT, MetaMAT and Nallok. Added original guides based on those exact editions. The FutureDAO walkthrough explicitly describes a devnet demonstration, not a verified mainnet deployment. Also read The Armen Show’s full original description and added a clearly limited publisher-outline note.

The no-notes backlog falls from 7 to 4. Exit Liquidity’s original RSS does contain the podcast episode: the preceding batch’s lookup missed its CDATA title. This pass read the actual episode node and corrected that research finding. Its November 25 podcast date and timestamps are not substituted for the October 30 YouTube upload. All IDs, source URLs, stored dates and addedAt values remain unchanged. No manual listening or complete speech capture is claimed, and no third-party transcript is published. Remaining gaps: Loyal private video, MCG’s long broadcast, December ThreadGuy replay and the 0xResearch roundup. Evidence: maintenance/recording-notes-tenth-2026-10-14.

## Recording review, ninth batch (October 14, 2026)

PR #44 is live: all four guides match production Markdown and JSON, and 551 production access checks passed. Reviewed all generated text for MCG’s five-minute Proph3t clip on ownership and treasury protections, correcting its title to identify a clip rather than a full stream. Added a separate publisher-outline note for Epicenter episode 98 after reading its original page in the browser. Full listening is not claimed for either source; third-party transcripts are not republished.

The no-notes backlog falls from 9 to 7. Loyal remains private. Exit Liquidity’s syndicated podcast guide is a useful recovery lead but has a different duration and publication date from the catalog livestream, so no unverified timestamps are transferred. The longer MCG founder broadcast remains pending. Corrected Epicenter’s publication date from September 28 to September 27, 2015 using its original episode page. No IDs, source URLs or project status changed. Evidence: maintenance/recording-notes-ninth-2026-10-14.

## Recording review, eighth batch (October 14, 2026)

Verified PR #43 deployed successfully to futarchy.info: the merged Kollan guide matches live Markdown and JSON, with all 543 production access checks passing. Recovered public audio for three Proph3t interviews (Pine Analytics, 11AM at Breakpoint and the October ThreadGuy interview) and read all locally generated research transcript segments. Added original topic guides with approximate ASR timings and explicit machine-transcription limits. Also read the full Nothing Human publisher transcript of Ivan Vendrov interviewing Robin Hanson; it supplies no timestamps, so that note has no invented chapter guide.

The no-notes backlog falls from 13 to 9. Full generated-text reading is not manual audio verification or proof of speech completeness. Third-party transcripts remain unpublished; this does not extend OwnershipFM permission. No source removed, project status changed or date value replaced. Nine unresolved recordings remain in the queue, including the private Loyal source and unavailable December ThreadGuy replay. Evidence: maintenance/recording-notes-eighth-2026-10-14.

## Recording review, seventh batch (October 14, 2026)

Verified PR #42 deployed successfully to futarchy.info: both merged guides match live Markdown and JSON, with all 541 production access checks passing. Added the 21-marker publisher guide for Jup & Juice’s interview with MetaDAO co-founder Kollan. Corrected the previous endorsement-like description; the interview discusses futarchy versus voting but does not independently prove superiority. No full listening or transcript review claimed.

The no-notes backlog falls from 14 to 13. Five additional source checks are documented without fabricated completion: Pine Analytics media recovery failed, Future Podcast lacks chapters, MCG’s founder segment is not located, ThreadGuy’s direct replay fails playback, and The Armen Show provides further recovery leads. Loyal’s previously verified private-video gap remains. No records removed or project status changed. Evidence: maintenance/recording-notes-seventh-2026-10-14.

## Recording review, sixth batch (October 14, 2026)

Added two MetaDAO founder reading guides with 37 topic markers: Midcurve with Kollan and Switchboard’s Mitch, and the recovered Alpha Liquid episode with Proph3t. Read the entire available Midcurve caption export and both publisher chapter lists. Midcurve captions end before the displayed duration and differ from chapter offsets; use publisher timestamps and disclose the gap. Alpha Liquid is a chapter-based review, not full listening or transcript review. No third-party transcript published.

Consolidated Jito’s promotional clip into res-44. Preserved the missing Blockchain Wire announcement internally and added the actual Alpha Liquid episode dated April 15, separately from the April 23 press release. Corrected the unsupported dedicated-MetaDAO title on the 0xResearch roundup; it remains pending. Loyal is still private, and 11AM’s Proph3t replay still needs content recovery. Public no-notes backlog: 17 to 14, through one existing guide and two promotional-reference consolidations; the newly recovered episode already has notes. Evidence: maintenance/recording-notes-sixth-2026-10-14.

## Recording review, fifth batch (October 14, 2026)

Added four guides and 39 topic markers: the Breakpoint 2024 Proph3t keynote, The Edge Podcast with Proph3t, Lightspeed with Kollan, and Lightspeed’s December 2025 roundup. Read all available keynote captions with explicit gaps; the other guides are limited to complete publisher descriptions and chapter lists. No manual audio verification or third-party transcript republication. Corrected the Lightspeed author spelling.

Consolidated Bankless res-64 into the already reviewed episode res-246 after comparing original publisher metadata and all ordered topics. The full X replay is an alternate version with different chapter timings, not a missing episode. Its ID and URL are preserved internally, and the public note retains the alternate link. The public backlog falls from 22 to 17 through four guides and one alternate-upload consolidation. Exit Liquidity captions remain unavailable, and Loyal remains unresolved. Evidence: maintenance/recording-notes-fifth-2026-10-14.

## Recording review, fourth batch (October 14, 2026)

Added guides for funded Omnipair and Solomon plus the early SRC:TLK Proph3t interview. Recovered public audio for the two CRYPTO VIDEOZ videos and read complete locally generated research transcripts; read the complete publisher automatic captions for SRC:TLK. This is machine-transcript review, not manual listening. Third-party audio and full transcripts remain unpublished. Token-buying tutorials are described as historical presenter commentary, without endorsing routes, prices, referral claims or technical assertions. Solomon’s previously accepted date remains unchanged despite the documented display-date discrepancy.

The public recording backlog falls from 25 to 22. Loyal’s previously private video remains unresolved. Prior PR #39 notes were verified live with exact JSON matches. Evidence and queue: maintenance/recording-notes-fourth-2026-10-14.

## Recording review, third batch (October 14, 2026)

Added four guides with 52 topic markers: the historical Ranger/Barrett interview, Gramajo/Proph3t, Solana/Kollan, and Jito/Kollan. Read the full publisher transcripts for Gramajo and Jito; the other two guides use publisher descriptions and chapter lists. No audio verification or third-party transcript republication is claimed. The Jito automatic captions contain a contradictory liquidity figure near 07:00, omitted from the summary rather than guessed. Early launchpad and AMM descriptions remain historical designs.

Corrected Carlos’s Ranger ICO analysis from video to article after reading the body; chart images and financial claims were not independently reviewed. The public recording backlog falls from 30 to 25 through four guides and one classification correction. Omnipair and Solomon caption retries still fail; Loyal has no recovered public alternate. Evidence and remaining queue are in maintenance/recording-notes-third-2026-10-14.

## Funded-project recording review, second batch — October 14, 2026

PR #36 deployed successfully; all eight merged notes matched production and all 489 access checks passed. Added three publisher-written-material reading notes (21 topic markers) for two Umbra/ICO discussions and the Abbas/Umbra interview. Added the missing Umbra project tag to that interview. No full listening or new transcript is claimed.

Corrected res-90 from video to article after reading the full Umbra pre-raise article. Consolidated the res-161 X upload into the existing res-127 YouTube show, retaining the original ID internally. Removed unsupported founder-interview/post-ICO wording from two CRYPTO VIDEOZ summaries; these remain pending audio review, not completed notes. Solomon’s displayed November 11 versus accepted November 12 date needs timestamp/timezone reconciliation; the stored date is unchanged.

The public no-notes backlog decreases from 35 to 30: three notes, one article reclassification and one alternate-upload consolidation. Evidence and queue: maintenance/funded-recording-notes-2026-10-14.

## Recording notes backlog, first funded-project batch — October 14, 2026

Confirmed PR #35's four corrected transcripts and 51 topic entries live on futarchy.info; all 473 production access checks passed. Added eight written-source reading notes with 60 publisher/preview topic markers, prioritizing Umbra, Avici, Solomon, historical Ranger coverage and MetaDAO. The no-notes queue falls from 43 to 35; no new transcript or complete listening review is claimed. Sources, review limits, previous descriptions and the complete remaining queue are recorded in maintenance/recording-notes-2026-10-14.

Sol Brothers's Umbra headline is distinguished from the publisher's stated retained capital. Avici presale figures and Solomon product descriptions remain historical claims. Loyal's res-102 video is private in the normal browser and remains unresolved. Dates were corroborated from displayed publication dates without changing their stored values. IDs, project classifications and publication gates are unchanged.

## Founder transcript quality and navigation — October 14, 2026

Read all 447 generated segments of the MetaDAO/Proph3t, Laso/Hunter, Paystream/Maushish and The Syndicate/Tim interviews. Corrected 103 segments and added 51 timestamped topic entries. Reprocessed 13 selected audio clips totaling 608 seconds with local small.en; this is machine re-recognition, not full human listening or independent verification. Paystream's garbled 75tk is now 750k, supported by the targeted recheck and host introduction. Remaining ambiguous figures, names and a negation are explicitly flagged rather than guessed.

The source-audio and original research hashes remain intact. maintenance/founder-quality-2026-10-14 contains before/after evidence, raw targeted rechecks, review limits and local endpoint results. Tests reconstruct the previous published edition and validate current hashes. Guides distinguish speaker claims and plans from verified outcomes; product/funding classifications and publication gates are unchanged. The 43 recordings without notes remain a separate backlog.

## Remaining transcript terminology — October 13, 2026

Reprocessed all 12 selected outstanding passages from official recording audio with medium.en, without a spelling prompt. Compared the machine output with the original segments and nearby discussion. Seven segments in six transcripts received supported contextual corrections: Umbra's “Pranay and Cal” (the official hub confirms Pranay's spelling; Cal's identity is not expanded), Loyal's “futarchy-pilled” question and split MetaDAO name, JurassicFi in Radio #6 and #11, MetaDAO in Forum #1, and futarchy in Report #16. Report #16 audio was newly recovered from the official YouTube upload; the original caption hashes remain intact.

Six passages remain unresolved: Radio #1 at 38:04, Radio #10 at 1:16:39 and 1:42:35, Radio #17 at 8:12, Radio #24 at 1:01:22, and Radio #6 at 1:07:55. Their text remains unchanged because re-transcription did not establish reliable wording. The first is still confused with “metadata”; the others include garbled compounds, platform references, participant greetings and a legal-framework name. See maintenance/remaining-audio-review-2026-10-13/decisions.json for decisions and audio-rechecks.json for exact machine outputs and recording hashes. The old Umbra queue pointed to the preceding segment; the actual name phrase starts at 168.05 seconds.

This is targeted ASR and editorial comparison, not manual listening or a fresh review of every word. User decisions on the five listening clips, including Loyal's circulating-token wording and tentative Arihant name, are preserved. Catalog records, dates, funding classifications and publication scope are unchanged. PR #24's automatic deployment succeeded and all 57 live transcript JSON/text endpoints matched the merged version before starting this pass. New corrections await PR review.

Validation: npm run check passes (content validation, 44 tests and TypeScript); npm run build passes.

## Transcript quality audit — October 12, 2026

Scanned all 57 published transcripts (55,588 original segments across 89.52 recording hours). This is structural and repetition triage, not a full manual listening or factual review. Re-transcribed 17 severe repetition intervals across ten recordings from hash-matched original audio, using non-batched base.en beam 3. Compared replacement text for removal of loops; names, amounts and speaker attribution remain unverified. Sorted seven transcripts by existing segment timestamps without changing timestamp values. Evidence, original segment hashes and before/after scans are retained in maintenance/transcript-quality-2026-10-12.

All 57 transcript JSON payloads now carry qualityAudit metadata and a published-segment hash. Plain-text agent access lists 38 intervals over 30 seconds without transcript text; these may contain silence, music, waiting time or omitted speech. They are unresolved audio-review targets, not proven missing speech. Caption intervals are inferred, so contiguous caption timestamps do not prove complete speech coverage. Existing Roadshow #3 omission and all public-scope rules remain. No global guessed name corrections were made.

Fixed note regeneration so existing published transcripts and notes are preserved instead of being overwritten by stale research drafts. Regression tests verify preservation, severe-loop triage and replacement provenance. All 39 tests and TypeScript pass. Production build and endpoint verification are recorded in the PR. Source catalog, project roster, dates and funding classifications are unchanged; no deployment in this pass.

## OwnershipFM transcript gap closure — October 12, 2026

Rechecked the official YouTube Reports (18), Forums (2) and Roadshows (5) playlists and current X series announcements. All 25 numbered playlist recordings already have catalog entries. Recovered 13 previously unavailable English automatic caption tracks for Reports #1–7, #11–12, #16–18 and Forum #2, plus a local faster-whisper transcript of Report #14 (Umbra V2). These 14 additions cover 10.93 hours and 14,577 timed segments, increasing public transcript availability from 43 to 57. All 18 Reports, two Forums and five Roadshows now have transcript assets, although known ASR omissions and unreviewed-machine limitations remain; Roadshow #3 still omits its unreliable opening four minutes. Recovery does not mean full manual transcript review or verified speech completeness. Source summaries, dates, IDs, funding status and publication gates are unchanged.

Radio #32 remains the latest observed numbered announcement. All 26 recovered Radio recordings already have transcripts. Six missing replays (#3, #4, #5, #7, #13 and #15) remain unresolved after fresh downloader and normal-browser checks; each browser page returned a generic error, and the official YouTube channel search found no Radio alternate. These are access gaps, not proof the recordings never existed or were deleted. The team would need an accessible replay or original audio backup to close them.

Validation: all 36 tests, TypeScript and production build pass. This follow-up is prepared for PR review, not deployed.

# Source review update — 2026-10-12

## Previously funded project history in the main library

The user distinguishes failed fundraising attempts from projects that raised and subsequently closed or changed ownership. All eligible Paystream, Ranger and ZKLSOL/ZKFG/Turbine Cash history now belongs in main browsing and default agent access. Their historical-raise status, active-project count and publication cutoffs are unchanged. Main project selection includes these historical companies with explicit historical labels; Turbine Cash is named in the existing ZKLSOL/ZKFG registry entry rather than counted as another raise.

All six previously approved podcasts, all three videos and the news item from the former archive are available in main. The Bountive pitch and Ryvo Report #15 are explicit media exceptions; other failed-raise material remains in the unsuccessful-raises archive. Failed projects without a verified Radio appearance remain unpublished under the existing retention rule.

Scope counts: 616 main sources (437 articles, 64 podcasts, 96 videos, 16 news items and three papers), 23 archive sources, and 633 unique public records. Six failed-project media entries overlap both scopes. There are 44 additional main-library entries relative to PR #16. No source IDs, dates, transcript payloads or project funding statuses change.

## Main-library visibility for six retained recordings

At the user's request, the Paystream/Maushish podcast, Seb Monty's Cobra/Ranger interview, and Ownership Radio #16, #21, #22 and #23 now appear in the main-library selection as well as the historical archive. The same six original records are selected, not copied. Project statuses, closed-project cutoffs, retention rules, dates, descriptions and transcripts are unchanged. The browsing exception operates only after public eligibility filtering.

Expected scope counts: 572 main-library sources (64 podcasts, including 26 recovered Ownership Radio recordings), 67 historical sources and 633 unique public sources. The scopes now overlap by six records and must not be added together. Agent discovery documents this overlap.

## Roadshows #3 and #4: local transcription and production catch-up

Merged PR #14 (902ca011255f4e7fed7d28919d05c043c419eb65) was deployed through the existing authenticated Vercel CLI. futarchy.info and www.futarchy.info point to the Ready production deployment https://futarchy-library-l5zdcykdv-srmessisols-projects.vercel.app. The public library returns HTTP 200 with 633 eligible sources, including all 25 numbered Reports, Forums and Roadshows. All 41 previously available transcript JSON endpoints were checked successfully. The earlier deployment failure below is historical; the missing GitHub workflow token was not created or changed.

Downloaded the official YouTube audio for Roadshow #3 (8203.1146875 seconds) and #4 (7221.742625 seconds), decoded the complete files, and generated local English faster-whisper base.en transcripts. Add 299 and 253 timestamped segments respectively, retaining audio hashes, transcript hashes, model, permission and review limits. All 41 existing transcript payloads remain unchanged; total available transcripts is now 43. All five Roadshows have transcript access. Publisher captions for #3/#4 remain unavailable; the coverage report distinguishes that from local transcript availability.

Targeted non-batched ASR reprocessing repaired #3's opening alignment and a sparse passage around 18 minutes. The first four minutes still produced repetitive non-lexical syllables and are explicitly omitted as unreliable; no claim that every spoken word was recovered. Remaining segments passed bounded-time, sparse-segment and long-gap checks. A targeted closed-project-name scan found no matches. These checks are not full manual reading, listening, accuracy correction or independent claim verification. Public summaries and project eligibility remain unchanged.

Validation: 35 tests and TypeScript pass; production build and final deployment verification recorded in the delivery message. Agent access remains behind the same public-view gate as the website.

## OwnershipFM X and official video archive follow-up to merged PR #13

Reconciled OwnershipFM's X archive against its three official YouTube playlists: 18 numbered Reports, two Forums and five Roadshows. The catalog lacked all Report/Forum entries; add 20 full-show records, retain the five original Roadshow IDs and use verified official YouTube versions as their source links. No reminders, recap posts, clips or alternative-platform duplicates are added. Three Reports are explicitly wider ownership context rather than MetaDAO-funded companies. Ryvo remains retained failed-raise history under its existing actual Radio appearance.

The X links for Reports #2 and #6 redirect to 404, and Report #1's original Space reply says Details not available. Their official YouTube versions close these access gaps. All 25 complete publisher descriptions and playlist metadata were read; 17 Report replay pages and both Forum replay pages were additionally checked on X, with the two redirects recorded. Verified YouTube publication dates are distinct from original event dates. The existing Roadshow event dates remain unchanged. Exact episode reconciliation and links: maintenance/ownershipfm-archive-2026-10-12/coverage.json.

Recover nine publisher automatic caption tracks: Reports #8, #9, #10, #13 and #15; Forum #1; Roadshows #1, #2 and #5. Agent text/JSON endpoints and reading notes expose them under existing OwnershipFM permission. Sixteen videos have no recoverable caption track. Caption hashes identify source exports; no audio hashes are invented. Ends are inferred intervals bounded by observed player duration. These tracks have not been completely read/corrected or manually checked against audio; the nine recovered tracks do not close the full-content review gap. A targeted caption scan found no Ranger/RNGR, Paystream, ZKFG/ZKLSOL, Zinc Cash/Turbine Cash or mtnCapital references; ordinary uses of the verb pays are not ticker mentions. Descriptions and original participant tags retain the existing public-view lifecycle gate.

Live publication issue: futarchy.info/api/library?scope=everything returns 404. The main-branch deployment after merge b11d977 failed because VERCEL_TOKEN is missing; VERCEL_ORG_ID and VERCEL_PROJECT_ID are present. Run: https://github.com/SrMessiSOL/futarchy-info/actions/runs/38326750441. No production deployment, credential creation or secret mutation performed in this archive follow-up. The live site has not been confirmed to contain the merged media changes.

Validation: 787 catalog records, 633 publication-eligible, zero lifecycle-held records, 623 source-checked, 108 media notes and 41 available transcripts. All 35 tests, TypeScript and the production build pass. The local production preview exposes all 25 playlist shows, returns Loyal's 767-segment caption track in text/JSON with timing provenance, and correctly explains Forum #2's unavailable-caption status. Wider-context episodes add no funded-project registry records. Full content review remains open.

## Trading launch and document date follow-up to merged PR #12

All 24 retained MetaDAO company profiles now use the original token trading-live day, explicitly labeled as an event rather than profile publication. Eleven dates use primary MetaDAO trading/launch notices (announced availability; no independent first-swap audit). Twelve permissionless/Spark dates use finalized public launch-account completion timestamps and the reviewed liquidity initialization path; six also have a matching successful CompleteLaunch/ProvideLiquidity transaction inspected. Omnipair's original July 2025 finalization and Raydium pool activation were inspected directly; later pool migrations are excluded. Exact source links and evidence boundaries are attached to each record. The old unverified hints are retained only as audit history.

Five document/repository dates accepted on user authority: four known modification dates labeled Updated and one separately confirmed Areal repository date. The Salmon Wallet documentation reference is hidden publicly; its original ID and other Salmon material remain. All 30 previous reference gaps are addressed as 24 event dates, five document/repository dates and one requested removal. This does not establish publication dates for living profiles, prove every first swap, or claim exhaustive source coverage. No detailed uncertain-date list is added to the PR. The earlier checkpoints below are historical.

Validation: 767 catalog records, 613 publication-eligible, zero lifecycle-held records; all 34 tests, TypeScript and the production build pass. The local production preview confirms 24 trading-live dates and all five document dates in agent JSON, excludes the Salmon documentation entry and renders Trading live labels. Nothing merged or deployed in this follow-up.

## Latest scope and date corrections — PR #12

The user confirms the 62 stored dates as verified. Date fields now accept that authority without upgrading source-body verification. The detailed date inventory and its generator were removed from the PR diff on request.

Of the 186 formerly undated records, 87 belong to excluded projects and were skipped. All 99 retained sources received a date review: 43 exact YouTube publication dates, two original LinkedIn publication timestamps, the RockawayX Ranger interview date from its publisher archive, and 23 exact raise-start timestamps from primary platform pages. Thirty remaining sources are living references with no single publication date established: 24 MetaDAO company profiles and six documentation/repository references. Four reference pages have explicit lastModified/dateModified timestamps, recorded as sourceUpdatedAt rather than publication dates. Current labels distinguish Raise start and Undated reference. Video upload dates are separate from recording/event dates.

Latest retention rule: failed-raise projects only remain publicly if they actually appeared on Ownership Radio. Fourteen such projects have reviewed recording references. Fifty-two other failed-raise projects and 115 standalone records are removed from public browsing and agent access, with original IDs retained internally. The new scope instruction supersedes the earlier restoration for two BlockRock records. Mixed sources with retained projects stay available. Announcement and Roadshow participation alone do not establish a Radio appearance. Previous counts and checkpoints below are historical.

## Media cleanup and agent access — follow-up to deployed PR #10

PR #10 was merged and its reviewed tree deployed to futarchy.info on October 12. The following changes are a new follow-up for review; previous checkpoints below describe their original state.

- Retain all 32 Radio announcement IDs internally, hide them from browsing and agent discovery, and link 26 to their actual recordings. Six unavailable recordings remain gaps. None of the 37 user-approved restoration IDs is hidden by this cleanup.
- Publish 32 available OwnershipFM machine transcripts (26 Radio recordings and six founder podcasts) under explicit OwnershipFM team permission provided in this chat. Timed text and JSON include provenance, warnings and coverage boundaries. One Chris transcript end time exceeded measured audio duration; clipped with originalEnd retained. No transcript permission inferred for other media publishers.
- Expose original reading notes for 83 reviewed media records and add agent discovery plus scoped catalog/individual-note/transcript endpoints. Public APIs follow website visibility gates.
- Replace Roadshow #1’s mirror account link with its publisher replay; add direct replays for #2–#5. Full Roadshow content and transcripts remain unreviewed. Replay #2 says ended May 8, distinct from the winner excerpt posted May 11 and company-page May 12 reference.
- Add two Blockworks reports/news articles, its June 2025 MetaDAO disclosure PDF, Jito JIP-10 forum and a Zcash forum critique. Recheck The Block’s Umbra article and distinguish commitments from the accepted cap. Existing 01Resolved reports, GeSIM Devcon discussion, CoinDesk Solomon research and founder/media interviews remain available.

Validation: 767 catalog records, 729 public records (547 main / 182 historical), 603 source-checked. All 31 tests, TypeScript and production build pass. Production preview endpoints return JSON, plain-text transcripts and Markdown notes; Radio #32 has 818 timed segments, and an announcement transcript URL returns 404. Browser preview shows transcript and notes links. Coverage evidence: maintenance/media-access-2026-10-12/coverage.json. Existing personal archives and external-media coverage remain non-exhaustive.

## Previous PR #10 preparation checkpoint

**Local editorial draft; not published. Main scope revised on user request.** Nothing pushed, merged, published or deployed. PR #3 was already merged; these findings extend that earlier update locally. Personal archives and recording coverage remain incomplete.

## Latest funded-founder pass and PR preparation

Four primary additions: complete available Umbra/Loyal Lightspeed and P2P Seed Club caption tracks, plus the complete HiveBits Startit written founder interview. Three recording-specific gaps closed; personal archives remain open. Detailed evidence and transcript hashes: [funded founder review](source-review-2026-10-12/funded-founder-final-pass.json).

Current draft: 758 records, 752 visible, 592 source-checked; 570 main-library and 182 historical sources. All 37 approved restorations remain available. Active funded-project research covers 22 projects. Validation: 28 tests, TypeScript and production build pass. Live GitHub preflight confirms no editorial PR and six dependency PRs; no PR for codex/deep-source-review, so remote CI/review checks are not applicable yet. [Reviewable main PR description](source-review-2026-10-12/proposed-pr-description.md).

## User-approved restoration — prior checkpoint

All 37 listed records restored on explicit user instruction. Zero lifecycle-held records; 748 visible sources: 566 main and 182 historical. Closed projects remain outside active-project browsing and founder research. Dates and source-check limitations are unchanged. Earlier exclusion checkpoints below are superseded. Exact approved IDs: content/publication-exceptions.json. Validation: 28 tests, TypeScript and production build pass. Nothing pushed or deployed.

## Closed-project publication safeguard (superseded)

The user requested no material about Ranger or other liquidated projects after liquidation. The public gate now excludes 37 records matching closed-project names/tags with dates on/after conservative cutoffs or unknown/unverified dates. This includes mixed reports and untagged mentions. All 754 records and original IDs remain internally preserved.

Ranger: March 2 proposal-creation cutoff; Paystream: August 15 founder wind-down announcement; ZKFG: June 9 liquidation-offer proposal cutoff. These are deliberately earlier editorial boundaries, not independently verified liquidation execution dates. mtnCapital has no established primary cutoff and matching sources are held. Solomon's product-model wind-down is not company liquidation.

Current eligible library: 711 sources, 555 main and 156 historical. Active founder research: 22 projects; Ranger, Paystream and ZKFG are deferred. Detailed exclusions: [liquidation publication audit](source-review-2026-10-12/liquidation-publication-audit.json).

## Publication scope revision (prior checkpoint)

The user requested priority for projects that actually raised. Main library: 610 visible sources; opt-in historical archive: 138. Raised-project navigation contains 25 projects; failed attempts have their own list. The 57 pending failed-raise links are deferred historical research, not main-publication blockers. Active funded-project gaps are recorded in [the raised-project research queue](source-review-2026-10-12/raised-project-research-queue.json). None of those gaps are falsely closed. Main coverage is ready for review with disclosed limitations; no publication authorized by this separation.

## Latest 75-link continuation

18 original queued links assessed, with five additional primary documents discovered and reviewed. Ten catalog sources added: CarryLend, Talaria-linked CYNIC, Areal, Bynomo founder portfolio, Tributary README and newer pitch, both sides of the Sanctum dispute, and two Insert Coin product interfaces. Five full Bogdex essays reviewed and not selected.

57 queued links remain untouched. This queue contains profiles, indices, recordings and individual posts, not 57 known article bodies. Inspected profiles and organization indices still have wider historical archive gaps. Bynomo video is unavailable with a publisher-account termination notice; the Talaria chess repository returns 404. Neither proves project wind-down. SizeMatters written post is reviewed but embedded video is not.

Current total: 754 records, 748 visible, 588 source-checked, 91 projects. All 371 original IDs retained. CarryLend's fork tests are not public deployment proof; Areal specifies a local test validator; Tributary explicitly describes its Lighthouse validation dispatch as configured but not enforced. Source review does not independently audit these claims.

Validation passed: catalog checks, 23 tests, TypeScript, approved local production build, unique IDs and ledger references. Publication remains HOLD while requested source review is incomplete.

## Current draft

754 catalog records: 748 visible and 588 source-checked. 383 additions over the 371-record checked-out baseline; original IDs preserved. The earlier ledger records 47 additions and 6 repairs; the cumulative full-content ledger records 336 additions and 66 corrections with previous versions retained. Counts across ledgers describe their passes, not distinct corrected records.

## Direct recording recovery

26 Radio recordings recovered from public publisher replay links. 6 attempts remain unresolved. Downloading, full decoding, transcription and reading are separate statuses in the [32-episode manifest](source-review-2026-10-12/ownership-radio-recordings.json).

Radio 1, 2, 6, 8, 9, 10, 11, 12, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32 and 6 founder interviews have complete locally generated transcripts read (64.2 hours of source audio processed in total). Six founder recordings were obtained directly from the official Ownership RSS. These are transcript-based editorial reviews, not complete manual listening. Recognition errors, occasional hallucinations, approximate timestamps and uncertain names/figures are excluded from conclusions. Audio and full transcripts remain in ignored local working storage; durable review files contain provenance, hashes, chapter notes and concise summaries.

- Radio 32: Kimia beta, audit and financing plans remain prospective; Kaboom’s public game was described as paused ahead of its planned raise. No executed raise or security assurance inferred.
- Radio 19: Kimia launch plans and buyback debate; Futardio Cult proposal discussion. Advertised Yieldbay and Bountive interviews did not happen.
- Kru/Umbra: governance, fundraising and historical privacy architecture; later architecture articles qualify these plans.
- Shrii/Credible: trade-finance-to-payment-financing pivot, underwriting and prospective expansion; yield and licensing claims remain attributed.
- Ranga/Solomon: basis-yield compression, Treasury-backed USDv and proposed yield-routing policies; historical plans, not execution proof.
- Sheldon/P2P: merchant coordination, local payment rails and planned expansion. Regulatory and fraud-prevention claims remain attributed to the founder. His separate Seed Club interview is still only a partial public preview.
- Rakka/Omnipair: treasury accountability, audit-funding discussion, isolated lending pools, manipulation risk and bad debt shared within a pool. Roadmap features are historical plans.
- Chris/Loyal: fundraising, holder feedback, buyback experience, private payments and experimental human-approved agent transactions. Buyback figures are not independently reconciled on-chain outcomes.

[Current recording and founder review](source-review-2026-10-12/review.html) · [Acquisition evidence](source-review-2026-10-12/recording-acquisition.json) · [Founder transcript chapters](source-review-2026-10-12/ownership-audio-reviews.json).

## Additional recording-led findings

Radio 1 and 2 transcripts led to three previously missing permissionless projects: MycoRealms, Valgrid and NVISION. Five distinct unsuccessful launch records are retained, including three MycoRealms attempts with different targets and a later Cordyceps pivot. Commitments are not accepted proceeds; displayed refunding status does not prove individual refunds completed.

Hurupay now has a historical 2023 founder interview, a founder reflection, and a complete March 2026 interview with all three named founders. The latter covers the freelancer-payments pivot, a reported fraud incident and banking dependencies. Reported financial metrics are not an independent audit. [Source decisions](source-review-2026-10-12/radio-led-founder-followup.json).

## Latest continuation

The preceding continuation added 39 sources, bringing its draft to 744 records (738 visible; 578 source-checked); the latest pass above supersedes these totals. All ten bodies in the inspected Fabian Schuh Medium index and all five surfaced X Articles are read: eleven written sources selected, four not selected. Two Tributary historical pitch/demo caption tracks and Bountive’s complete available pitch captions are read. PRISM’s seven visible blog essays are read; documentation field notes remain separate. NFA adds Wiktoria’s full X Article and its linked company thesis; the five Bogdex article bodies were subsequently read and not selected in the latest pass. Current Markov devnet/unaudited status, Coinflip Pump.fun announcement, PrivateDAO Testnet boundaries and Cloak hackathon limitations qualify older pitches. At that checkpoint, 69 original links and 75 total leads were pending; the latest queue now has 57 untouched links. Access gaps, profile/index inspections and wider archives remain additional work; these counts do not mean exhaustive completion.

[Linked-source decisions](source-review-2026-10-12/linked-founder-source-review.json) · [Live remaining queue](source-review-2026-10-12/founder-source-followup-queue.json)

### Previous directory continuation

All 63 previously pending claimable raise pages and their complete available expanded pitches were read: 56 substantive records added and seven test, joke or insufficiently attributed listings retained only in the inventory. Together with 19 previously cataloged attempts, all 82 inventory entries now have a disposition. This adds 51 project registry entries, for 91 total. Six further written sources cover NFA company/founder history and the SEND sunset. At that previous pass there were 102 pending linked-source reviews in a 106-link queue; the latest continuation above supersedes these counts. this is not exhaustive personal-archive coverage. Areal now has four distinct unsuccessful raises plus its funded launch. The new Areal attempt is the approximately $11.7K/$50K listing; the $1,350 attempt was already cataloged. Raise closing dates are not publication dates; refunds open does not prove completed refunds.

[63-attempt review](source-review-2026-10-12/permissionless-raise-review.json) · [Founder follow-up queue](source-review-2026-10-12/founder-source-followup-queue.json) · [NFA and SEND source review](source-review-2026-10-12/nfa-send-founder-review.json)

### Previous recording continuation

Radio21,23,24 and25 now have complete available generated-transcript reviews (12.85 hours), closing the recovered-recording queue: all 26 recovered recordings reviewed, with six unavailable references remaining. Three targeted one-minute ASR repairs were read. Seven primary failed-raise pages and expanded pitches add Ryvo Network, HIIE, Digg, SuperPumped, GameByts, Aeonian and Degen Terminal. Radio25 supplies the Veilo follow-up absent from Radio22, clarifying private funding versus public application state and relayer visibility without validating implementation. Aeonian’s current mutable pitch claims mainnet while its historical interview described devnet; transition date remains unverified. GameByts historical team-business revenue is kept separate from current product metrics. The expanded directory contains 82 claimable attempts, including repeat and test entries; that bounded detail review is now complete; linked-source review remains open. See radio21-25-founder-followup.json.

### Earlier continuation

Radio 16 and 28 now have complete generated-transcript reviews (4.58 hours of source audio). Salmon Wallet adds a missing unsuccessful raise: $97,535 committed against $375,000, 53 funders; refund completion remains unverified. Its current platform documentation qualifies the historical roadmap. LFOWN-001 identifies Spark representatives Mathis and Ewan; Passed is not execution proof. ZeroFiat explicitly corrects the host: it had not listed a Futardio raise. Milker is described as devnet, with prospective fundraising. Two garbled Radio28 passages were re-transcribed and reviewed. Radio27’s complete HiveBits guest segment is also read, with the full episode subsequently completed in the latest continuation. See radio16-28-followup.json, radio28-asr-recheck.json and radio27-hivebits-segment-review.json.

### Prior continuation

Five more complete recovered Radio transcripts reviewed: 11, 12, 14, 29 and 30. New primary records add Kavex and The Syndicate to the roster; current Backable directory has 13 funded projects, all now represented. Three distinct unsuccessful Areal raises and its funded launch are reconciled. Jurassic RAWR-001 and MetaDAO-038 were read with their platform execution labels; funding is not proof of completed legal work or service delivery. Hanson’s Advisory Futarchy, Paradigm’s Opportunity Markets and Arcium’s Bench introduction provide primary background for Radio 12. See radio11-followup.json, radio12-reading-followup.json, radio30-followup.json, areal-raise-history.json and backable-directory-reconciliation.json.

Credible: all 33 remaining article bodies in the bounded 51-link company-blog inventory were read. Seven distinct sources selected, 26 not selected because they repeat existing coverage or general promotional commentary. The inventory now has 20 cataloged and 31 reviewed-but-not-selected bodies, with no pending bodies. Company bylines do not establish personal founder authorship. Volume, licensing, hardcoded revenue routing and advertised yield remain issuer claims.

### Previous continuation

Radio 9 and 10: complete generated transcripts read across 4.45 hours of recovered audio. Ten written sources added alongside the two recordings. Radio 9 covers Crafts/ReFi Hub and Epicentral incubation; Telebux was postponed. Radio 10 covers Umbra OTC plans, Ride treasury-loss exposure, the Futardio Cult content proposal, and Pulsar Spaces. Guest participation or planned fundraising does not establish a completed MetaDAO raise. FUTARDIO-004 now displays Passed, but its sole attached instruction is a memo, not proof of payment. Dean’s May 18 transition post records plans, not completed governance migration.

Hunter’s homepage inventory has 126 posts: 10 cataloged, 2 further bodies reviewed but not selected, and 114 pending. The bounded 2022–2026 homepage-linked articles now have body reviews or existing catalog evidence. Eight additional Credible blog bodies were read: five selected and three not selected. That earlier pass left 33 bodies pending; the latest continuation above closes this bounded index. A May 2026 article still speaks about 2025 as future; its unsupported legal-protection assertions were not adopted. Epicentral’s old linked domain currently serves unrelated gambling content; its cause is unestablished and it is not used as a current project source.

[Radio 9 chapters](source-review-2026-10-12/radio9-content-review.json) · [Radio 10 chapters](source-review-2026-10-12/radio10-content-review.json) · [Founder follow-up](source-review-2026-10-12/radio9-founder-followup.json) · [Hunter archive inventory](source-review-2026-10-12/hunter-archive-index.json)

## Written founder archives

- Umbra: all surfaced X Article entries in the inspected Kru (5), Cal (3) and Abbas (4) indices read, plus Pranay (2) and Pata (1). Kru’s separate Index podcast publisher transcript was read in full. August plans to move off Arcium qualify January–March architecture explanations. September V2 targets are not proof of delivery. These bounded indices do not exhaust short posts or external interviews.
- Solomon: nine publisher articles carrying Ranga’s byline reviewed, plus the alternate X Lab Notes 04 edition. Six old entries upgraded; generic bylines corrected. The wrongly described res-186 was repaired and retained as a hidden duplicate of the canonical Lab Notes 04 entry. Original basis-trading explanations remain historical.
- Paystream: three early full X articles and founder-prepared static-analysis report reviewed. Automated scanner output is not an independent manual audit; historical liquidity and beta plans are qualified by later wind-down reporting.
- GeSIM: both founders’ origin/architecture posts and the Devcon forum exchange reviewed. Carrier visibility and VPN trust assumptions remain explicit. Unknown LinkedIn publication dates stay null; the forum date identifies the relevant reply, not thread creation or a future event.
- Avici: Ram’s bounded visible article archive reviewed in the earlier continuation. Abhishek Tiwari’s current public profile corroborates the cofounder handle; an /articles route that only displays Posts does not establish that no long-form archive exists.
- HiveBits: the primary interview publisher tags @0xBeeSmart in its Nemanja excerpt. Excerpt text and account attribution do not constitute a full interview review.
- Earlier continuation: Rakka’s five X articles, Chris’s surfaced X article, seven Hunter essays (five selected, two excluded), ten company-authored Credible Insights pieces (separate from the now-completed 51-link blog index: 20 cataloged and 31 reviewed but not selected; links saved in credible-archive-index.json) and the primary Hurupay-to-Kolan announcement. Hunter’s retraction qualifies historical lending essays. Credible volume inconsistencies, unverified audit assertions and licence targets remain attributed. No founder byline inferred for company-authored articles.

## Existing broad review and remaining gaps

All 73 full X articles in the original discovery batch were read: 50 additions, 13 historical corrections, 7 alternate editions and 3 exclusions. Embedded media and linked documents are separate review objects. All 49 complete available caption tracks retrieved in the earlier video pass were read: 43 additions, 5 exclusions and one alternate interview used to update res-262. Across 117 discovered YouTube links, 3 had captions disabled, 64 were blocked or not attempted after blocking, and one existing video was not rechecked. No protections were bypassed; access failure is not proof of deletion.

6 Radio episode reviews remain unresolved: 0 downloaded recordings await complete transcript review, alongside 6 unavailable references. Radio 1 is only the recovered second part of a broadcast interrupted by a Space failure. Six original replay references (3, 4, 5, 7, 13, 15) returned unavailable/not-found responses; this does not prove deletion. Other retrieval or conversion failures are listed separately. Remaining work includes wider founder/cofounder archives, the Roadshow source replacement, broader Hanson and forum material, and primary mtnCapital raise/wind-down evidence. Team appointments are not inferred from Spark promoters; interview participants are not automatically company founders. Deposits are not revenue; proposals and scheduled launches are not executed outcomes; ownership coins are not universally legal equity.

Founder coverage includes the 91 registered projects plus a historical mtnCapital supplement. The current Backable funded directory was reconciled against the roster: 13 funded entries represented, including The Syndicate. Live/upcoming entries remain leads until a relevant raise is established; historical coverage is not claimed exhaustive.

## Review artifacts

- [Searchable cumulative decisions](source-review-2026-10-11/full-content-review.html)
- [Full-content ledger and previous versions](source-review-2026-10-11/full-content-decisions.json)
- [Founder coverage and remaining gaps](source-review-2026-10-11/founder-coverage.json)
- [Original 611-link discovery snapshot](source-review-2026-10-11/review.html)
- [October 12 recording and archive report](source-review-2026-10-12/review.html)

The 611-link snapshot is historical discovery data, not 611 approved additions. Earlier acquisition notes are superseded by the current recording manifest.

## Validation

The current 754-record draft passed catalog validation, all 23 tests, TypeScript and the approved local production build (six static pages). All 371 baseline IDs remain; review JSON parses and decision references resolve. An initial sandbox build hit Windows path access denied; the approved build succeeded. Editorial coverage remains incomplete.
