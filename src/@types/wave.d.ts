declare module 'my-wave-type' {
  export type Coordinate = {x: number, y: number}

  export type PointProps = {
    index: number,

    x: number,
    y: number,

    height: number,
    speed: number,
    shakiness: number,
  }
  export type WaveProps = {
    index: number,

    from: Coordinate
    to: Coordinate
    totalPoints: number

    height: number
    speed: number
    shakiness: number
  }
}
