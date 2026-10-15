export interface TranscriptParts {
  openingPart?: {
    sourceUrl: string
    warning: string
    reviewBoundary: string
    qualityAudit: { untranscribedIntervals: { start: number; end: number; status: string }[] }
    segments: { start: number; end: number; text: string }[]
  }
  sourceParts?: {
    label: string
    offset: number
    durationSeconds: number
    audioSha256: string
  }[]
}
