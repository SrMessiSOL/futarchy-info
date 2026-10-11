import test from 'node:test';
import assert from 'node:assert/strict';
import {selectCandidates} from './select-candidates.mjs';
const item=(sourceId,i)=>({sourceId,url:`https://example.com/${sourceId}/${i}`,discoveredAt:'2026-10-08'});
test('large archives cannot crowd a small publisher out of the weekly batch',()=>{
  const candidates=[...Array.from({length:100},(_,i)=>item('large',i)),item('small',0)];
  const chosen=selectCandidates(candidates,100,15);
  assert.equal(chosen.length,15);
  assert.ok(chosen.some(c=>c.sourceId==='small'));
  assert.equal(new Set(chosen.map(c=>c.url)).size,15);
  assert.notDeepEqual(chosen,selectCandidates(candidates,101,15));
});
test('empty or short discovery backlogs remain bounded',()=>{
  assert.deepEqual(selectCandidates([],1),[]);
  assert.equal(selectCandidates([item('one',0)],1).length,1);
});
