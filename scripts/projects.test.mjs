import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('project navigation has a unique roster, a source record for every project, and no orphan tags', () => {
  const projects = JSON.parse(readFileSync('content/projects.json', 'utf8'));
  const resources = JSON.parse(readFileSync('content/resources.json', 'utf8'));
  assert.ok(projects.length > 0);
  const ids = new Set(projects.map(p => p.id));
  assert.equal(ids.size, projects.length);
  for (const project of projects) {
    assert.ok(['raise', 'historical-raise', 'failed-raise'].includes(project.coverage));
    const record = resources.find(r => r.id === project.resourceId);
    assert.ok(record && !record.duplicateOf, project.id);
    assert.equal(record.url, project.companyUrl);
    assert.ok(record.tags.includes(`project:${project.id}`));
  }
  for (const record of resources) for (const tag of record.tags ?? []) {
    if (tag.startsWith('project:')) assert.ok(ids.has(tag.slice(8)), `${record.id}: ${tag}`);
  }
  assert.equal(projects.find(p => p.id === 'hurupay').coverage, 'failed-raise');
});
