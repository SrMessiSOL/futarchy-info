import { resources } from '@/lib/resources-data'
import projects from '@/content/projects.json'
import { selectProjectResources } from '@/lib/library-scope'
import { agentLibrary } from '@/lib/agent-media'

export function GET(request: Request) {
  const scope = new URL(request.url).searchParams.get('scope') ?? 'all'
  if (!['all', 'historical', 'everything'].includes(scope)) return Response.json({ error: 'Use all, historical or everything.' }, { status: 400 })
  const selected = scope === 'everything' ? resources : selectProjectResources(resources, projects, scope)
  return Response.json({
    version: 1, scope, count: selected.length,
    readingFormat: 'Original editorial notes and timestamp guides; not verbatim transcripts.',
    resources: agentLibrary(selected),
  }, { headers: { 'Cache-Control': 'public, max-age=300' } })
}
