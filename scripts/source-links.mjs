import {decode, textOnly, extractLinks} from './network.mjs';

// Bounded discovery only: XML entities/DTDs are never evaluated, dates remain hints.
export function sourceLinks(body, source) {
  if (!source.format || source.format === 'html') return extractLinks(body, source);
  if (!['rss', 'sitemap'].includes(source.format)) throw new Error('Unsupported source format');
  if (/<!DOCTYPE|<!ENTITY/i.test(body)) throw new Error('XML declarations are not supported');
  const field = (xml, tag) => {
    const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'));
    return match ? decode(match[1].replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, '').trim()) : '';
  };
  const items = source.format === 'rss' ? body.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi) : body.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/gi);
  const found = new Map();
  for (const item of items) {
    try {
      const raw = field(item[1], source.format === 'rss' ? 'link' : 'loc');
      if (!raw) continue;
      const url = new URL(raw, source.url); url.hash = '';
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.search || !source.hosts.includes(url.hostname) || !url.pathname.startsWith(source.path)) continue;
      const title = source.format === 'rss' ? textOnly(field(item[1], 'title')) : decodeURIComponent(url.pathname.split('/').filter(Boolean).at(-1) || '').replace(/-/g, ' ');
      const context = url.pathname + ' ' + title + ' ' + textOnly(field(item[1], 'description'));
      if (source.exclude && new RegExp(source.exclude, 'i').test(url.pathname)) continue;
      if (source.include && !new RegExp(source.include, 'i').test(context)) continue;
      if (title.length < 4 || url.href.replace(/\/$/, '') === source.url.replace(/\/$/, '')) continue;
      found.set(url.href, {url: url.href, title: title.slice(0, 250)});
      if (found.size >= 200) break;
    } catch { /* Invalid entries cannot escape the source allowlist. */ }
  }
  return [...found.values()];
}
