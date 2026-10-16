import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {publicationBlockReason} from '../lib/publication-policy.ts';
const rules=JSON.parse(fs.readFileSync('content/project-lifecycle.json'));
const row={title:'Ranger update',date:'2026-02-02',dateKind:'publication',datePrecision:'day',tags:['project:ranger']};
test('closed-project cutoff rejects later sources and uncertain dates, including mixed reports',()=>{
  assert.equal(publicationBlockReason(row,rules),null);
  for(const r of [{...row,date:'2026-03-02'},{...row,date:'2026-05-01'},{...row,date:null},{...row,dateKind:'unknown'},{...row,datePrecision:'unverified'},{...row,title:'Ecosystem recap',tags:['project:credible'],description:'Ranger update',date:'2026-09-01'}]) assert.ok(publicationBlockReason(r,rules));
  assert.ok(publicationBlockReason({...row,title:'mtnCapital interview',tags:[]},rules));
  assert.equal(publicationBlockReason({...row,title:'Omnipair liquidity pool liquidation mechanics',tags:['project:omnipair']},rules),null);
});
test('actual late and undated closed-project sources are held, while newly dated historical evidence remains eligible',()=>{
  const catalog=JSON.parse(fs.readFileSync('content/resources.json'));
  for(const id of ['res-260','res-261','resolved-backfill-21'])assert.ok(publicationBlockReason(catalog.find(r=>r.id===id),rules),id);
  const paystream=catalog.find(r=>r.id==='paystream-founder-static-analysis');
  assert.equal(paystream.date,'2026-02-21');
  assert.equal(paystream.dateBasis,'source-update');
  assert.equal(publicationBlockReason(paystream,rules),null);
  const interview=catalog.find(r=>r.id==='founder-ranger-rockaway');
  assert.equal(interview.date,'2025-02-19');
  assert.equal(publicationBlockReason(interview,rules),null);
  assert.equal(publicationBlockReason(catalog.find(r=>r.id==='x-article-2018370848881799531'),rules),null);
});

test('37 cutoff exceptions remain independent of later browsing-scope restrictions',()=>{
  const catalog=JSON.parse(fs.readFileSync('content/resources.json'));
  const approved=JSON.parse(fs.readFileSync('content/publication-exceptions.json')).resourceIds;
  assert.equal(new Set(approved).size,37);
  for(const id of approved){const record=catalog.find(r=>r.id===id);assert.ok(record&&!record.duplicateOf,id);assert.equal(publicationBlockReason(record,rules,approved),null,id);}
  assert.ok(publicationBlockReason({...row,id:'future-ranger-promotion',date:'2026-10-12'},rules,approved));
});

test('reviewed historical analysis is visible after cutoff while later promotions remain held',()=>{
  const catalog=JSON.parse(fs.readFileSync('content/resources.json'));
  const exceptions=JSON.parse(fs.readFileSync('content/publication-exceptions.json'));
  assert.deepEqual(exceptions.historicalReporting.resourceIds.slice().sort(),['resolved-audit-9d14ae89f58f','resolved-audit-7db80197fbcc'].sort());
  const approved=[...exceptions.resourceIds,...exceptions.recoveredRadio.resourceIds,...exceptions.historicalReporting.resourceIds];
  for(const id of exceptions.historicalReporting.resourceIds){
    const record=catalog.find(r=>r.id===id);
    assert.equal(record.verification,'source-checked');
    assert.ok(record.tags.includes('project:ranger'));
    assert.ok(publicationBlockReason(record,rules));
    assert.equal(publicationBlockReason(record,rules,approved),null);
  }
  assert.ok(publicationBlockReason({...row,id:'future-ranger-promotion',title:'Invest in Ranger today',date:'2026-10-16'},rules,approved));
  assert.ok(publicationBlockReason({...row,id:'unreviewed-history',title:'Ranger retrospective',date:'2026-10-16'},rules,approved));
});
