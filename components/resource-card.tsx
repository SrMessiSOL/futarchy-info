"use client"

import { ExternalLink, FileText, Mic, Video, TrendingUp, BookOpen, Calendar, Eye, Star, ThumbsUp, ThumbsDown, UserRound } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatResourceDate, type Resource } from "@/lib/resources-data"
import { resourceSeries, mediaSeries } from "@/lib/media-series"
import { mediaNote } from "@/lib/agent-media"

interface ResourceCardProps {
  resource: Resource
  viewCount: number
  score: number
  onView: () => void
  onVote: (type: "like" | "dislike") => void
}

export function ResourceCard({ resource, viewCount, score, onView, onVote }: ResourceCardProps) {
  const formattedDate = formatResourceDate(resource)
  const transcript = mediaNote(resource.id)?.transcript

  const formatLabel = {
    paper: "Paper",
    article: "Article",
    podcast: "Podcast",
    video: "Video",
    news: "News",
  }[resource.type]

  const series = resourceSeries(resource)
  const typeLabel = mediaSeries.find(item => item.id === series)?.label ?? formatLabel
  const actionLabel = resource.type === "podcast" ? "Listen" : resource.type === "video" ? "Watch" : "Read"

  const getIcon = () => {
    switch (resource.type) {
      case "paper":
        return FileText
      case "podcast":
        return Mic
      case "video":
        return Video
      case "news":
        return TrendingUp
      default:
        return BookOpen
    }
  }

  const getTypeColor = () => "bg-muted text-foreground border-border"

  const Icon = getIcon()

  return (
    <Card className="resource-card group flex h-full flex-col overflow-hidden border-border/70 bg-card/95 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <Badge className={`gap-1 rounded-md px-2.5 py-1 ${getTypeColor()}`}>
            <Icon className="h-4 w-4" />
            {typeLabel}
          </Badge>
          {resource.featured && <Badge className="rounded-md bg-primary text-primary-foreground">Featured</Badge>}
        </div>
        <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight"><button type="button" onClick={onView} className="text-left transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">{resource.title}</button></h3>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col pt-0">
        <div className="space-y-3">
          <div className="grid gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{resource.author}</span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{formattedDate}</span>
            </span>
          </div>

          <p className="text-xs text-muted-foreground">{resource.verification === 'source-checked' ? 'Source checked · ' + resource.checkedAt : 'Archive entry · verification pending'}</p>
          {resource.description && <p className="text-sm leading-6 text-muted-foreground line-clamp-3">{resource.description}</p>}
        </div>

        {resource.tags && resource.tags.length > 0 && (
          <div className="mt-auto pt-4">
            <div className="flex flex-wrap gap-1">
              {resource.tags.filter(tag => !tag.startsWith("project:")).slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-md border-border text-xs text-foreground/80">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-stretch gap-3 border-t pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button size="sm" className="gap-2 rounded-lg" onClick={onView} aria-label={`${actionLabel}: ${resource.title}`}>
            {actionLabel}<ExternalLink className="size-3.5" />
          </Button>
          {transcript?.status === 'available' && <a className="flex items-center gap-1.5 text-xs font-medium text-primary underline-offset-4 hover:underline" href={`/transcripts/${resource.id}`}><FileText className="size-3.5" />Transcript (machine)</a>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
          {mediaNote(resource.id) ? <a className="underline-offset-4 hover:text-foreground hover:underline" href={`/api/library/${resource.id}`} target="_blank" rel="noopener noreferrer">Reading notes ↗</a> : <span>Original source ↗</span>}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1" aria-label={`${viewCount} views`}><Eye className="size-3" />{viewCount}</span>
            <span className="flex items-center gap-1" aria-label={`Score: ${score}`}><Star className="size-3" />{score}</span>
            <Button variant="ghost" size="sm" aria-label={`Like: ${resource.title}`} title="Like" className="size-8 p-0" onClick={() => onVote("like")}><ThumbsUp className="size-3.5" /></Button>
            <Button variant="ghost" size="sm" aria-label={`Dislike: ${resource.title}`} title="Dislike" className="size-8 p-0" onClick={() => onVote("dislike")}><ThumbsDown className="size-3.5" /></Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
