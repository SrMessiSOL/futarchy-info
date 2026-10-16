"use client"

import { useMemo, useState } from "react"
import { transcriptPassages, transcriptTime } from "@/lib/transcript-time"

export function TranscriptReader({ segments, searchId = "transcript-search" }: { segments: { start: number; end: number; text: string }[]; searchId?: string }) {
  const [query, setQuery] = useState("")
  const passages = useMemo(() => transcriptPassages(segments), [segments])
  const matching = useMemo(() => passages.filter(segment => segment.text.toLowerCase().includes(query.trim().toLowerCase())), [passages, query])
  return <section aria-label="Transcript text" className="mt-8">
    <div className="sticky top-0 z-10 border-y bg-background py-4">
      <label htmlFor={searchId} className="mb-2 block text-sm font-medium">Find in this transcript</label>
      <div className="flex gap-3"><input id={searchId} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search names, topics or phrases…" className="min-w-0 flex-1 rounded-lg border bg-background px-3 py-2 text-base" />{query && <button onClick={() => setQuery("")} className="text-sm text-primary">Clear search</button>}</div>
      <p role="status" className="mt-2 text-xs text-muted-foreground">{query.trim() ? `${matching.length} matching passages` : `${passages.length} timestamped passages`}</p>
    </div>
    <div className="divide-y">{matching.map(segment => <article key={segment.index} id={`${searchId === "transcript-search" ? "segment" : searchId}-${segment.index}`} className="scroll-mt-44 py-6 sm:grid sm:grid-cols-[7rem_1fr] sm:gap-6">
      <a href={`#${searchId === "transcript-search" ? "segment" : searchId}-${segment.index}`} aria-label={`Link to passage at ${transcriptTime(segment.start)}`} className="font-mono text-xs text-primary underline-offset-4 hover:underline">{transcriptTime(segment.start)}</a>
      <p className="mt-2 whitespace-pre-line text-base leading-8 sm:mt-0">{segment.text.trim()}</p>
    </article>)}</div>
    {!matching.length && <p className="py-12 text-muted-foreground">No passages match this search. Try another name or phrase.</p>}
  </section>
}
