import fs from 'node:fs'
import { publicationBlockReason } from '../lib/publication-policy.ts'
import { isHistoricalAttempt } from '../lib/library-scope.ts'
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'))
const resources = read('content/resources.json')
const projects = read('content/projects.json')
const lifecycle = read('content/project-lifecycle.json')
const exceptions = read('content/publication-exceptions.json')
function row(resource) {
  const hiddenReason = resource.catalogOnly ? 'Internal reminder' : resource.duplicateOf ? `Duplicate of ${resource.duplicateOf}` : publicationBlockReason(resource, lifecycle, exceptions.resourceIds)
  return { ...resource,
    scope: hiddenReason ? 'Internal' : isHistoricalAttempt(resource, projects) ? 'Historical archive' : 'Main library',
    hiddenReason: hiddenReason || null,
    dateIssue: !resource.date ? 'No publication date established' : resource.datePrecision !== 'day' ? 'Stored legacy date has not been verified against publication evidence' : 'Archive date retained; publication/event meaning not verified',
    projectNames: (resource.tags ?? []).filter(tag => tag.startsWith('project:')).map(tag => projects.find(p => p.id === tag.slice(8))?.name ?? tag.slice(8)),
  }
}
const uncertain = resources.filter(r => !r.date || r.datePrecision !== 'day').map(row)
const archiveDates = resources.filter(r => r.date && r.datePrecision === 'day' && r.dateKind === 'unknown').map(row)
const summary = { catalogUncertain: uncertain.length, publicUncertain: uncertain.filter(r=>!r.hiddenReason).length, mainUncertain: uncertain.filter(r=>r.scope==='Main library').length, historicalUncertain: uncertain.filter(r=>r.scope==='Historical archive').length, missing: uncertain.filter(r=>!r.date).length, legacyUnverified: uncertain.filter(r=>r.date).length, archiveDateMeaningUnverified: archiveDates.length }
const directory = 'maintenance/date-audit-2026-10-12'
fs.mkdirSync(directory, { recursive: true })
fs.writeFileSync(`${directory}/sources.json`, JSON.stringify({ asOf: '2026-10-12', basis: 'Current catalog after merged PR #11; dates are reported, not newly verified by this audit.', summary, uncertain, archiveDates }, null, 2)+'\n')
const cell = text => String(text ?? '').replace(/\|/g,'\\|').replace(/\n/g,' ')
const table = rows => ['| ID | Source | Publisher | Stored date | Scope | Date issue | Review evidence |','| --- | --- | --- | --- | --- | --- | --- |',...rows.map(r=>`| ${r.id} | [${cell(r.title)}](${r.url}) | ${cell(r.author)} | ${r.date ?? 'Unknown'} | ${r.scope} | ${r.dateIssue} | ${cell(r.evidenceNote ?? 'Legacy record: publication-date evidence not recorded.')} |`)].join('\n')
fs.writeFileSync(`${directory}/sources.md`, [
  '# Sources with uncertain dates — October 12, 2026', '',
  'Based on the current catalog after merged PR #11. This audit lists uncertainty; it does not verify new dates. Stored legacy dates are not confirmed publication dates. Added and checked dates are editorial timestamps, not publication dates.', '',
  `${summary.catalogUncertain} catalog records have unknown/unverified dates: ${summary.missing} unknown, ${summary.legacyUnverified} stored but unverified. ${summary.publicUncertain} are public-eligible (${summary.mainUncertain} main, ${summary.historicalUncertain} historical).`, '',
  '## Unknown publication dates', '', table(uncertain.filter(r=>!r.date)), '',
  '## Stored dates that remain unverified', '', table(uncertain.filter(r=>r.date)), '',
  `## Additional archive-date review backlog (${archiveDates.length})`, '',
  'These are a separate category: day values are stored, but the catalog does not establish whether they represent publication or an event. The website labels them Archive date. They are not included in the unknown/unverified date count above.', '', table(archiveDates), '',
].join('\n'))
const escape = text => String(text ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const cards = (rows,group) => rows.map(r=>`<article data-group="${group}" data-scope="${escape(r.scope)}"><h3><a target="_blank" rel="noopener noreferrer" href="${escape(r.url)}">${escape(r.title)}</a></h3><p><strong>${escape(r.id)}</strong> · ${escape(r.author)} · ${escape(r.type)} · ${escape(r.scope)}</p><p>Stored date: <strong>${escape(r.date ?? 'Unknown')}</strong> · ${escape(r.dateIssue)}</p><p>Projects: ${escape(r.projectNames.join(', ') || 'General MetaDAO / research')}</p><p>Checked: ${escape(r.checkedAt ?? 'Not recorded')} · Added: ${escape(r.addedAt ?? 'Not recorded')}. These are editorial dates.</p><details><summary>Review evidence and source URL</summary><p>${escape(r.evidenceNote ?? 'Legacy record: publication-date evidence not recorded.')}</p><a href="${escape(r.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escape(r.sourceUrl)}</a>${r.hiddenReason ? `<p>Visibility: ${escape(r.hiddenReason)}</p>` : ''}</details></article>`).join('\n')
fs.writeFileSync(`${directory}/sources.html`, `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Uncertain source dates</title><style>body{font:16px/1.6 system-ui;margin:40px auto;max-width:1050px;padding:0 24px;color:#182333;background:#f7f9fc}h1{line-height:1.2}article{background:white;border:1px solid #dce3ed;border-radius:12px;padding:20px;margin:16px 0}h3{margin:0}a{color:#1756a9}input,select{padding:12px;margin:6px;border:1px solid #aab6c7;border-radius:6px}input{min-width:280px}details p{white-space:pre-wrap}[hidden]{display:none}</style><h1>Sources with uncertain dates</h1><p>October 12, 2026 · Catalog audit after merged PR #11</p><p><strong>${summary.catalogUncertain} uncertain dates</strong>: ${summary.missing} unknown and ${summary.legacyUnverified} stored but unverified. ${summary.publicUncertain} public-eligible: ${summary.mainUncertain} main library and ${summary.historicalUncertain} historical archive.</p><p>A separate ${archiveDates.length}-record archive-date backlog has day values whose publication/event meaning remains unverified. This audit reports existing metadata; it does not verify new dates.</p><input id="search" placeholder="Search title, publisher, project or ID" aria-label="Search sources"><select id="group" aria-label="Date category"><option value="all">All date-review records (${uncertain.length+archiveDates.length})</option><option value="missing">Unknown date (${summary.missing})</option><option value="legacy">Stored date unverified (${summary.legacyUnverified})</option><option value="archive">Archive-date meaning (${archiveDates.length})</option></select><select id="scope" aria-label="Browsing scope"><option value="all">All scopes</option><option>Main library</option><option>Historical archive</option><option>Internal</option></select><p id="count"></p>${cards(uncertain.filter(r=>!r.date),'missing')}${cards(uncertain.filter(r=>r.date),'legacy')}${cards(archiveDates,'archive')}<script>const cards=[...document.querySelectorAll('article')];function filter(){const q=document.querySelector('#search').value.toLowerCase(),g=document.querySelector('#group').value,s=document.querySelector('#scope').value;let n=0;for(const card of cards){card.hidden=!(card.textContent.toLowerCase().includes(q)&&(g==='all'||card.dataset.group===g)&&(s==='all'||card.dataset.scope===s));if(!card.hidden)n++}document.querySelector('#count').textContent=n+' sources shown'}document.querySelectorAll('input,select').forEach(e=>e.addEventListener('input',filter));filter()</script></html>`)
console.log(JSON.stringify(summary))
