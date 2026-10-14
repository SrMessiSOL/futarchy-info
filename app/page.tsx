"use client"

import { useState } from "react"
import { LibraryHero } from "@/components/library-hero"
import { LibraryFilters } from "@/components/library-filters"
import { ResourceGrid } from "@/components/resource-grid"
import { ResearchBrief } from "@/components/research-brief"
import { Toaster } from "@/components/ui/toaster"

export default function Page() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("added")
  const [timePeriod, setTimePeriod] = useState("all")
  const [project, setProject] = useState("all")
  const [search, setSearch] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <LibraryHero search={search} setSearch={setSearch} />
      <ResearchBrief />
      <main id="library" className="library-shell scroll-mt-6 py-8 lg:py-10">
        <LibraryFilters
          project={project}
          setProject={setProject}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
        />
        <ResourceGrid
          project={project}
          activeFilters={activeFilters}
          sortBy={sortBy}
          timePeriod={timePeriod}
          search={search}
        />
      </main>
      <footer className="library-shell flex flex-wrap justify-between gap-3 border-t py-8 text-xs text-muted-foreground"><span>futarchy.info · An independent record of the MetaDAO ecosystem.</span><a href="/llms.txt" className="hover:text-primary">Library access for AI agents ↗</a></footer>
      <Toaster />
    </div>
  )
}
