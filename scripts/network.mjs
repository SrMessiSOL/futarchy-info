import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import http from 'node:http';
import https from 'node:https';
export function publicAddress(ip) {
  if (isIP(ip) === 4) {
    const [a,b] = ip.split('.').map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || (a === 198 && (b === 18 || b === 19)));
  }
  // Only global-unicast IPv6; disallow mapped IPv4, local, multicast and documentation ranges.
  return isIP(ip) === 6 && /^[23]/i.test(ip) && !/^2001:db8:/i.test(ip);
}
export async function safeFetch(input, {hosts, maxBytes = 2_000_000, method = 'GET'} = {}) {
  let current = new URL(input);
  const signal = AbortSignal.timeout(15000);
  for (let hop=0; hop<5; hop++) {
    if (!['https:', 'http:'].includes(current.protocol) || current.username || current.password || (current.port && !['80','443'].includes(current.port))) throw new Error('Unsafe URL');
    if (hosts && !hosts.includes(current.hostname)) throw new Error('Redirect outside approved hosts');
    const addresses = await lookup(current.hostname, {all:true});
    if (!addresses.length || addresses.some(a => !publicAddress(a.address))) throw new Error('Non-public address blocked');
    // Pin the validated address for this connection to prevent DNS rebinding.
    const chosen=addresses.find(a=>a.family===4) ?? addresses[0];
    const response = await new Promise((resolve,reject)=>{
      const request=(current.protocol==='https:'?https:http).request(current,{
        method,signal,agent:false,
        lookup:(_host,options,callback)=> options.all ? callback(null,[chosen]) : callback(null,chosen.address,chosen.family),
        headers:{'User-Agent':'FutarchyInfoLibrary/1.0 (+https://github.com/SrMessiSOL/futarchy-info)'},
      },resolve);
      request.on('error',reject);request.end();
    });
    const status=response.statusCode;
    const headers=response.headers;
    if ([301,302,303,307,308].includes(status)) {
      response.destroy();
      if (!headers.location) throw new Error('Redirect missing location');
      current = new URL(headers.location, current); continue;
    }
    if (method === 'HEAD') { response.destroy(); return {status, url:current.href, text:'', contentType:headers['content-type'] || ''}; }
    const contentType = headers['content-type'] || '';
    if (!/text\/|xml|json/i.test(contentType)) {response.destroy(); throw new Error(`Unsupported content type: ${contentType}`);}
    const chunks=[]; let size=0;
    for await (const chunk of response) {
      size += chunk.length;
      if(size>maxBytes) {throw new Error('Response exceeds size limit');}
      chunks.push(chunk);
    }
    return {status,url:current.href,text:Buffer.concat(chunks).toString('utf8'),contentType};
  }
  throw new Error('Too many redirects');
}
export const decode = s => s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g, (_,n) => Number(n)<=0x10ffff ? String.fromCodePoint(Number(n)) : '');
export function textOnly(html) {
  return decode(html.replace(/<(script|style|nav|footer)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
}
export function extractLinks(html, source) {
  const links = new Map();
  for(const m of html.matchAll(/<a\b[^>]*\bhref\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+))[^>]*>([\s\S]*?)<\/a>/gi)) {
    try {
      const u = new URL(decode(m[1] ?? m[2] ?? m[3]),source.url); u.hash='';
      if (!['http:','https:'].includes(u.protocol) || !source.hosts.includes(u.hostname) || !u.pathname.startsWith(source.path) || u.search || u.username || u.password) continue;
      if (source.exclude && new RegExp(source.exclude,'i').test(u.pathname)) continue;
      if (source.include && !new RegExp(source.include,'i').test(u.pathname+' '+textOnly(m[4]))) continue;
      if (u.pathname.replace(/\/$/,'') === source.path.replace(/\/$/,'')) continue;
      if (u.href.replace(/\/$/,'') === source.url.replace(/\/$/,'')) continue;
      const title=textOnly(m[4]).slice(0,250);
      if (title.length>=4) links.set(u.href,{url:u.href,title});
    } catch { /* malformed links are not candidates */ }
  }
  return [...links.values()].slice(0,60);
}
