# Funded-project founder transcript corrections

Targeted review of six existing Ownership interviews: Sheldon/P2P, rakka/Omnipair, Chris/Loyal, Shrii/Credible, Kru/Umbra and Ranga/Solomon. All six projects are recorded as raised in the registry and have a raised amount on their MetaDAO company page. No unsuccessful-raise sources were added or promoted.

## Changes

- 64 individual edits across 61 segments: publisher-confirmed host/guest/project spellings, Solomon product tickers and YaaS, Gemalto and Colosseum, Loyal's “in total,” and one disputed amount marked unclear.
- 18 timestamped editorial checks appear in transcript text/JSON and reading notes. They separate source facts, arithmetic, spoken claims, hypothetical examples and unresolved recognition.
- Original audio hashes, research hashes, timestamps and previous correction evidence remain intact. New segment hashes bind the edited repository data.

The publisher's current RSS feed identifies the host as 8bitpenis and the guests as Sheldon, rakka, Chris, Shrii, Kru and Ranga. Feed descriptions can themselves contain errors; they were used for explicit identity and episode labels, not blanket verification of all claims. In particular, the feed's shorthand “100M raise” for Solomon must not override the distinction between commitments and accepted funds.

## Number decisions

| Interview / time | Decision |
| --- | --- |
| P2P 08:13 | Original/base.en say $68 million; small.en says six to eight million. Replace the unreliable amount with `[unclear amount]`; retain both readings in the note and evidence. Hypothetical VC comparison, not a completed raise. |
| P2P 40:00 | Preserve the guest's rounded budget. $175,000 × 18 = $3.15 million, so $3 million is approximate. Company page corroborates the monthly allowance; plans are not expenditure proof. |
| Omnipair 15:45 | Preserve around one million as spoken; the current directory displays $1.1 million. |
| Omnipair 33:57 | 500k audit spend is part of a hypothetical example, not a verified transaction. |
| Omnipair 62:52–64:52 | 10% of $100 is $10; $10,000 minus $10 is $9,990. Final ASR balance remains unresolved; do not substitute arithmetic for spoken words. |
| Loyal 00:18 | Publisher says S1 E4, audio says episode five. Keep the spoken wording and explain the catalog label. |
| Loyal 29:42 | $1.5m / $2.5m = 60%. Separate that ratio from the guest's unverified 70–75% token-holding claim. No execution or balance reconciliation performed. |
| Loyal 30:59 | Circulating-token count and units remain unresolved; do not add thousands just because a later threshold is 500k. |
| Credible 08:30 | Audio agrees on $300k grants + $900k investment = $1.2m of earlier funding. Keep separate from MetaDAO's later $4m listing. Earlier split is founder-reported. |
| Umbra 20:00 | $3m agrees with the directory. Later 155 figure retains unresolved units; not the accepted raise. |
| Solomon 13:53 | Distinguish $2m minimum, roughly $100m commitments recalled by guest, and $8m displayed raised. No deposit reconciliation performed. |
| Solomon 22:39 | Preserve spoken over $2.7m; SOLO-003 displays $2,678,067 trading volume. Explain the difference; it is not a transfer amount. |

## Follow-up listening queue

Use the linked recording and seek to the indicated time. These remain pending; automated recognition is not manual listening.

- [P2P interview](https://solana.com/fi/podcasts/ownership/episodes/ownership-podcast-s1-e5-sheldon-p2p-me-e3gs8a3), 08:08–08:25: six to eight versus sixty-eight million.
- [Omnipair interview](https://solana.com/ko/podcasts/ownership/episodes/ownership-s1e2-rakka-omnipair-e3fmoq2), 64:30–65:00: final balance in the bad-debt example.
- [Loyal interview](https://podcasters.spotify.com/pod/show/ownership9/episodes/Ownership-S1-E4-Chris-Loyal-e3ghnna), 30:45–31:15: circulating count and units. Historical threshold needs separate governance evidence.
- [Umbra interview](https://podcasts.apple.com/bm/podcast/ownership-s1e3-kru-umbra/id1888100311?i=1000757454033), 20:00–20:25: the unit and meaning of 155; 27:40–28:15: names currently rendered “a million” and “Akhim.” No identities guessed.
- [P2P interview](https://solana.com/fi/podcasts/ownership/episodes/ownership-podcast-s1-e5-sheldon-p2p-me-e3gs8a3), 17:00–17:35: comparison with Ranger's monthly spending and P2P's prior burn, still unverified.

## Evidence and limits

`evidence.json` includes every exact before/after edit, sources, six audio hashes, source-feed hash, 17 context ASR windows and their raw-output hashes. The original raw candidate outputs remain in ignored `work/founder-reference-*.json`. Edits to the same segment form an ordered chain; only the last state is published. Model output in this research evidence is not a verified quote.

Across these interviews, 270 numeric-candidate segments were triaged by a broad digit/number-word filter; this includes P2P, Web3, dates, examples and incidental numbers, not 270 financial claims. This pass is targeted correction, not a full factual audit of six interviews or a full audio listen. Business metrics, fee schedules, legal assertions, launch dates, yield claims and other unselected figures remain attributed and unverified. No present-day company page was used to silently rewrite historical speech.

Primary references read during this review: [publisher RSS](https://anchor.fm/s/10e854134/podcast/rss), [publisher Omnipair episode](https://solana.com/ko/podcasts/ownership/episodes/ownership-s1e2-rakka-omnipair-e3fmoq2), [publisher P2P episode](https://solana.com/fi/podcasts/ownership/episodes/ownership-podcast-s1-e5-sheldon-p2p-me-e3gs8a3), [P2P](https://metadao.fi/companies/p2p-protocol), [Omnipair](https://metadao.fi/companies/omnipair), [Loyal](https://metadao.fi/companies/loyal), [Credible](https://metadao.fi/companies/credible), [Umbra](https://metadao.fi/companies/umbra), [Solomon](https://metadao.fi/companies/solomon), [SOLO-003](https://metadao.fi/decisions/solo-003). Some direct episode pages and Loyal's buyback page were unavailable through the web reader; no verification was inferred from those failures.

Validation: `npm run check` passed all 41 tests, content validation and TypeScript checks. `npm run build` passed. All 57 local production transcript text/JSON endpoints matched segment text and metadata, with numeric tolerance for the bundler's floating-point rounding. The affected reading-note endpoints expose the same editorial checks. No merge or deployment performed.
