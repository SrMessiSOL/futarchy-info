import data from '@/content/resources.json'

export interface Resource {
  id: string
  title: string
  author: string
  date: string | null
  type: 'paper' | 'article' | 'podcast' | 'video' | 'news'
  url: string
  description?: string
  tags?: string[]
  featured?: boolean
  dateKind: 'publication' | 'event' | 'unknown'
  datePrecision: 'day' | 'unverified' | 'unknown'
  verification: 'legacy' | 'source-checked'
  sourceUrl: string
  addedAt: string | null
  checkedAt: string | null
  evidenceNote?: string
  duplicateOf?: string
}

// Keep legacy IDs in the catalog so stored engagement keys are never reassigned.
export const catalog = data as Resource[]
export const resources = catalog.filter(resource => !resource.duplicateOf)
export const lastLibraryUpdate = resources.reduce((latest, r) => r.addedAt && r.addedAt > latest ? r.addedAt : latest, '')
export function resourceTime(resource: Resource) {
  return resource.date && resource.datePrecision === 'day' ? Date.parse(resource.date + 'T00:00:00Z') : null
}
export function formatResourceDate(resource: Resource) {
  if (!resource.date || resource.datePrecision !== 'day') return 'Date unverified'
  const label = resource.dateKind === 'event' ? 'Event · ' : resource.dateKind === 'unknown' ? 'Archive date · ' : ''
  return label + new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(resource.date + 'T00:00:00Z'))
}
