import transcripts from '@/content/transcripts.json'
import { resources } from '@/lib/resources-data'

function timestamp(seconds: number) {
  const whole = Math.floor(seconds)
  return `${Math.floor(whole / 3600).toString().padStart(2, '0')}:${Math.floor(whole / 60 % 60).toString().padStart(2, '0')}:${(whole % 60).toString().padStart(2, '0')}`
}
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  // Use the same publication gate as cards and the agent index.
  const resource = resources.find(item => item.id === id)
  const transcript = resource && transcripts.find(item => item.resourceId === id)
  if (!transcript) return Response.json({ error: 'Transcript not available.' }, { status: 404 })
  const format = new URL(request.url).searchParams.get('format') ?? 'text'
  if (!['text', 'json'].includes(format)) return Response.json({ error: 'Use text or json.' }, { status: 400 })
  if (format === 'json') return Response.json(transcript)
  return new Response([
    transcript.title, `Source: ${transcript.sourceUrl}`, transcript.warning,
    `Coverage: ${transcript.reviewBoundary}`, `Timing: ${transcript.timestampAdjustments}`, '',
    `Quality audit: ${transcript.qualityAudit.method}`,
    ...transcript.qualityAudit.untranscribedIntervals.map(interval => `Interval without transcript text [${timestamp(interval.start)}–${timestamp(interval.end)}]: ${interval.status}`), '',
    ...transcript.segments.map(segment => `[${timestamp(segment.start)}–${timestamp(segment.end)}] ${segment.text.trim()}`), '',
  ].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=300' } })
}
