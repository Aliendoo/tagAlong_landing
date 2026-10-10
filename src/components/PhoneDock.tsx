const items = [
  { chapter: 1, label: 'Find dates', path: 'M7 3v4m10-4v4M4 10h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1ZM8 14h2m4 0h2m-8 3h2' },
  { chapter: 2, label: 'Vote', path: 'm7 4 12 2-2 15-12-2L7 4Zm2 8 2 3 5-5M4 5 2 17l2 1' },
  { chapter: 3, label: 'Your trip', path: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' },
]

export function PhoneDock({ active, onSelect }: { active: number; onSelect: (chapter: number) => void }) {
  return (
    <nav className="phone-dock" aria-label="Explore the app">
      {items.map(item => <button type="button" key={item.chapter} onClick={() => onSelect(item.chapter)} aria-current={Math.max(1, active) === item.chapter ? 'step' : undefined}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.path} /></svg>
        <span>{item.label}</span>
      </button>)}
    </nav>
  )
}
