import notes from '@/content/media-notes.json'
import { resources, type Resource } from '@/lib/resources-data'

export interface MediaNote {
  resourceId: string
  reviewMethod: string
  reviewBoundary: string
  checkedAt: string
  sections: { start: string; topic: string }[]
  transcript: { status: 'permission-required' | 'available'; sha256: string | null; jsonUrl?: string; textUrl?: string }
}

const noteMap = new Map((notes as MediaNote[]).map(note => [note.resourceId, note]))
export function mediaNote(id: string) { return noteMap.get(id) }
export function agentResource(resource: Resource) {
  const note = mediaNote(resource.id)
  return {
    ...resource,
    readingUrl: note ? `/api/library/${resource.id}` : null,
    readingFormat: note ? 'editorial-notes' : null,
    mediaReview: note ?? null,
  }
}
export function agentLibrary(scopeResources = resources) { return scopeResources.map(agentResource) }
export function mediaMarkdown(resource: Resource, note: MediaNote) {
  return [
    `# ${resource.title}`, '', `Source: ${resource.url}`, `Publisher: ${resource.author}`,
    `Publication date: ${resource.datePrecision === 'day' ? resource.date : 'unverified'}`,
    `Reviewed: ${note.checkedAt}`, '',
    '## Editorial reading notes', '', resource.description ?? '', '',
    'These are original editorial notes, not a verbatim transcript. Source claims are attributed, not independently audited.', '',
    '## Review method and limits', '', note.reviewMethod, '', note.reviewBoundary, '',
    '## Timestamped topic guide', '',
    ...(note.sections.length ? note.sections.map(section => `- ${section.start}: ${section.topic}`) : ['No timestamp guide was recorded for this review.']), '',
    '## Transcript access', '',
    ...(note.transcript.status === 'available' ? [
      `Full machine transcript (text): ${note.transcript.textUrl}`,
      `Timestamped segments (JSON): ${note.transcript.jsonUrl}`,
      'Published with OwnershipFM team permission. Uncorrected machine transcription may contain invented or repeated passages, name/number errors and inaccurate timestamps. Review boundaries above still apply.',
    ] : ['The full transcript was used for research but is not redistributed here. Publisher permission or a redistribution license is required before hosting it. Consult the original recording and its publisher caption/transcript controls.']),
    ...(note.transcript.sha256 ? ['', `Research transcript SHA-256: ${note.transcript.sha256}`] : []), '',
  ].join('\n')
}
