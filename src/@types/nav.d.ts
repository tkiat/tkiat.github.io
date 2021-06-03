declare module 'my-nav-type' {
  import { Updater } from 'use-immer'

  export type NavIndexsType = {
    0: number
    1: number
    2: null
  }

  export type Level = keyof NavIndexsType

  export type NavContentProps = {
    cur: number
    items: string[]
    setCur: Updater<number>
    storage: string
  }

  export type NavMainProps = {
    navMainIndex: Level
    onclick: () => void
    urlAtIndex: { [k in Level]: string }
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
    setNavSubIndexs: Updater<NavIndexsType>
  }
  export type NavSubProps = NavSubSharedProps & {
    keyOffsets: number[]
    navSubIndex: number | null
    navMainIndex: Level
  }
  export type NavSubGenericProps = NavSubSharedProps & {
    navSubIndex: number
    navMainIndex: Extract<Level, 0 | 1>
  }
  export type NavSubTubeProps = NavSubSharedProps & {
    keyOffset: number
    navSubIndex: number
    navMainIndex: Extract<Level, 0 | 1>
  }

  export type flowDirection = 'left' | 'right'
  export type flowMode = 'drain' | 'pass' | 'stuck'
}
