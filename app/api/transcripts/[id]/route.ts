import transcripts from '@/content/transcripts.json'
import { resources } from '@/lib/resources-data'
import type { TranscriptParts } from '@/lib/transcript-parts'

function timestamp(seconds: number) {
  const whole = Math.floor(seconds)
  return `${Math.floor(whole / 3600).toString().padStart(2, '0')}:${Math.floor(whole / 60 % 60).toString().padStart(2, '0')}:${(whole % 60).toString().padStart(2, '0')}`
}
export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  // Use the same publication gate as cards and the agent index.
  const resource = resources.find(item => item.id === id)
  const transcript = (resource && transcripts.find(item => item.resourceId === id)) as (typeof transcripts[number] & TranscriptParts) | undefined
  if (!transcript) return Response.json({ error: 'Transcript not available.' }, { status: 404 })
  const query = new URL(request.url).searchParams
  const format = query.get('format') ?? 'text'
  if (!['text', 'json'].includes(format)) return Response.json({ error: 'Use text or json.' }, { status: 400 })
  const downloadHeaders = query.get('download') === '1' ? { 'Content-Disposition': `attachment; filename="${id}.${format === 'json' ? 'json' : 'txt'}"` } : undefined
  if (format === 'json') return Response.json(transcript, { headers: downloadHeaders })
  return new Response([
    transcript.title, `Source: ${transcript.sourceUrl}`, transcript.warning,
    `Coverage: ${transcript.reviewBoundary}`, `Timing: ${transcript.timestampAdjustments}`, '',
    `Quality audit: ${transcript.qualityAudit.method}`,
    ...('audioGapReview' in transcript.qualityAudit ? [`Audio gap review: ${transcript.qualityAudit.audioGapReview?.method}`] : []),
    ...transcript.qualityAudit.untranscribedIntervals.map(interval => `Interval without transcript text [${timestamp(interval.start)}–${timestamp(interval.end)}]: ${interval.status}`), '',
    ...('editorialChecks' in transcript ? (transcript.editorialChecks ?? []).map(check => `Editorial reference check [${timestamp(check.start)}–${timestamp(check.end)}] (${check.status}): ${check.note}${check.sources.length ? ` Sources: ${check.sources.join(' ; ')}` : ''}`) : []), '',
    ...('sourceParts' in transcript && transcript.sourceParts ? ['Source parts (collection offsets, not original broadcast positions):', ...transcript.sourceParts.map(part => `[${timestamp(part.offset)}] ${part.label}; source duration ${timestamp(part.durationSeconds)}; SHA-256 ${part.audioSha256}`), ''] : []),
    ...('openingPart' in transcript && transcript.openingPart ? [
      '## Part 1: recovered opening (timestamps local to this source)',
      `Source: ${transcript.openingPart.sourceUrl}`, transcript.openingPart.warning,
      `Coverage: ${transcript.openingPart.reviewBoundary}`,
      ...transcript.openingPart.qualityAudit.untranscribedIntervals.map(interval => `Opening interval without transcript text [${timestamp(interval.start)}–${timestamp(interval.end)}]: ${interval.status}`),
      ...transcript.openingPart.segments.map(segment => `[${timestamp(segment.start)}–${timestamp(segment.end)}] ${segment.text.trim()}`), '',
      '## Part 2: resumed Space (timestamps restart at zero)', '',
    ] : []),
    ...transcript.segments.map(segment => `[${timestamp(segment.start)}–${timestamp(segment.end)}] ${segment.text.trim()}`), '',
  ].join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=300', ...downloadHeaders } })
}
