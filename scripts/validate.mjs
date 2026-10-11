import { readFile } from 'node:fs/promises';
import { validateCatalog } from './catalog.mjs';
const read = async p => JSON.parse(await readFile(p, 'utf8'));
const rows = validateCatalog(await read('content/resources.json'), await read('maintenance/legacy-ids.json'));
console.log(`Valid: ${rows.length} records; ${rows.filter(r => !r.duplicateOf).length} visible; ${rows.filter(r => r.verification === 'source-checked').length} source-checked.`);
