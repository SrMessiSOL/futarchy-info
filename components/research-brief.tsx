import { ArrowUpRight, BookOpen, Clock } from 'lucide-react'
import { resources } from '@/lib/resources-data'

const readingPath = [
  { id: 'res-4', label: '01 · Understand the idea', detail: 'An introduction to futarchy by Vitalik Buterin.' },
  { id: 'monthly-september-2026', label: '02 · Catch up on the ecosystem', detail: 'A monthly research report on ownership coins and decision markets.' },
  { id: 'umbra-treasury-attack-analysis', label: '03 · Examine the risks', detail: 'A treasury attack case study and the questions it raises.' },
]
const latest = resources.filter(r => r.addedAt && r.verification === 'source-checked')
  .sort((a,b) => (b.addedAt ?? '').localeCompare(a.addedAt ?? '') || (b.date ?? '').localeCompare(a.date ?? '')).slice(0,4)

export function ResearchBrief() {
  return <section className="border-b bg-muted/30">
    <div className="container mx-auto grid gap-10 px-4 py-10 lg:grid-cols-2">
      <div>
        <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold"><BookOpen className="h-5 w-5 text-primary" />Start here</h2>
        <p className="mb-5 text-sm leading-6 text-muted-foreground">From the original idea to real decisions, including what can go wrong.</p>
        <div className="space-y-3">{readingPath.map(item => {
          const resource = resources.find(r => r.id === item.id)
          if (!resource) return null
          return <a key={item.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="group block rounded-md border bg-background p-4 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-primary">
            <div className="flex items-center justify-between gap-3 text-sm font-semibold">{item.label}<ArrowUpRight className="h-4 w-4 shrink-0 text-primary" /></div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
          </a>
        })}</div>
      </div>
      <div>
        <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold"><Clock className="h-5 w-5 text-primary" />Recently added</h2>
        <p className="mb-5 text-sm leading-6 text-muted-foreground">New to the library. Addition dates are separate from publication dates.</p>
        <div className="divide-y rounded-md border bg-background">{latest.map(resource => <a key={resource.id} href={resource.url} target="_blank" rel="noopener noreferrer" className="block px-4 py-4 transition-colors hover:bg-muted/60">
          <div className="text-sm font-medium">{resource.title}</div>
          <div className="mt-1 text-xs text-muted-foreground">{resource.author} · Added {resource.addedAt}</div>
        </a>)}</div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">“Source checked” means the linked material was reviewed. It does not independently validate every claim. Historical entries retain a verification-pending label.</p>
      </div>
    </div>
  </section>
}
