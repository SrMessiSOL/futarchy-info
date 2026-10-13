import data from '@/content/resources.json'
import projects from '@/content/projects.json'
import { selectProjectResources } from '@/lib/library-scope'
import lifecycle from '@/content/project-lifecycle.json'
import publicationExceptions from '@/content/publication-exceptions.json'
import { publicationBlockReason } from '@/lib/publication-policy'
import radioProjects from '@/content/ownership-radio-projects.json'
import { excludedByProjectRetention } from '@/lib/project-retention'

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
  supersededBy?: string
  catalogOnly?: boolean
  undatedReference?: boolean
  sourceUpdatedAt?: string
  dateBasis?: 'raise-start' | 'trading-live' | 'source-update'
}

// Keep legacy IDs in the catalog so stored engagement keys are never reassigned.
export const catalog = data as Resource[]
export const resources = catalog.filter(resource => !resource.catalogOnly && !resource.duplicateOf && !excludedByProjectRetention(resource, projects, radioProjects) && !publicationBlockReason(resource, lifecycle, publicationExceptions.resourceIds))
export const mainResources = selectProjectResources(resources, projects, 'all')
export const lastLibraryUpdate = mainResources.reduce((latest, r) => r.addedAt && r.addedAt > latest ? r.addedAt : latest, '')
export function resourceTime(resource: Resource) {
  return resource.date && resource.datePrecision === 'day' ? Date.parse(resource.date + 'T00:00:00Z') : null
}
export function formatResourceDate(resource: Resource) {
  if (resource.undatedReference && !resource.date) return 'Undated reference' + (resource.sourceUpdatedAt ? ' · Updated ' + resource.sourceUpdatedAt : '')
  if (!resource.date || resource.datePrecision !== 'day') return 'Date unverified'
  const label = resource.dateBasis === 'raise-start' ? 'Raise start · ' : resource.dateBasis === 'trading-live' ? 'Trading live · ' : resource.dateBasis === 'source-update' ? 'Updated · ' : resource.dateKind === 'event' ? 'Event · ' : resource.dateKind === 'unknown' ? 'Archive date · ' : ''
  return label + new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(resource.date + 'T00:00:00Z'))
}
