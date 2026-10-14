export const mediaSeries = [
  { id: "radio", label: "Ownership Radio" },
  { id: "roadshow", label: "Ownership Roadshow" },
  { id: "report", label: "Ownership Report" },
  { id: "forum", label: "Ownership Forum" },
  { id: "founder", label: "Founder interview" },
] as const

export function resourceSeries(resource: { type: string; title: string; tags?: string[] }) {
  if (!["podcast", "video"].includes(resource.type)) return null
  for (const series of mediaSeries.filter(s => s.id !== "founder")) {
    if (new RegExp(`Ownership\\s+${series.id}\\b`, "i").test(resource.title)) return series.id
  }
  if (/Ownership.*(?:Podcast|S[12]\s*E\d)/i.test(resource.title) || resource.tags?.includes("Founder Interview")) return "founder"
  return null
}
