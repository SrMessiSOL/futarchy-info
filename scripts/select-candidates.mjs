export function selectCandidates(candidates, week, limit = 15) {
  const groups = new Map();
  for (const candidate of candidates) {
    if (!groups.has(candidate.sourceId)) groups.set(candidate.sourceId, []);
    groups.get(candidate.sourceId).push(candidate);
  }
  const queues = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, items]) => {
    items.sort((a,b) => a.discoveredAt.localeCompare(b.discoveredAt) || a.url.localeCompare(b.url));
    const offset = week % items.length;
    return [...items.slice(offset), ...items.slice(0, offset)];
  });
  if (!queues.length) return [];
  const start = week % queues.length;
  const ordered = [...queues.slice(start), ...queues.slice(0,start)];
  const result = [];
  while (result.length < limit && ordered.some(q=>q.length)) {
    for (const queue of ordered) {
      if (queue.length) result.push(queue.shift());
      if (result.length === limit) break;
    }
  }
  return result;
}
