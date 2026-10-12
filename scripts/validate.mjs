import { readFile } from 'node:fs/promises';
import { validateCatalog } from './catalog.mjs';
import { publicationBlockReason } from '../lib/publication-policy.ts';
const read = async p => JSON.parse(await readFile(p, 'utf8'));
const rows = validateCatalog(await read('content/resources.json'), await read('maintenance/legacy-ids.json'));
const lifecycle = await read('content/project-lifecycle.json');
const exceptions = await read('content/publication-exceptions.json');
const visible = rows.filter(r => !r.catalogOnly && !r.duplicateOf && !publicationBlockReason(r, lifecycle, exceptions.resourceIds));
console.log(`Valid: ${rows.length} records; ${visible.length} publication-eligible; ${rows.filter(r => !r.duplicateOf && publicationBlockReason(r, lifecycle, exceptions.resourceIds)).length} held by lifecycle policy; ${rows.filter(r => r.verification === 'source-checked').length} source-checked.`);
