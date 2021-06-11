import * as Theme from 'ts-type-theme'

type CustomColorsDuck = keyof Pick<Theme.CustomColors, 'duck-beak' | 'duck-body' | 'duck-wing'>
type CustomColorsTube = keyof Pick<Theme.CustomColors, 'tube-stroke' | 'tube-water'>

export const duck: { type: CustomColorsDuck; text: string }[] = [
  { type: 'duck-beak', text: 'Duck Beak' },
  { type: 'duck-body', text: 'Duck Body' },
  { type: 'duck-wing', text: 'Duck Wing' },
]
export const themeDefault: { base: Theme.Base; supplement: Theme.Supplement }[] = [
  { base: 'ocean', supplement: 'ocean' },
  { base: 'desert', supplement: 'desert' },
  { base: 'sakura', supplement: 'sakura' },
  { base: 'snow', supplement: 'snow' },
]
export const time: { type: Theme.Time; id: string }[] = [
  { type: 'day', id: 'time-day' },
  { type: 'dark', id: 'time-dark' },
]
export const tube: { type: CustomColorsTube; text: string }[] = [
  { type: 'tube-stroke', text: 'Tube' },
  { type: 'tube-water', text: 'Tube Water' },
]
export const waveColorTitle = ['Front Wave', '2nd Wave', '3rd Wave']
export const wavePhysic: { prop: keyof Theme.WavePhysics; min: number; max: number; step: number }[] = [
  { prop: 'height', min: 0, max: 70, step: 10 },
  { prop: 'speed', min: 0, max: 0.3, step: 0.05 },
  { prop: 'shakiness', min: 0, max: 6, step: 1.5 },
]
