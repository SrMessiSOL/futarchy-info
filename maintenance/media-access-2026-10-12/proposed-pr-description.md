The library displayed Radio reminders beside recordings and gave agents no readable version of reviewed audio. This update hides all 32 Radio announcements while preserving their IDs, links 26 to their recordings, and exposes the 32 existing OwnershipFM transcripts with explicit team permission.

Plain-text and timed JSON transcripts include source links, audio/transcript hashes, model information, machine-output warnings and review limits. Cards link to transcripts and original reading notes; 83 reviewed media records have agent-readable notes. `/llms.txt`, scoped `/api/library` and individual reading/transcript endpoints use the same publication filters as the website. Other publishers retain notes only; OwnershipFM permission does not cover their transcripts.

Roadshows #1–#5 now use direct publisher replay links. Add two Blockworks articles, its dated MetaDAO disclosure report, Jito JIP-10 and a Zcash forum critique; recheck The Block’s Umbra report. Roadshow content is metadata-reviewed only and remains a full-transcript research gap. Existing report, forum and funded-company media coverage is retained. No existing ID or approved restoration is removed.

Validation: 31 tests, TypeScript and production build passed. Production preview shows transcript links and confirms working JSON, plain-text and Markdown endpoints, with hidden announcement requests returning 404. Current public counts: 547 main and 182 historical records. One machine timestamp beyond audio duration is clipped with its original value retained.

Adds `.vercelignore` to exclude temporary research files from deployment uploads. No deployment or merge is performed by this PR.
