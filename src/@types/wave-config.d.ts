declare module 'my-wave-config-type' {
  import { Coordinate } from 'my-math-type'

  export type WavesColors = string[]
  export type WavesConfigs = WavesPhysics & {
    from: Coordinate
    to: Coordinate

    num: number
    totalPoints: number
  }
  export type WavesPhysics = {
    height: number
    speed: number
    shakiness: number
  }
}
