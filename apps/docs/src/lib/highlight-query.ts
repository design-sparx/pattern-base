export interface HighlightSegment {
  text: string;
  match: boolean;
}

export function highlightQuery(
  text: string,
  query: string,
): HighlightSegment[] {
  const q = query.trim().toLowerCase();
  if (!q) return [{ text, match: false }];

  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return [{ text, match: false }];

  const segments: HighlightSegment[] = [];
  if (idx > 0) segments.push({ text: text.slice(0, idx), match: false });
  segments.push({ text: text.slice(idx, idx + q.length), match: true });
  const rest = text.slice(idx + q.length);
  if (rest.length > 0) segments.push({ text: rest, match: false });
  return segments;
}
