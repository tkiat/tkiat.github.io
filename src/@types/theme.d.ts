declare module 'my-theme-type' {
  import { Coordinate } from 'my-util-type'

  export type CustomColors = {
    'duck-beak': string
    'duck-body': string
    'duck-wing': string
    'tube-stroke': string
    'tube-water': string
    'wave-front0': string
    'wave-front1': string
    'wave-front2': string
  }

  export type Base = 'ocean' | 'desert' | 'sakura' | 'snow'
  export type Supplement = Base | 'custom'
  export type Props = {
    base: Base
    supplement: Supplement
    'custom-base': Base
  }

  export type Time = 'day' | 'dark'

  export type WaveConfigs = {
    num: number

    from: Coordinate
    to: Coordinate
    totalPoints: number
  }

  export type WaveColors = string[]

  export type WavePhysics = {
    height: number
    speed: number
    shakiness: number
  }
}
