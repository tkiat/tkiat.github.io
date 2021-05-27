declare module 'my-wave-config-type' {
  import {Coordinate} from 'my-wave-type'

  export type WavesColors = string[]
  export type WavesConfigs = WavesPhysics & {
    'from': Coordinate,
    'to': Coordinate,
    'totalPoints': number,
    'num': number,
  }
  export type WavesPhysics = {
    'height': number,
    'speed': number,
    'shakiness': number,
  }
}
