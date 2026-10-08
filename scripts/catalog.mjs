import { z } from 'zod';
export const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(s => {
  const date = new Date(`${s}T00:00:00Z`);
  return Number.isFinite(+date) && date.toISOString().slice(0, 10) === s;
}, 'Invalid calendar date');
const url = z.string().url().refine(s => {
  const u = new URL(s);
  return ['http:', 'https:'].includes(u.protocol) && !u.username && !u.password;
});
export const resourceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/), title: z.string().min(3).max(250),
  author: z.string().min(1), date: day.nullable(),
  type: z.enum(['paper', 'article', 'podcast', 'video', 'news']), url,
  description: z.string().max(1200).optional(), tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(), duplicateOf: z.string().optional(),
  dateKind: z.enum(['publication', 'event', 'unknown']),
  datePrecision: z.enum(['day', 'unverified', 'unknown']),
  verification: z.enum(['legacy', 'source-checked']), sourceUrl: url,
  addedAt: day.nullable(), checkedAt: day.nullable(), evidenceNote: z.string().optional(),
}).strict();
export function canonicalUrl(value) {
  const u = new URL(value);
  u.hash = '';
  for (const key of [...u.searchParams.keys()]) if (/^utm_|^(fbclid|gclid)$/i.test(key)) u.searchParams.delete(key);
  u.searchParams.sort();
  return u.href.replace(/\/$/, '');
}
export function validateCatalog(input, legacyIds = [], today = new Date().toISOString().slice(0, 10)) {
  const rows = z.array(resourceSchema).parse(input);
  const ids = new Set(); const urls = new Map(); const errors = [];
  const legacy = new Set(legacyIds);
  for (const r of rows) {
    if (ids.has(r.id)) errors.push(`Duplicate ID: ${r.id}`);
    ids.add(r.id);
    if (!legacy.has(r.id) && r.verification !== 'source-checked') errors.push(`${r.id}: new entries must be source-checked`);
    if (r.datePrecision === 'day' && !r.date) errors.push(`${r.id}: exact date missing`);
    if (!r.date && r.datePrecision !== 'unknown') errors.push(`${r.id}: null date must have unknown precision`);
    if (r.verification === 'source-checked' && (!r.checkedAt || !r.addedAt || !r.evidenceNote || r.evidenceNote.length < 25 || (r.date && r.dateKind === 'unknown'))) errors.push(`${r.id}: missing verification evidence or date kind`);
    for (const key of ['date', 'addedAt', 'checkedAt']) if (r[key] && r[key] > today) errors.push(`${r.id}: future ${key}`);
    if (r.duplicateOf) {
      const target = rows.find(x => x.id === r.duplicateOf);
      if (!target || target.duplicateOf || target.id === r.id) errors.push(`${r.id}: invalid duplicate target`);
      if (target && canonicalUrl(target.url) !== canonicalUrl(r.url)) errors.push(`${r.id}: duplicate URL differs`);
    } else {
      const key = canonicalUrl(r.url); const previous = urls.get(key);
      // Three historical episodes share a show landing page; retain until episode URLs are recovered.
      const sharedShow = ['res-250', 'res-258', 'res-260'];
      if (previous && !(sharedShow.includes(previous) && sharedShow.includes(r.id))) errors.push(`${r.id}: URL duplicates ${previous}`);
      urls.set(key, r.id);
    }
  }
  for (const id of legacy) if (!ids.has(id)) errors.push(`Legacy ID removed: ${id}`);
  if (errors.length) throw new Error(errors.join('\n'));
  return rows;
}
