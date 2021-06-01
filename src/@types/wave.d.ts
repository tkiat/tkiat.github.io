declare module 'my-wave-type' {
  export type Coordinate = {x: number, y: number}

  export type PointArguments = {
    index: number,

    x: number,
    y: number,

    height: number,
    speed: number,
    shakiness: number,
  }
  export type PointReturn = {
    oscillate: () => void,
    x: number,
    getY: () => number,
  }

  export type WaveArguments = {
    index: number,

    from: Coordinate
    to: Coordinate
    totalPoints: number

    height: number
    speed: number
    shakiness: number
  }
  export type WaveReturn = {
    points: PointReturn[]
  }
}
