declare module 'ts-type-wave' {
  import { Coordinate } from 'ts-type-util'

  export type PointArguments = {
    index: number

    x: number
    y: number
  }
  export type Point = {
    oscillate: (h: number, sp: number, sh: number) => void
    x: number
    getY: () => number
  }

  export type WaveArguments = {
    index: number

    from: Coordinate
    to: Coordinate
    totalPoints: number
  }
  export type Wave = {
    points: Point[]
  }
}
