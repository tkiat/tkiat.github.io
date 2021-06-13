declare module 'ts-type-nav' {
  import { Updater } from 'use-immer'

  export type UrlMain = {
    [k in NavMainIndex]: string
  }
  export type UrlSub = {
    [k in NavMainIndexSub]: string[]
  }
  export type Url = Immutable<{ main: UrlMain; sub: UrlSub }>

  export type NavMainIndex = 0 | 1 | 2

  export type NavMainProps = {
    navMainIndexRef: React.MutableRefObject<NavMainIndex>
    rerender: () => void
    navMainItems: { [k in NavMainIndex]: string }
  }
  export type NavMainItemContentProps = {
    href: string
    isActive: boolean
    left: string
    onclick: () => void
    shape: 'DuckAbout' | 'DuckHobby' | 'DuckResume'
    text: string
  }
  export type NavMainItemSidebarProps = {
    left: string
    shape: 'DuckSidebar'
    text: string
  }

  type NavMainIndexSub = Extract<NavMainIndex, 0 | 1>
  export type NavSubIndexes = { [k in NavMainIndexSub]: number }

  type NavSubSharedProps = {
    navMainIndex: NavMainIndexSub
    navMainItem: string
    navSubItems: readonly string[]
    setNavSubIndexes: Updater<NavSubIndexes>
  }
  export type NavSubProps = NavSubSharedProps & {
    keyOffsets: number[]
    navSubIndex: number
  }
  export type NavSubGenericProps = NavSubSharedProps & {
    navSubIndex: number
  }
  export type NavSubTubeProps = NavSubSharedProps & {
    keyOffset: number
    navSubIndex: number
  }

  export type flowDirection = 'left' | 'right'
  export type flowMode = 'drain' | 'pass' | 'stuck'
}
