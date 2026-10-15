# Recording review, sixth batch

Two MetaDAO founder guides add 37 topic markers. The public no-notes queue falls from 17 to 14: one existing recording receives notes, two promotional references are consolidated, and one recovered episode is added with notes already attached. This is not a claim that all recordings have been listened to.

## Reviewed material

- **res-44:** read the entire available automatic-caption export, ending at 01:03:48, and the expanded Jito description with all 22 chapter entries. The player displays 01:05:30. Export timestamps differ from publisher chapters; the public guide uses publisher timestamps, including the publisher's closing marker beyond the caption export. Do not infer missing speech or claim synchronized audio verification. Grant payments, targets, token economics and performance remain speaker accounts. Switchboard is relevant through its joint interview with MetaDAO and the Jito grant experiment, not an asserted MetaDAO raise.
- **alpha-liquid-proph3t-2025-04-15:** read the original Spotify description and all 15 chapter entries for the 48:38 interview. This is a chapter-based guide without transcript or audio review. The April 15 episode publication date is separate from the April 23 announcement. The publisher's broken line between 17:10 and 21:24 is normalized without changing its timestamps.

No third-party transcript text is published. The internal evidence records the Midcurve export hash; recording availability, caption reading and manual listening are different boundaries.

## Consolidations and correction

- **res-43:** original Jito post shows a 50-second promotional clip. Its publisher reply identifies episode 41 and the same guests as res-44. Keep the original ID and URL internally using catalogOnly and supersededBy; preserve the clip link in the public episode note.
- **res-47:** the original Blockchain Wire page displays Article Not Found. Preserve its legacy verification, original April 23 date and URL internally. Alpha Liquid's same-title release on GlobeNewswire identifies the episode and guests; Spotify independently establishes the playable episode, its date and chapters. Add a new ID for the actual episode rather than assigning the announcement's ID or date to different source material. The announcement is not retained as a second public podcast.
- **res-53:** original 0xResearch post is titled Plasma, Prediction Markets, BNB, and More, with a 1:00:51 replay. Its visible text does not substantiate the old dedicated-MetaDAO title. Correct that overstatement but leave content review pending and retain the legacy verification state. Absence from the post does not prove MetaDAO is absent from the recording.

## Remaining gaps

Loyal's res-102 video is still private on browser recheck. The original 11AM res-158 post confirms a December 11, 2025 Proph3t interview at Breakpoint, with a 32:54 replay, but supplies no chapter guide. Neither receives invented reading notes. The remaining 14 are enumerated in queue.json; previously completed entries remain for audit.

## Validation

Run npm run check and npm run build. local-access.json records the full public note/transcript and publication-gate audit. local-note-payloads.json compares both new notes against Markdown and JSON endpoints. local-consolidations.json checks the two hidden references, canonical episode visibility, original-ID preservation and remaining queue count. This PR does not merge or deploy itself.
