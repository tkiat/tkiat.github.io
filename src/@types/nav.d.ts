declare module 'my-nav-type' {
  import {Updater} from 'use-immer'

  export type navIndexsType = {
    [level: number]: number
  }

  type NavbarBaseProps = {
    baseURL: string,
    items: string[],
    level: number,
    navIndex: number,
    setNavIndexs: Updater<navIndexsType>
  }

  export type NavbarProps = NavbarBaseProps & {
    keyOffsets: number[],
  }
  export type NavbarGenericProps = NavbarBaseProps
  export type NavbarTubeProps = NavbarBaseProps & {
    keyOffset: number,
  }

  export type NavbarContentProps = {
    cur: number,
    items: string[],
    setCur: Updater<number>,
    storage: string,
  }
}
