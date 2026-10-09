export type LookId = 'tangerine' | 'night-market' | 'postcard'

export type LookOption = {
  id: LookId
  name: string
  primary: string
  secondary: string
}

export const looks: LookOption[] = [
  { id: 'tangerine', name: 'Tangerine', primary: '#ff6b00', secondary: '#d6457f' },
  { id: 'night-market', name: 'Night Market', primary: '#151b29', secondary: '#d6457f' },
  { id: 'postcard', name: 'Postcard', primary: '#ffc979', secondary: '#ef6536' },
]