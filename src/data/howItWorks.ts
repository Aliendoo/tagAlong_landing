export type Step = {
  number: string
  title: string
  description: string
  color: 'pink' | 'orange' | 'ink'
}

export const howItWorks: Step[] = [
  {
    number: '01',
    title: 'Location Extraction',
    description: 'Automated extraction of location in short-form videos.',
    color: 'pink',
  },
  {
    number: '02',
    title: 'Centralized Planning',
    description: 'Everything you need to plan, in one place.',
    color: 'orange',
  },
  {
    number: '03',
    title: 'Plan With Friends',
    description: 'Sync schedules, pick spots, and get an itinerary built for everyone.',
    color: 'ink',
  },
]
