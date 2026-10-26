export type FounderPosition = 'top-left' | 'bottom-left' | 'right'

export type Founder = {
  name: string
  role: string
  highlights: string[]
  position: FounderPosition
}

export const founders: Founder[] = [
  {
    name: 'Aileen Du',
    role: 'CEO',
    highlights: [],
    position: 'top-left',
  },
  {
    name: 'Lilymoon Whalen',
    role: 'CPO',
    highlights: [],
    position: 'bottom-left',
  },
  {
    name: 'Emily Hsu',
    role: 'CTO',
    highlights: [],
    position: 'right',
  },
]
