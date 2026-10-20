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
    highlights: [
      'Computer Science at Wellesley College, from Seattle, Washington',
      'Prev web engineering intern at the NBA, working on NBA.com and iOS WebViews',
      'CTO of Julienne Studios',
    ],
    position: 'bottom-left',
  },
  {
    name: 'Emily Hsu',
    role: 'CTO',
    highlights: [],
    position: 'right',
  },
]
