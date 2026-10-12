interface LifecycleRule { projectId: string; names: string[]; publicationCutoff: string | null }
interface DatedResource { id?: string; title: string; author?: string; description?: string; tags?: string[]; date?: string | null; dateKind?: string; datePrecision?: string }

export function matchingLifecycleRules(resource: DatedResource, rules: LifecycleRule[]) {
  const text = [resource.title, resource.author, resource.description, ...(resource.tags ?? [])].join(' ')
  return rules.filter(rule => resource.tags?.includes('project:' + rule.projectId) || rule.names.some(name => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp('\\b' + escaped + '\\b', 'i').test(text)
  }))
}

export function publicationBlockReason(resource: DatedResource, rules: LifecycleRule[], approvedIds: string[] = []) {
  if (resource.id && approvedIds.includes(resource.id)) return null
  for (const rule of matchingLifecycleRules(resource, rules)) {
    if (!rule.publicationCutoff) return rule.projectId + ': primary cutoff unresolved'
    if (!resource.date || resource.datePrecision !== 'day' || resource.dateKind === 'unknown') return rule.projectId + ': source date unverified'
    if (resource.date >= rule.publicationCutoff) return rule.projectId + ': on or after editorial cutoff ' + rule.publicationCutoff
  }
  return null
}
