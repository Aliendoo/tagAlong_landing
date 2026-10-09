import { looks, type LookId } from '../data/themes'

type ThemePickerProps = {
  selectedLook: LookId
  onSelectLook: (look: LookId) => void
}

export function ThemePicker({ selectedLook, onSelectLook }: ThemePickerProps) {
  return (
    <nav className="theme-picker" aria-label="Preview page looks">
      <span className="theme-picker-label">PAGE LOOK</span>
      <div className="theme-options" role="group" aria-label="Choose a page look">
        {looks.map((look) => (
          <button
            aria-pressed={selectedLook === look.id}
            className="theme-option"
            key={look.id}
            onClick={() => onSelectLook(look.id)}
            type="button"
          >
            <span className="look-swatches" aria-hidden="true">
              <span style={{ backgroundColor: look.primary }} />
              <span style={{ backgroundColor: look.secondary }} />
            </span>
            {look.name}
          </button>
        ))}
      </div>
    </nav>
  )
}