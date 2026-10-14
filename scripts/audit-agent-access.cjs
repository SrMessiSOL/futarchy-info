// Run from the repository root: node scripts/audit-agent-access.cjs [base URL] [report path]
// Checks first-party access only; does not review audio or test third-party sources.
const fs = require('fs');
const base = process.argv[2] || 'https://futarchy.info';
const output = process.argv[3] || 'work/agent-access-audit.json';
async function get(path) { const res = await fetch(base + path, { signal: AbortSignal.timeout(30000) }); const text = await res.text(); return { status: res.status, type: res.headers.get('content-type'), text }; }
(async () => {
    const scopes = {};
    for (const scope of ['all', 'historical', 'everything']) {
        const r = await get('/api/library?scope=' + scope + '&audit=20261014');
        if (r.status !== 200)
            throw Error('Index ' + scope);
        scopes[scope] = JSON.parse(r.text);
    }
    const rows = scopes.everything.resources;
    if (new Set(rows.map(r => r.id)).size !== rows.length)
        throw Error('Duplicate public IDs');
    const media = rows.filter(r => ['video', 'podcast'].includes(r.type));
    const jobs = [];
    for (const r of media) {
        if (r.readingUrl) {
            jobs.push({ id: r.id, kind: 'notes', path: r.readingUrl, expected: 200 });
            jobs.push({ id: r.id, kind: 'metadata', path: r.readingUrl + '?format=json', expected: 200 });
        }
        const t = r.mediaReview?.transcript;
        if (t?.status === 'available') {
            jobs.push({ id: r.id, kind: 'transcript-text', path: t.textUrl, expected: 200 });
            jobs.push({ id: r.id, kind: 'transcript-json', path: t.jsonUrl, expected: 200 });
            jobs.push({ id: r.id, kind: 'reader', path: '/transcripts/' + r.id, expected: 200 });
        }
    }
    const catalog = JSON.parse(fs.readFileSync('content/resources.json'));
    const publicIds = new Set(rows.map(r => r.id));
    const excludedMedia = catalog.filter(r => ['video', 'podcast'].includes(r.type) && !publicIds.has(r.id));
    for (const r of excludedMedia)
        for (const path of ['/api/library/' + r.id, '/api/library/' + r.id + '?format=json', '/api/transcripts/' + r.id, '/api/transcripts/' + r.id + '?format=json', '/transcripts/' + r.id])
            jobs.push({ id: r.id, kind: 'held', path, expected: 404 });
    const results = [];
    let cursor = 0;
    async function worker() { while (cursor < jobs.length) {
        const j = jobs[cursor++];
        try {
            const r = await get(j.path);
            const errors = [];
            if (r.status !== j.expected)
                errors.push('status ' + r.status);
            if (j.expected === 200) {
                if (j.kind === 'notes' && !r.text.includes('Editorial reading notes'))
                    errors.push('missing notes');
                if (j.kind === 'metadata' && JSON.parse(r.text).id !== j.id)
                    errors.push('wrong identity');
                if (j.kind === 'transcript-json') {
                    const t = JSON.parse(r.text);
                    if (t.resourceId !== j.id || !t.segments?.length)
                        errors.push('invalid transcript');
                }
                if (j.kind === 'transcript-text' && !/\[\d\d:\d\d:\d\d/.test(r.text))
                    errors.push('missing timed text');
            }
            results.push({ ...j, status: r.status, errors });
        }
        catch (e) {
            results.push({ ...j, errors: [String(e)] });
        }
    } }
    await Promise.all([worker(), worker(), worker()]);
    const report = { checkedAt: new Date().toISOString(), base, scopeCounts: Object.fromEntries(Object.entries(scopes).map(([k, v]) => [k, v.count])), mediaCount: media.length, withNotes: media.filter(r => r.readingUrl).length, withTranscripts: media.filter(r => r.mediaReview?.transcript.status === 'available').length, missingNotes: media.filter(r => !r.readingUrl).map(r => ({ id: r.id, title: r.title, sourceUrl: r.url, verification: r.verification })), excludedMedia: excludedMedia.map(r => r.id), requestCount: results.length, failures: results.filter(r => r.errors.length), results };
    fs.mkdirSync(require('path').dirname(output), { recursive: true });
    fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify({ ...report, results: undefined, missingNotes: report.missingNotes.length }, null, 2));
    if (report.failures.length)
        process.exitCode = 1;
})();
