"use client"

import { ExternalLink, FileText, Mic, Video, TrendingUp, BookOpen, Calendar, Eye, Star, ThumbsUp, ThumbsDown, UserRound } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatResourceDate, type Resource } from "@/lib/resources-data"
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

  const typeLabel = {
    paper: "Paper",
    article: "Article",
    podcast: "Podcast",
    video: "Video",
    news: "News",
  }[resource.type]

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
        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight line-clamp-3">{resource.title}</h3>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col pt-5">
        <div className="space-y-4">
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
          {resource.description && <p className="text-sm leading-6 text-muted-foreground line-clamp-4">{resource.description}</p>}
        </div>

        {resource.tags && resource.tags.length > 0 && (
          <div className="mt-auto pt-5">
            <div className="flex flex-wrap gap-1">
              {resource.tags.filter(tag => !tag.startsWith("project:")).slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-md border-primary/25 text-xs text-foreground/80">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" /> {viewCount}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4" /> {score}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" aria-label="Like resource" title="Like" className="size-8 p-0 text-muted-foreground" onClick={() => onVote("like")}>
            <ThumbsUp className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" aria-label="Dislike resource" title="Dislike" className="size-8 p-0 text-muted-foreground" onClick={() => onVote("dislike")}>
            <ThumbsDown className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="flex-shrink-0 text-primary hover:text-primary" onClick={onView}>
            Source
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          {mediaNote(resource.id) && <a className="text-sm font-medium text-primary underline underline-offset-4" href={`/api/library/${resource.id}`} target="_blank" rel="noopener noreferrer">Reading notes</a>}
          {transcript?.status === 'available' && <a className="text-sm font-medium text-primary underline underline-offset-4" href={transcript.textUrl} target="_blank" rel="noopener noreferrer">Transcript (machine)</a>}
        </div>
      </CardFooter>
    </Card>
  )
}
