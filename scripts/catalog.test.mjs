import test from 'node:test';
import assert from 'node:assert/strict';
import {validateCatalog,canonicalUrl} from './catalog.mjs';
import {mergeCandidates} from './discover.mjs';
import {extractLinks,publicAddress} from './network.mjs';
import {validateProposal} from './validate-proposal.mjs';
const entry={id:'example',title:'Example report',author:'Publisher',date:'2026-01-01',type:'article',url:'https://example.org/report',sourceUrl:'https://example.org/report',dateKind:'publication',datePrecision:'day',verification:'source-checked',addedAt:'2026-01-02',checkedAt:'2026-01-02',evidenceNote:'Title and publication date checked against the publisher page.'};
test('event reminders can be superseded by a different recording URL without weakening URL deduplication',()=>{
  const show={...entry,id:'show',type:'podcast',url:'https://example.org/show'};
  const reminder={...entry,catalogOnly:true,supersededBy:'show'};
  assert.equal(validateCatalog([reminder,show]).length,2);
  assert.throws(()=>validateCatalog([{...reminder,catalogOnly:false},show]));
  assert.throws(()=>validateCatalog([{...reminder,supersededBy:'missing'},show]));
  assert.throws(()=>validateCatalog([reminder,{...show,catalogOnly:true}]));
  assert.throws(()=>validateCatalog([{...entry,duplicateOf:'show'},show]));
});
test('verifying a legacy record preserves its unknown original addition date',()=>{
  assert.equal(validateCatalog([{...entry,addedAt:null}],['example']).length,1);
  assert.throws(()=>validateCatalog([{...entry,addedAt:null}]));
});
test('missing evidence and fabricated calendar dates are rejected',()=>{
  assert.throws(()=>validateCatalog([{...entry,evidenceNote:''}]));
  assert.throws(()=>validateCatalog([{...entry,date:'2026-02-30'}]));
  assert.throws(()=>validateCatalog([{...entry,date:'2999-01-01'}]));
});
test('unknown publication date is allowed without inventing one',()=>{
  assert.equal(validateCatalog([{...entry,date:null,datePrecision:'unknown',dateKind:'unknown'}]).length,1);
});
test('new entries cannot inherit legacy verification',()=>{
  assert.throws(()=>validateCatalog([{...entry,verification:'legacy'}]));
});
test('existing IDs cannot disappear and duplicates require explicit aliases',()=>{
  assert.throws(()=>validateCatalog([entry],['old-id']));
  assert.throws(()=>validateCatalog([entry,{...entry,id:'other'}]));
  assert.equal(validateCatalog([entry,{...entry,id:'other',duplicateOf:'example'}]).length,2);
  assert.throws(()=>validateCatalog([{...entry,duplicateOf:'example'}]));
});
test('URL deduplication preserves meaningful query parameters',()=>{
  assert.equal(canonicalUrl('https://example.org/a/?utm_source=x#read'), 'https://example.org/a');
  assert.notEqual(canonicalUrl('https://youtube.com/watch?v=one'),canonicalUrl('https://youtube.com/watch?v=two'));
});
test('discovery is idempotent and retains rejected history',()=>{
  const state={candidates:[{url:'https://example.org/rejected',status:'rejected'}]};
  const links=[{url:entry.url,title:entry.title},{url:'https://example.org/rejected',title:'Rejected'},{url:'https://example.org/new',title:'New'}];
  const known=new Set([canonicalUrl(entry.url)]);
  assert.equal(mergeCandidates(state,links,'source',known,'2026-01-01'),1);
  assert.equal(mergeCandidates(state,links,'source',known,'2026-01-02'),0);
  assert.equal(state.candidates.length,2);
});
test('source extraction rejects foreign hosts, scripts and out-of-scope links',()=>{
  const source={url:'https://example.org/research/',hosts:['example.org'],path:'/research/',exclude:'/tag/'};
  const html='<a href="/research/report/">A report</a><a href="https://evil.test/research/report">Bad link</a><a href="javascript:alert(1)">Run code</a><a href="/research/tag/test">A tag</a>';
  assert.deepEqual(extractLinks(html,source),[{url:'https://example.org/research/report/',title:'A report'}]);
});
test('private and metadata network addresses are blocked',()=>{
  for(const ip of ['127.0.0.1','10.1.1.1','169.254.169.254','172.16.1.1','192.168.1.1','100.64.1.1','::1','::ffff:127.0.0.1','fc00::1']) assert.equal(publicAddress(ip),false,ip);
  assert.equal(publicAddress('8.8.8.8'),true);
});
test('editorial gate rejects unproven additions, substituted URLs and removals',()=>{
  const proof={url:entry.url,finalUrl:entry.url,status:'fetched',truncated:false,textLength:500,sha256:'hash',fetchedAt:'2026-01-02'};
  assert.deepEqual(validateProposal([], [entry], [proof]),{changes:1,additions:1});
  assert.throws(()=>validateProposal([], [entry], []));
  assert.throws(()=>validateProposal([], [{...entry,url:'https://evil.test/'}], [proof]));
  assert.throws(()=>validateProposal([entry], [], [proof]));
  assert.throws(()=>validateProposal([], [entry], [{...proof,truncated:true}]));
});
test('no-op editorial runs leave existing unverified history alone',()=>{
  assert.deepEqual(validateProposal([entry],[entry],[]),{changes:0,additions:0});
});
test('unquoted legacy links are discovered while section roots are excluded',()=>{
  const source={url:'https://example.org/research/tag/reports/',hosts:['example.org'],path:'/research/'};
  assert.deepEqual(extractLinks('<a href=/research/report.html>A report</a><a href="/research/">Latest</a>',source),[{url:'https://example.org/research/report.html',title:'A report'}]);
});
