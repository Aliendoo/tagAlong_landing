type Cue = readonly [progress: number, seconds: number]
export type PhoneFrame = { source: 'calendar' | 'swipes'; index: number }
export type PhoneSequence = { id: 'calendar' | 'swipes' | 'journey'; count: number; fps: number; stillFrame: number; label: string; cues: readonly Cue[]; frames?: readonly PhoneFrame[] }
export const calendarSequence: PhoneSequence = {
  id: 'calendar', count: 120, fps: 12, stillFrame: 108,
  label: 'Choose your availability, match October 27–29, and create your shared trip.',
  cues: [[0, 0], [.12, 0], [.32, 2.65], [.42, 2.65], [.48, 3.95], [.62, 5.3], [.74, 5.3], [.89, 8.2], [1, 8.2]],
}
export const swipeSequence: PhoneSequence = {
  id: 'swipes', count: 66, fps: 12, stillFrame: 59,
  label: 'Vote Yes on Daikanyama, No on Mount Currie, and Yes on Trevi Fountain.',
  cues: [[0, 0], [.25, 0], [.40, 1.18], [.46, 1.18], [.59, 2.6], [.65, 2.6], [.80, 3.98], [.89, 4.7], [1, 4.7]],
}
const range = (source: PhoneFrame['source'], first: number, last: number): PhoneFrame[] =>
  Array.from({ length: last - first + 1 }, (_, offset) => ({ source, index: first + offset }))

// One fixed phone: availability, matching, voting, then the shared trip.
// Referencing the existing frames keeps the two approved videos intact.
export const journeySequence: PhoneSequence = {
  id: 'journey', count: 157, fps: 12, stillFrame: 135,
  label: 'Choose your availability, match October 27–29, vote No, Maybe, or Yes on places, and open your shared trip.',
  frames: [...range('calendar', 0, 64), ...range('swipes', 0, 56), ...range('calendar', 85, 119)],
  cues: [[0, 0], [.10, 0], [.28, 2.65], [.34, 2.65], [.45, 5.3], [.50, 5.3], [.52, 65 / 12], [.73, 121 / 12], [.79, 121 / 12], [.81, 122 / 12], [.90, 135 / 12], [1, 135 / 12]],
}
export function sourceFrame(sequence: PhoneSequence, index: number): PhoneFrame {
  return sequence.frames?.[index] ?? { source: sequence.id === 'swipes' ? 'swipes' : 'calendar', index }
}
/** Repeated times hold a frame while the reader continues scrolling. */
export function frameAtProgress(sequence: PhoneSequence, progress: number) {
  const value = Math.max(0, Math.min(1, progress))
  for (let i = 1; i < sequence.cues.length; i++) {
    const [end, to] = sequence.cues[i]
    const [start, from] = sequence.cues[i - 1]
    if (value <= end) {
      const seconds = from + (to - from) * ((value - start) / (end - start))
      return Math.max(0, Math.min(sequence.count - 1, Math.round(seconds * sequence.fps)))
    }
  }
  return sequence.count - 1
}
