import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {parse} from 'yaml';
const workflow=name=>parse(readFileSync(`.github/workflows/${name}`,'utf8'),{uniqueKeys:true});
test('all workflow files parse and define valid event/job maps',()=>{
  for(const file of readdirSync('.github/workflows')){
    const doc=workflow(file);assert.ok(doc.on,`${file}: missing triggers`);assert.ok(doc.jobs,`${file}: missing jobs`);
    for(const job of Object.values(doc.jobs))assert.ok(Array.isArray(job.steps));
  }
});
test('AI job has no write token and a separate trusted job validates before PR creation',()=>{
  const doc=workflow('editorial.yml');
  assert.equal(doc.permissions.contents,'read');
  assert.equal(doc.permissions['pull-requests'],'read');
  assert.equal(doc.jobs.propose.permissions,undefined);
  assert.deepEqual(doc.jobs['publish-review'].needs,['propose','validate']);
  assert.match(doc.jobs['publish-review'].if,/needs.validate.outputs.changed == 'true'/);
  const steps=doc.jobs.validate.steps;
  assert.ok(steps.some(s=>s.run==='node scripts/validate-proposal.mjs'));
  assert.ok(steps.some(s=>s.run==='npm run build'));
  const action=doc.jobs['publish-review'].steps.find(s=>s.uses?.startsWith('peter-evans/'));
  assert.deepEqual(action.with['add-paths'].trim().split('\n'),['content/resources.json','maintenance/editorial-report.md']);
  assert.equal(action.with.draft,true);
});
test('source text is not exported and discovery cannot deploy',()=>{
  const doc=workflow('editorial.yml');
  const evidence=doc.jobs.propose.steps.find(s=>s.with?.name==='editorial-evidence');
  assert.ok(!evidence.with.path.includes('work/evidence.json'));
  assert.ok(evidence.with.path.includes('work/evidence-provenance.json'));
  assert.ok(!JSON.stringify(workflow('discover.yml')).includes('VERCEL_TOKEN'));
});
test('production deployment validates on main and retains manual deployment',()=>{
  const doc=workflow('vercel-production.yml');
  assert.deepEqual(doc.on.push.branches,['main']);
  assert.ok('workflow_dispatch' in doc.on);
  const steps=doc.jobs.deploy.steps;
  assert.ok(steps.findIndex(s=>s.run==='npm run check')<steps.findIndex(s=>s.id==='deploy'));
  const commands=steps.filter(s=>/vercel.*(?:pull|build|deploy)/.test(s.run??'')).map(s=>s.run);
  assert.equal(commands.length,3);
  const versions=commands.map(command=>command.match(/npx --yes vercel@(\d+\.\d+\.\d+) /)?.[1]);
  assert.ok(versions.every(Boolean),'All Vercel commands must use an exact version');
  assert.equal(new Set(versions).size,1,'Pull, build and deploy must use the same CLI version');
});
