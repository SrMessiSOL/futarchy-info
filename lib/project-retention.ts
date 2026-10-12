interface TaggedResource { tags?: string[] }
interface Project { id: string; coverage: string }
interface RadioGuest { projectId: string }

// An announcement, sponsor mention or Roadshow appearance is not a Radio guest appearance.
export function excludedByProjectRetention(resource: TaggedResource, projects: Project[], guests: RadioGuest[]) {
  const ids = (resource.tags ?? []).filter(tag => tag.startsWith('project:')).map(tag => tag.slice(8))
  return ids.length > 0 && ids.every(id => projects.some(project => project.id === id && project.coverage === 'failed-raise') && !guests.some(guest => guest.projectId === id))
}
