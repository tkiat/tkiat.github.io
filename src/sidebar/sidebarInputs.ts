import { CustomColors, ThemeBase, ThemeSupplement, Time, WavePhysics } from 'my-theme-type'

type CustomColorsDuck = Pick<CustomColors, 'duck-beak' | 'duck-body' | 'duck-wing'>
const duckInputs: { type: keyof CustomColorsDuck; text: string }[] = [
  { type: 'duck-beak', text: 'Duck Beak' },
  { type: 'duck-body', text: 'Duck Body' },
  { type: 'duck-wing', text: 'Duck Wing' },
]

type CustomColorsTube = Pick<CustomColors, 'tube-stroke' | 'tube-water'>
const tubeInputs: { type: keyof CustomColorsTube; text: string }[] = [
  { type: 'tube-stroke', text: 'Tube' },
  { type: 'tube-water', text: 'Tube Water' },
]

type ThemeBaseInput = { base: ThemeBase; supplement: ThemeSupplement }
const themeBaseInputs: ThemeBaseInput[] = [
  { base: 'ocean', supplement: 'ocean' },
  { base: 'desert', supplement: 'desert' },
  { base: 'sakura', supplement: 'sakura' },
  { base: 'snow', supplement: 'snow' },
]
const timeInputs: { type: Time; id: string }[] = [
  { type: 'day', id: 'time-day' },
  { type: 'dark', id: 'time-dark' },
]
const waveColorInput = ['Front Wave', '2nd Wave', '3rd Wave']
const wavePhysicInputs: { name: keyof WavePhysics; min: number; max: number; step: number }[] = [
  { name: 'height', min: 0, max: 70, step: 10 },
  { name: 'speed', min: 0, max: 0.3, step: 0.05 },
  { name: 'shakiness', min: 0, max: 6, step: 1.5 },
]

export const inputs = {
  duck: duckInputs,
  'theme-base': themeBaseInputs,
  time: timeInputs,
  tube: tubeInputs,
  'wave-color': waveColorInput,
  'wave-physics': wavePhysicInputs,
}
