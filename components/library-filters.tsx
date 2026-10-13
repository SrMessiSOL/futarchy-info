"use client";

import type { Dispatch, SetStateAction } from "react"
import { Filter, Calendar, BookOpen, Mic, Video, FileText, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { resources } from "@/lib/resources-data"

import projects from "@/content/projects.json"
import { selectProjectResources } from "@/lib/library-scope"

interface LibraryFiltersProps {
  project: string
  setProject: Dispatch<SetStateAction<string>>
  activeFilters: string[]
  setActiveFilters: Dispatch<SetStateAction<string[]>>
  sortBy: string
  setSortBy: Dispatch<SetStateAction<string>>
  timePeriod: string
  setTimePeriod: Dispatch<SetStateAction<string>>
}

export function LibraryFilters({
  project, setProject,
  activeFilters,
  setActiveFilters,
  sortBy,
  setSortBy,
  timePeriod,
  setTimePeriod,
}: LibraryFiltersProps) {
  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const scopedResources = selectProjectResources(resources, projects, project)
  const historical = project === 'historical' || projects.some(p => p.id === project && p.coverage === 'failed-raise')
  const closedProject = projects.some(p => p.id === project && p.coverage === 'historical-raise')
  const visibleProjects = projects.filter(p => (historical ? p.coverage === 'failed-raise' : p.coverage !== 'failed-raise') && resources.some(r => r.tags?.includes('project:' + p.id)))
  const filterCategories = [
    { id: "papers", label: "Academic Papers", icon: FileText, count: scopedResources.filter((r) => r.type === "paper").length },
    { id: "articles", label: "Articles & Analysis", icon: BookOpen, count: scopedResources.filter((r) => r.type === "article").length },
    { id: "podcasts", label: "Podcasts", icon: Mic, count: scopedResources.filter((r) => r.type === "podcast").length },
    { id: "videos", label: "Videos", icon: Video, count: scopedResources.filter((r) => r.type === "video").length },
    { id: "news", label: "News Coverage", icon: TrendingUp, count: scopedResources.filter((r) => r.type === "news").length },
  ]

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">{historical ? 'Unsuccessful raises archive' : 'Browse the library'}</h2>
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-foreground dark:text-primary">
              {activeFilters.length} active
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={project} onValueChange={setProject}>
            <SelectTrigger className="w-[220px]" aria-label="Filter by project"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Main library</SelectItem>
              <SelectItem value="ecosystem">Active raised projects</SelectItem>
              <SelectItem value="historical">Unsuccessful raises archive</SelectItem>
              {[...visibleProjects].sort((a,b)=>a.name.localeCompare(b.name)).map(p=><SelectItem key={p.id} value={p.id}>{p.name}{p.coverage === 'historical-raise' ? ' (historical)' : p.coverage === 'failed-raise' ? ' (failed raise)' : ''}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="added">Recently added</SelectItem>
              <SelectItem value="recent">Newest dated</SelectItem>
              <SelectItem value="oldest">Oldest dated</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="relevant">Most viewed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              {[...new Set(scopedResources.filter(r => r.datePrecision === 'day' && r.date).map(r => r.date!.slice(0, 4)))].sort().reverse().map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {historical && <p className="text-sm text-muted-foreground">Sources about unsuccessful fundraising attempts. Selected interviews and recordings also appear in the main library.</p>}
      {closedProject && <p className="text-sm text-muted-foreground">This project raised through the ecosystem and is retained for its history. It is no longer listed as an active MetaDAO project.</p>}
      <div className="flex flex-wrap gap-3">
        {filterCategories.map((category) => {
          const Icon = category.icon
          const isActive = activeFilters.includes(category.id)

          return (
            <Button key={category.id} variant={isActive ? "default" : "outline"} className="gap-2" onClick={() => toggleFilter(category.id)}>
              <Icon className="h-4 w-4" />
              {category.label}
              <Badge variant="secondary" className="bg-primary/10 text-foreground dark:text-primary">
                {category.count}
              </Badge>
            </Button>
          )
        })}
      </div>

      {activeFilters.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="cursor-pointer bg-primary/10 text-foreground dark:text-primary" onClick={() => toggleFilter(filter)}>
              {filterCategories.find((c) => c.id === filter)?.label} x
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
