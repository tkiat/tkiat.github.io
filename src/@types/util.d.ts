declare module 'ts-type-util' {
  export type Even = 0

  export type Coordinate = { x: number; y: number }
  export type Dimension = { h: number; w: number }
  export type Line = { from: Coordinate; to: Coordinate }

  type ERROR = 1
  type SUCCESS = 0
  export type Status = Immutable<ERROR | SUCCESS>
}
