import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { excludedByProjectRetention } from '../lib/project-retention.ts'

test('failed raises need a Radio appearance; funded, closed-funded and mixed sources remain eligible', () => {
  const projects=[{id:'funded',coverage:'raise'},{id:'closed',coverage:'historical-raise'},{id:'guest',coverage:'failed-raise'},{id:'absent',coverage:'failed-raise'}]
  const guests=[{projectId:'guest'}]
  assert.equal(excludedByProjectRetention({tags:['project:absent']},projects,guests),true)
  assert.equal(excludedByProjectRetention({tags:['project:guest']},projects,guests),false)
  assert.equal(excludedByProjectRetention({tags:['project:funded']},projects,guests),false)
  assert.equal(excludedByProjectRetention({tags:['project:closed']},projects,guests),false)
  assert.equal(excludedByProjectRetention({tags:['project:absent','project:funded']},projects,guests),false)
  assert.equal(excludedByProjectRetention({tags:['MetaDAO']},projects,guests),false)
})
test('retained failed projects have actual reviewed Radio recording references', () => {
  const guests=JSON.parse(fs.readFileSync('content/ownership-radio-projects.json'))
  const rows=JSON.parse(fs.readFileSync('content/resources.json'))
  const projects=JSON.parse(fs.readFileSync('content/projects.json'))
  assert.equal(new Set(guests.map(g=>g.projectId)).size,guests.length)
  for(const guest of guests){
    assert.equal(projects.find(p=>p.id===guest.projectId)?.coverage,'failed-raise')
    assert.ok(guest.recordingIds.length)
    for(const id of guest.recordingIds){
      const recording=rows.find(row=>row.id===id)
      assert.ok(recording && /^ownership-radio-\d+-recording$/.test(recording.id))
      assert.ok(!recording.catalogOnly && !recording.duplicateOf)
    }
  }
  for(const row of rows.filter(row=>excludedByProjectRetention(row,projects,guests))) assert.equal(row.catalogOnly,true,row.id)
})
