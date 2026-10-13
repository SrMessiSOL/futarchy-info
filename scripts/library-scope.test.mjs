import test from 'node:test';
import assert from 'node:assert/strict';
import { isHistoricalAttempt, selectProjectResources } from '../lib/library-scope.ts';
const projects = [{id:'funded',coverage:'raise'},{id:'old',coverage:'historical-raise'},{id:'attempt',coverage:'failed-raise'}];
const records = [{id:'research',tags:['Theory']},{id:'funded',tags:['project:funded']},{id:'old',tags:['project:old']},{id:'attempt',tags:['project:attempt']},{id:'mixed',tags:['project:attempt','project:funded']},{id:'untagged-failure',tags:['Failed Raise']}];

test('approved recordings appear once in main and remain historical without promoting their projects',()=>{
  const ids=['res-151','res-260','ownership-radio-16-recording','ownership-radio-21-recording','ownership-radio-22-recording','ownership-radio-23-recording'];
  const shows=ids.map(id=>({id,tags:['project:old']}));
  const catalog=[...shows,{id:'other-closed-source',tags:['project:old']}];
  assert.deepEqual(selectProjectResources(catalog,projects,'all').map(r=>r.id),ids);
  assert.equal(selectProjectResources(catalog,projects,'historical').length,7);
  assert.equal(selectProjectResources(catalog,projects,'ecosystem').length,0);
  assert.ok(shows.every(r=>isHistoricalAttempt(r,projects)));
  assert.equal(selectProjectResources([],projects,'all').length,0); // No bypass of upstream publication filtering.
});
test('main library separates unsuccessful attempts without losing mixed ecosystem interviews',()=>{
  assert.deepEqual(selectProjectResources(records,projects,'all').map(r=>r.id),['research','funded','mixed']);
  assert.deepEqual(selectProjectResources(records,projects,'historical').map(r=>r.id),['old','attempt','untagged-failure']);
  assert.equal(isHistoricalAttempt(records[4],projects),false);
});
test('raised-project browsing and explicit historical project browsing retain their scope',()=>{
  assert.deepEqual(selectProjectResources(records,projects,'ecosystem').map(r=>r.id),['funded','mixed']);
  assert.deepEqual(selectProjectResources(records,projects,'attempt').map(r=>r.id),['attempt','mixed']);
  assert.equal(records.length,6);
});
