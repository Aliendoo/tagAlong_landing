export type Step = {
  number: string
  title: string
  description: string
  color: 'pink' | 'orange' | 'ink'
}

export const howItWorks: Step[] = [
  {
    number: '01',
    title: 'Save your spots',
    description: 'Turn the reels you’ve saved into places for your next trip.',
    color: 'pink',
  },
  {
    number: '02',
    title: 'Vote together',
    description: 'A Yes, Maybe, or No turns everyone’s favorites into a shared shortlist.',
    color: 'orange',
  },
  {
    number: '03',
    title: 'Find dates that fit',
    description: 'Match everyone’s availability and turn the shortlist into a trip.',
    color: 'ink',
  },
]
