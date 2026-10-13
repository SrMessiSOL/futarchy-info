interface TaggedResource { id?: string; tags?: string[] }
interface ProjectCoverage { id: string; coverage: string }

// Explicit user-approved recordings appear in both scopes without changing project status.
const mainLibraryRecordings = new Set([
  'res-151', // Seb Monty with Cobra (Ranger)
  'res-260', // Ownership Podcast: Maushish (Paystream)
  'ownership-radio-16-recording',
  'ownership-radio-21-recording',
  'ownership-radio-22-recording',
  'ownership-radio-23-recording',
  'res-152', // Ranger ICO video
  'res-253', // Ranger ICO news
  'bountive-archive-0925a353fb', // Approved founder pitch
  'ownership-report-15-recording', // Ryvo report
])

// Mixed interviews stay in the main library when they also cover raised projects.
export function isHistoricalAttempt(resource: TaggedResource, projects: ProjectCoverage[]) {
  const tags = new Set(resource.tags ?? [])
  if (projects.some(p => (p.coverage === 'raise' || p.coverage === 'historical-raise') && tags.has('project:' + p.id))) return false
  return tags.has('Failed Raise') || projects.some(p => p.coverage === 'failed-raise' && tags.has('project:' + p.id))
}

export function selectProjectResources<T extends TaggedResource>(resources: T[], projects: ProjectCoverage[], project: string) {
  if (project === 'all') return resources.filter(r => !isHistoricalAttempt(r, projects) || (r.id !== undefined && mainLibraryRecordings.has(r.id)))
  if (project === 'historical') return resources.filter(r => isHistoricalAttempt(r, projects))
  if (project === 'ecosystem') return resources.filter(r => projects.some(p => p.coverage === 'raise' && r.tags?.includes('project:' + p.id)))
  return resources.filter(r => r.tags?.includes('project:' + project))
}
