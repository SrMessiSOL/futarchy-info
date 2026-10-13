# Founder uncertainty follow-up — October 13, 2026

This follows merged PR #21 at `9f828adaeac0654e5ea60c6e753c7bfe0098d6c7`. Thirteen segments in four existing funded-project interviews are corrected or explicitly marked unclear. No catalog entries, dates, permissions, project status, timestamps or original research hashes change.

Seven disputed audio windows were reprocessed locally with Whisper medium.en (CPU int8, beam 5, no prompt or previous-text conditioning), then compared with earlier base.en/small.en outputs and primary references. This is targeted audio recognition and editorial source review, **not manual listening**, independent model consensus, or a complete interview fact-check. Raw model output is evidence, not a verified quotation. Recognition confidence is not factual confidence.

## Decisions

| Interview / interval | Result |
| --- | --- |
| P2P 08:08–08:24 | Still unresolved: medium.en returns 68 million, small.en six to eight million. Keep the unclear amount marker. Hypothetical funding, not a completed raise. |
| P2P 17:06–17:54 | Correct garbled VC-capital and 110–120k monthly-burn wording. Normalize allowance, consistent with the primary $175,000 monthly budget. Burn remains founder-reported. Ranger's comparison conflicts between recognizers; replace the unreliable number with an explicit unclear marker. |
| Omnipair 64:30–65:05 | Final balance still unresolved (base 1k,100; medium 9k,100). Replace nonsensical text with an unclear balance marker. Keep the mathematical $9,990 result solely in the explanatory note. Preserve the earlier spoken self-correction rather than removing it. |
| Loyal 30:45–31:15 | Historical 500k proposal threshold corroborated by the proposal describing a change from 500,000 to 1,000,000 LOYAL. Do not imply execution of the increase. Correct free circulation and proposal wording; mark the circulation count unclear instead of inferring thousands. |
| Umbra 19:50–20:25 | Correct could have taken, avoiding the previous false implication that all commitments were accepted. Kru's separate Index interview at 09:53 explicitly distinguishes $155m commitments from $3m accepted. Clarify this in the source note; do not insert the unspoken unit into the abbreviated 155. No independent deposit/refund reconciliation. |
| Umbra 27:35–28:15 | Resolve Milian, Arihant and Arcium using phonetic audio readings plus the primary Colosseum identities. Correct privacy pilled. Do not add unspoken surnames. |
| Umbra 30:10–30:35 | Resolve Arcium and Milian; medium.en detects another name-like phrase missing from earlier ASR. Mark it unclear rather than assume it is Arihant. |

## Primary references

- [Colosseum's Frontier participants](https://colosseum.com/frontier): Milian and Arihant Bansal, both associated with Arcium.
- [Arcium](https://www.arcium.com/): official company spelling and Umbra ecosystem context.
- [Loyal proposal](https://vercel.metadao.fi/projects/loyal/proposal/98zXsz1RtvYw4zHrxaZDdGBU3BgqfsX9XJbXBLSJUBST): proposed threshold change, not proof of execution.
- [Kru's Index interview](https://www.buzzsprout.com/2092514/episodes/19028963-privacy-is-the-future-of-solana-kru-shah-of-umbra-explains-why): publisher transcript at 09:53 and show notes agree on commitments versus accepted funds. Used as a reference only; no third-party transcript is republished.
- [P2P company reference](https://metadao.fi/companies/p2p-protocol): monthly allowance, not historical expenditure.

## Remaining queue

Five passages still need direct listening or speaker clarification: P2P's hypothetical amount at 08:13; Ranger comparison at 17:07; Omnipair balance at 64:48; Loyal circulation count/units at 30:59; Umbra's additional name at 30:21. Other unselected names, metrics and business claims remain machine-transcribed and unverified. This pass does not claim exhaustive accuracy.

`evidence.json` preserves all exact before/after changes, pre/post segment hashes, original audio hashes, seven ASR windows and the raw-output hash. `recheck-audio.py` reproduces this targeted pass when the authorized recordings and free model are available locally. Prior PR evidence is immutable; the regression test reverses this pass first and then PR #21 to reconstruct the older originals. Public text, JSON and reading notes carry the same uncertainty notes.

Validation: all 41 tests, content validation and TypeScript checks passed; production build passed. All 57 local production transcript JSON/text endpoints matched the stored segments and audit metadata, and editorial checks appeared in the affected reading notes. No merge or deployment performed.
