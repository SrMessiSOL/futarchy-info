import { notFound } from "next/navigation"
import transcripts from "@/content/transcripts.json"
import { resources, formatResourceDate } from "@/lib/resources-data"
import { TranscriptReader } from "@/components/transcript-reader"
import { transcriptTime } from "@/lib/transcript-time"
import type { TranscriptParts } from "@/lib/transcript-parts"

export default async function TranscriptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const resource = resources.find(item => item.id === id)
  const transcript = (resource && transcripts.find(item => item.resourceId === id)) as (typeof transcripts[number] & TranscriptParts) | undefined
  if (!resource || !transcript) notFound()
  return <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
    <a href="/#library" className="text-sm text-muted-foreground hover:text-primary">← Back to the library</a>
    <header className="mt-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">OwnershipFM · Machine transcript</p>
      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{resource.title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">{resource.author} · {formatResourceDate(resource)}</p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground">{transcript.sourceParts ? "Open original clips" : "Open original recording"} ↗</a>
        <a href={`/api/transcripts/${id}`} className="rounded-lg border px-4 py-2">Plain text / AI agents</a>
        <a href={`/api/transcripts/${id}?format=json`} className="rounded-lg border px-4 py-2">JSON</a>
        <a href={`/api/transcripts/${id}?download=1`} className="rounded-lg border px-4 py-2">Download text</a>
        <a href={`/api/transcripts/${id}?format=json&download=1`} className="rounded-lg border px-4 py-2">Download JSON</a>
      </div>
    </header>
    <aside className="mt-8 rounded-xl border bg-muted/30 p-5 text-sm leading-6">
      <p>{transcript.warning}</p>
      <details className="mt-3"><summary className="cursor-pointer font-medium">Review notes and transcript gaps</summary>
        <p className="mt-3">{transcript.reviewBoundary}</p><p className="mt-3">{transcript.timestampAdjustments}</p>
        <p className="mt-3">{transcript.qualityAudit.method}</p>
        {transcript.qualityAudit.untranscribedIntervals.map((interval, index) => <p key={index} className="mt-3">{transcriptTime(interval.start)}–{transcriptTime(interval.end)}: {interval.status}</p>)}
        {("editorialChecks" in transcript ? transcript.editorialChecks ?? [] : []).map((check, index) => <div key={index} className="mt-3"><p>{transcriptTime(check.start)}–{transcriptTime(check.end)} ({check.status}): {check.note}</p>{check.sources.map((source, sourceIndex) => <a key={sourceIndex} href={source} target="_blank" rel="noopener noreferrer" className="mr-3 text-primary underline">Reference {sourceIndex + 1}</a>)}</div>)}
      </details>
    </aside>
    {("sourceParts" in transcript && transcript.sourceParts) && <details className="mt-6 rounded-xl border p-5 text-sm">
      <summary className="cursor-pointer font-medium">Partial clip collection: source boundaries</summary>
      <p className="mt-3">Times below are positions in this clip collection, not the original broadcast. Each clip retains its source filename and duration in the JSON download. Missing clips and material between clips are not reconstructed.</p>
      <ul className="mt-3 space-y-2">{transcript.sourceParts.map(part => <li key={part.label}>{transcriptTime(part.offset)}: {part.label} ({transcriptTime(part.durationSeconds)})</li>)}</ul>
    </details>}
    {("openingPart" in transcript && transcript.openingPart) && <section className="mt-10">
      <h2 className="text-2xl font-semibold">Part 1: recovered opening</h2>
      <p className="mt-3 text-sm text-muted-foreground">{transcript.openingPart.warning} Times are local to the opening recording. The interruption between parts has unknown duration.</p>
      <a className="mt-3 inline-block text-sm text-primary underline" href={transcript.openingPart.sourceUrl} target="_blank" rel="noopener noreferrer">Opening source ↗</a>
      <details className="mt-3 text-sm"><summary className="cursor-pointer font-medium">Opening review notes and gaps</summary>
        <p className="mt-3">{transcript.openingPart.reviewBoundary}</p>
        {transcript.openingPart.qualityAudit.untranscribedIntervals.map((interval, index) => <p key={index} className="mt-3">{transcriptTime(interval.start)}–{transcriptTime(interval.end)}: {interval.status}</p>)}
      </details>
      <TranscriptReader segments={transcript.openingPart.segments} searchId="opening-search" />
      <h2 className="mt-10 text-2xl font-semibold">Part 2: resumed Space</h2>
      <p className="mt-3 text-sm text-muted-foreground">Timestamps restart for this separate recording.</p>
    </section>}
    <TranscriptReader segments={transcript.segments} />
  </main>
}
