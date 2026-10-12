import { resources } from '@/lib/resources-data'
import { agentResource, mediaMarkdown, mediaNote } from '@/lib/agent-media'

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const resource = resources.find(item => item.id === id)
  if (!resource) return Response.json({ error: 'Resource not found.' }, { status: 404 })
  const format = new URL(request.url).searchParams.get('format') ?? 'markdown'
  if (!['markdown', 'json'].includes(format)) return Response.json({ error: 'Use markdown or json.' }, { status: 400 })
  if (format === 'json') return Response.json(agentResource(resource))
  const note = mediaNote(id)
  if (!note) return Response.json({ error: 'No reviewed media notes available.', sourceUrl: resource.url }, { status: 404 })
  return new Response(mediaMarkdown(resource, note), { headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=300' } })
}
