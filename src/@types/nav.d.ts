declare module 'my-nav-type' {
  import {Updater} from 'use-immer'

  type NavSubSharedProps = {
    baseURL: string,
    items: string[],
    level: number,
    navIndex: number,
    setNavIndexs: Updater<NavIndexsType>
  }

  export type NavIndexsType = {
    [level: number]: number
  }

  export type NavMainProps = {
    currentIndex: number,
    onclick: () => void,
    urlAtIndex: string[]
  }
  export type NavMainItemContentProps = {
    index: number,
    onclick: () => void,
    text: string,

    href: string,
    isActive: boolean,
    shape: NavMainItemContentShapes,
  }
  export type NavMainItemContentShapes = 'DuckAbout' | 'DuckHobby' | 'DuckResume'
  export type NavMainItemSidebarProps = {
    index: number,
    shape: NavMainItemSidebarShape,
    text: string,
  }
  export type NavMainItemSidebarShape = 'DuckSidebar'

  export type NavSubProps = NavSubSharedProps & {
    keyOffsets: number[],
  }
  export type NavSubGenericProps = NavSubSharedProps
  export type NavSubTubeProps = NavSubSharedProps & {
    keyOffset: number,
  }

  export type NavbarContentProps = {
    cur: number,
    items: string[],
    setCur: Updater<number>,
    storage: string,
  }

}
