export const directions = [
  { id: 'daydream', number: '01', name: 'Daydream', description: 'A centered headline and one big phone, surrounded by the conversations that turn into a trip.', detail: 'Selected direction · One scrolling phone · Floating group chat' },
  { id: 'duet', number: '02', name: 'Duet', description: 'A confident centered headline, followed by a side-by-side product story.', detail: 'Split story · Paired phones · Quiet gradients' },
  { id: 'postcards', number: '03', name: 'Postcards', description: 'An oversized travel scrapbook with overlapping cards and a warm, framed phone stage.', detail: 'Layered cards · Angled phones · Bolder color' },
] as const
export type Direction = typeof directions[number]['id']
export const pageUrl = (query: string) => `${import.meta.env.BASE_URL}${query}`
