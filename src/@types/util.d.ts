declare module 'my-util-type' {
  export type Coordinate = { x: number; y: number }
  export type Line = { from: Coordinate; to: Coordinate }

  export type Dimension = { height: number; width: number }

  export type Even = 0

  type ERROR = 1
  type SUCCESS = 0
  export type Status = ERROR | SUCCESS
}
