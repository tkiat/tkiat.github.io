declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

declare type Immutable<T> = {
  readonly [K in keyof T]: Immutable<T[K]>
}
