import test from 'node:test';
import assert from 'node:assert/strict';
import { isHistoricalAttempt, selectProjectResources } from '../lib/library-scope.ts';
const projects = [{id:'funded',coverage:'raise'},{id:'old',coverage:'historical-raise'},{id:'attempt',coverage:'failed-raise'}];
const records = [{id:'research',tags:['Theory']},{id:'funded',tags:['project:funded']},{id:'old',tags:['project:old']},{id:'attempt',tags:['project:attempt']},{id:'mixed',tags:['project:attempt','project:funded']},{id:'untagged-failure',tags:['Failed Raise']}];
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
