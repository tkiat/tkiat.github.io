import {DuckColors} from 'my-duck-type'
import {ThemeBase, ThemeSupplement} from 'my-theme-type'
import {Time} from 'my-time-type'
import {TubesColors} from 'my-tube-type'
import {WavesPhysics} from 'my-wave-config-type'

const duckInputs: ({'type': (keyof DuckColors), 'text': string})[] = [
  {'type': 'body', 'text': 'Duck Body'},
  {'type': 'wing',  'text': 'Duck Wing'},
  {'type': 'beak', 'text': 'Duck Beak'}]
const themeBaseInputs: ({'base': ThemeBase, 'supplement': ThemeSupplement})[] = [
  {base: 'ocean', supplement: 'ocean'},
  {base: 'desert', supplement: 'desert'},
  {base: 'sakura', supplement: 'sakura'},
  {base: 'snow', supplement: 'snow'},]
const timeInputs: ({'type': Time, 'id': string})[] = [
  {'type': 'day',  'id': 'time-day'},
  {'type': 'dark', 'id': 'time-dark'}]
const tubeInputs: ({'type': (keyof TubesColors), 'text': string})[] = [
  {'type': 'stroke', 'text': 'Tube'},
  {'type': 'water',  'text': 'Tube Water'}]
const waveColorInput = ['Front Wave', '2nd Wave', '3rd Wave']
const wavePhysicInputs: ({'name': (keyof WavesPhysics), 'min': number, 'max': number, 'step': number})[] = [
  {name: 'height',    min: 0, max: 70,  step: 10},
  {name: 'speed',     min: 0, max: 0.3, step: 0.05},
  {name: 'shakiness', min: 0, max: 6,   step: 1.5}]

export const inputs = {
  'duck': duckInputs,
  'theme-base': themeBaseInputs,
  'time': timeInputs,
  'tube': tubeInputs,
  'wave-color': waveColorInput,
  'wave-physics': wavePhysicInputs,
}
