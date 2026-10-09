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
    highlights: [
      'CS + Music at Wellesley College, from Auckland, New Zealand',
      'Prev software engineering intern at Meta',
      "Won the technical prize at Dandilyonn's AI agent program for a multi-agent learning platform",
    ],
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
    highlights: [
      'Computer Science at Wellesley College, from Queens, NYC',
      'Prev SWE intern at Kenvue, building a full-stack app that cut an R&D review process from hours to under 10 seconds',
      'Built Tabbybara, a group bill-splitting app with receipt scanning',
    ],
    position: 'right',
  },
]
