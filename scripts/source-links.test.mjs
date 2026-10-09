import test from 'node:test';
import assert from 'node:assert/strict';
import {sourceLinks} from './source-links.mjs';
const source={url:'https://example.com/feed',hosts:['example.com'],path:'/posts/',format:'rss'};
test('RSS discovers canonical episodes and rejects links outside the allowlist',()=>{
  const item=(url,title='Futarchy &amp; markets')=>`<item><title><![CDATA[${title}]]></title><link>${url}</link></item>`;
  const result=sourceLinks(`<rss>${item('https://example.com/posts/a')}${item('https://evil.com/posts/a')}${item('http://user:pw@example.com/posts/a')}${item('javascript:alert(1)')}${item('https://example.com/posts/a#again')}</rss>`,source);
  assert.deepEqual(result,[{url:'https://example.com/posts/a',title:'Futarchy & markets'}]);
});
test('Sitemap finds old pages without treating lastmod as a publication date',()=>{
  const result=sourceLinks('<urlset><url><loc>https://example.com/posts/old-research</loc><lastmod>2026-10-08</lastmod></url></urlset>',{...source,format:'sitemap'});
  assert.deepEqual(result,[{url:'https://example.com/posts/old-research',title:'old research'}]);
});
test('RSS relevance includes description but does not execute XML entities',()=>{
  assert.equal(sourceLinks('<rss><item><title>Project update</title><link>https://example.com/posts/update</link><description>New futarchy experiments</description></item></rss>',{...source,include:'futarchy'}).length,1);
  assert.throws(()=>sourceLinks('<!DOCTYPE rss [<!ENTITY x SYSTEM "file:///secret">]><rss/>',source),/XML/);
});
test('XML discovery is bounded and deduplicates candidates',()=>{
  const body=Array.from({length:250},(_,i)=>`<url><loc>https://example.com/posts/article-${i}</loc></url>`).join('');
  assert.equal(sourceLinks(body,{...source,format:'sitemap'}).length,200);
});
