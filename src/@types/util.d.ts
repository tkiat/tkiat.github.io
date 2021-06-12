declare module 'ts-type-util' {
  export type Coordinate = { x: number; y: number }
  export type Line = { from: Coordinate; to: Coordinate }

  export type Dimension = { h: number; w: number }

  export type Even = 0

  type ERROR = 1
  type SUCCESS = 0
  export type Status = Immutable<ERROR | SUCCESS>
}
