"use client"
import { ArrowDown, ArrowUpRight, Search, Library } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { mainResources as resources, lastLibraryUpdate } from "@/lib/resources-data"
import projects from "@/content/projects.json"
interface LibraryHeroProps { search: string; setSearch: React.Dispatch<React.SetStateAction<string>> }
export function LibraryHero({ search, setSearch }: LibraryHeroProps) {
  const stats = [[resources.length, "Curated sources"], [projects.filter(p => p.coverage === "raise").length, "Active raised projects"], [resources.filter(r => ["podcast", "video", "news"].includes(r.type)).length, "Media items"]]
  return <header className="library-hero border-b">
    <a href="#library" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-card focus:p-4">Skip to library</a>
    <nav aria-label="Main navigation" className="library-shell flex items-center justify-between gap-4 border-b py-5">
      <a href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight"><span className="brand-mark"><Library className="size-5" /></span>futarchy.info</a>
      <div className="flex items-center gap-5 text-sm"><a href="#library" className="hidden hover:text-primary sm:inline">Library</a><a href="/llms.txt" className="flex items-center gap-1 hover:text-primary">For agents <ArrowUpRight className="size-3.5" /></a><ModeToggle /></div>
    </nav>
    <div className="library-shell py-7 md:py-8">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_280px] lg:gap-16">
        <div><p className="eyebrow mb-3">Independent research archive <span className="mx-2 text-primary">/</span> MetaDAO ecosystem</p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl">The ownership economy.<br /><span className="hero-serif text-primary">On the record.</span></h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">Explore the projects that raised on MetaDAO. The launches, the decisions, the founder conversations—and what happened next.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 border-t pt-5 lg:grid-cols-1 lg:gap-4 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">{stats.map(([value,label])=><div key={label} className="lg:flex lg:items-baseline lg:justify-between lg:gap-3"><span className="block text-2xl font-medium tabular-nums tracking-tight">{value}</span><span className="text-xs leading-5 text-muted-foreground">{label}</span></div>)}</div>
      </div>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xl"><Search aria-hidden="true" className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-primary" /><Input type="search" aria-label="Search the research library" placeholder="Find a project, person or conversation…" className="h-12 rounded-xl border-border bg-card pl-12 pr-4 text-base shadow-sm" value={search} onChange={e=>setSearch(e.target.value)} /></div>
        <a href="#library" className="flex items-center gap-2 text-sm font-medium text-primary">Explore the library <ArrowDown className="size-4" /></a>
      </div><p className="mt-3 text-xs text-muted-foreground">Library updated {lastLibraryUpdate || "date unavailable"}</p>
    </div>
  </header>
}
