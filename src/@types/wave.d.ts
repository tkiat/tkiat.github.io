declare module 'my-wave-type' {
  export type Coordinate = {x: number, y: number}

  export type PointInputs = {
    index: number,

    x: number,
    y: number,

    height: number,
    speed: number,
    shakiness: number,
  }
  export type PointOutputs = {
    oscillate: () => void,
    x: number,
    getY: () => number,
  }

  export type WaveInputs = {
    index: number,

    from: Coordinate
    to: Coordinate
    totalPoints: number

    height: number
    speed: number
    shakiness: number
  }
  export type WaveOutputs = {
    points: PointOutputs[]
  }
}
