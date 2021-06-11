declare module 'ts-type-nav' {
  import { Updater } from 'use-immer'

  export type NavMainIndex = 0 | 1 | 2
  export type NavSubIndexes = { [k in Extract<NavMainIndex, 0 | 1>]: number } & { 2: null }

  export type NavContentProps = {
    cur: number
    items: string[]
    setCur: Updater<number>
    storage: string
  }

  export type NavMainProps = {
    navMainIndex: React.MutableRefObject<NavMainIndex>
    rerender: () => void
    urlAtIndex: { [k in NavMainIndex]: string }
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

  type NavSubSharedProps = {
    baseURL: string
    items: string[]
    setNavSubIndexes: Updater<NavSubIndexes>
  }
  export type NavSubProps = NavSubSharedProps & {
    keyOffsets: number[]
    navSubIndex: number | null
    navMainIndex: NavMainIndex
  }
  export type NavSubGenericProps = NavSubSharedProps & {
    navSubIndex: number
    navMainIndex: Extract<NavMainIndex, 0 | 1>
  }
  export type NavSubTubeProps = NavSubSharedProps & {
    keyOffset: number
    navSubIndex: number
    navMainIndex: Extract<NavMainIndex, 0 | 1>
  }

  export type flowDirection = 'left' | 'right'
  export type flowMode = 'drain' | 'pass' | 'stuck'
}
