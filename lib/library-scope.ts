interface TaggedResource { tags?: string[] }
interface ProjectCoverage { id: string; coverage: string }

// Mixed interviews stay in the main library when they also cover raised projects.
export function isHistoricalAttempt(resource: TaggedResource, projects: ProjectCoverage[]) {
  const tags = new Set(resource.tags ?? [])
  if (projects.some(p => p.coverage === 'raise' && tags.has('project:' + p.id))) return false
  return tags.has('Failed Raise') || projects.some(p => p.coverage !== 'raise' && tags.has('project:' + p.id))
}

export function selectProjectResources<T extends TaggedResource>(resources: T[], projects: ProjectCoverage[], project: string) {
  if (project === 'all') return resources.filter(r => !isHistoricalAttempt(r, projects))
  if (project === 'historical') return resources.filter(r => isHistoricalAttempt(r, projects))
  if (project === 'ecosystem') return resources.filter(r => projects.some(p => p.coverage === 'raise' && r.tags?.includes('project:' + p.id)))
  return resources.filter(r => r.tags?.includes('project:' + project))
}
