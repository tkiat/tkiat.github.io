declare module 'ts-type-nav' {
  export type NavMainIndex = 0 | 1 | 2
  export type NavMainItemContentShape = 'DuckAbout' | 'DuckHobby' | 'DuckResume'
  export type NavMainItemSidebarShape = 'DuckSidebar'

  type NavMainIndexSub = Extract<NavMainIndex, 0 | 1>
  export type NavSubIndexes = { [k in NavMainIndexSub]: number }

  export type FlowDirection = 'left' | 'right'
  export type FlowMode = 'drain' | 'pass' | 'stuck'

  export type UrlMain = {
    [k in NavMainIndex]: string
  }
  export type UrlSub = {
    [k in NavMainIndexSub]: string[]
  }
  export type Url = Immutable<{ main: UrlMain; sub: UrlSub }>
}
