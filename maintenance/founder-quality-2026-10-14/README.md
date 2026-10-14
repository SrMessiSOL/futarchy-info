# Founder transcript quality and topic guides — October 14, 2026

Read all 447 generated segments in the existing Proph3t/MetaDAO, Hunter/Laso, Maushish/Paystream and Tim/The Syndicate interviews. Added 51 timestamped topic-guide entries and corrected 103 segments. The guides describe the discussion at recording time; they do not upgrade publisher claims to verified outcomes. This work adds no new catalog entries and does not change project scope or publication cutoffs.

| Interview | Corrected segments | Topic entries |
| --- | ---: | ---: |
| MetaDAO / Proph3t | 13 | 14 |
| Laso / Hunter | 34 | 13 |
| Paystream / Maushish | 42 | 13 |
| The Syndicate / Tim | 14 | 11 |

Corrections include MetaDAO, Proph3t, Kollan, futarchy, Paystream, Laso, Backable, Colosseum, Raydium, Meteora, Arcium, TWAP, vaults and perp-to-perp terminology. Each changed segment has its previous and replacement text in evidence.json. Original research-transcript and source-audio hashes are retained. Tests reverse this pass and verify the exact previous published hash, including the earlier recovery evidence; historical evidence was not rewritten.

## Audio evidence and limits

Reprocessed 13 selected clips totaling 608 seconds from the locally retained official RSS audio with small.en, CPU int8, beam 5, without a spelling prompt or VAD. audio-rechecks.json contains the resulting machine text, source-audio hashes and decoded-clip hashes. The ignored work script work/founder-quality/recheck.py documents extraction and recognition settings. These are machine rechecks, not human listening. Reading every generated segment does not prove every spoken word was captured or corrected.

Paystream at 04:03: the original “75tk” is corrected to “750k”, supported by the targeted recheck and the host's earlier “750,000”. This is a correction of the transcribed statement, not independent confirmation of accepted proceeds. The original remains in evidence.

Remaining issues are surfaced in the public notes and transcript editorial checks:

- Laso, 05:29: second MetaDAO team name after Proph3t remains unclear; no identity assigned.
- Laso, 21:27–22:25: the recheck reads $750,000 volume and roughly $34,000–$35,000 revenue but still renders “three days”. Original split-number segments and period remain flagged rather than silently changing the reporting window.
- Paystream, 10:30: both passes call the proposal requirement a “3.5% fee”; the transcript does not establish the actual mechanism or a current rule.
- Paystream, 15:00: the model suggests SOL before $81 but leaves Bitcoin's “65 or 66” unit unclear. No missing thousands supplied.
- Paystream, 36:27: both passes render an awkward negative about proving principal protection. Retained, not rewritten into a claim that protection was demonstrated.
- Paystream, 38:52–40:30: the competitor name remains uncertain; no guessed company attached to criticism.
- The Syndicate, 41:47: the recheck suggests 850–860 daily users and a monthly-user figure, but the count sequence is not reliable enough to replace the base transcript. Original wording and uncertainty retained.

MetaDAO growth multiples, Laso compliance descriptions, Paystream yield/protection assertions, and The Syndicate revenue/retention figures remain attributed speaker claims. Paystream's later refusal to give a 100% guarantee is explicitly identified alongside its earlier principal-protection assertions. Product roadmaps remain historical plans.

Primary pages checked for spelling/context: MetaDAO's team page, Laso's website, The Syndicate's website, Arcium, Raydium docs and Meteora docs (URLs in evidence.json). These establish terminology, not proof of each spoken word. Paystream's website could not be fetched in this pass; the existing RSS/audio record supplied interview context.

## Access and remaining coverage

The existing reader and plain-text/JSON transcript routes carry the corrected wording and review limits. Reading-note routes carry the guides. The 43 public recordings without reading notes remain a separate backlog; this pass does not claim that backlog was reviewed. The library still has 65 hosted transcripts and 124 recording-note records.

Validation: npm run check passed (50 tests and TypeScript); npm run build passed. All 473 local production endpoint checks passed, including publication-gate checks. The four corrected JSON payloads match source exactly; text routes include editorial checks, note routes include all 51 guide entries, and readers retain review limits. Results are recorded in local-access.json and local-payloads.json. This is a reviewable PR, not a production deployment.
