export function transcriptTime(seconds: number) {
  const whole = Math.floor(seconds)
  return [Math.floor(whole / 3600), Math.floor(whole / 60) % 60, whole % 60].map(value => String(value).padStart(2, "0")).join(":")
}

// Join short caption lines for reading; retain the original first-segment anchor.
export function transcriptPassages(segments: { start: number; end: number; text: string }[]) {
  const passages: { start: number; end: number; text: string; index: number }[] = []
  segments.forEach((segment, index) => {
    const previous = passages.at(-1)
    if (previous && segment.start - previous.end <= 5 && segment.end - previous.start <= 45 && previous.text.length + segment.text.length < 700) {
      previous.text += " " + segment.text.trim()
      previous.end = segment.end
    } else passages.push({ ...segment, text: segment.text.trim(), index })
  })
  return passages
}
