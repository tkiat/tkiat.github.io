declare module 'my-nav-type' {
  import {Updater} from 'use-immer'

  type NavbarSharedProps = {
    baseURL: string,
    items: string[],
    level: number,
    navIndex: number,
    setNavIndexs: Updater<NavIndexsType>
  }

  export type NavIndexsType = {
    [level: number]: number
  }

  export type NavbarProps = NavbarSharedProps & {
    keyOffsets: number[],
  }
  export type NavbarGenericProps = NavbarSharedProps
  export type NavbarTubeProps = NavbarSharedProps & {
    keyOffset: number,
  }

  export type NavbarContentProps = {
    cur: number,
    items: string[],
    setCur: Updater<number>,
    storage: string,
  }
}
