declare module 'my-tab-type' {
  import { Updater } from 'use-immer'

  export type TabsProps = {
    cur: number
    setCur: Updater<number>

    titles: string[]
    contents: React.ReactElement[]
  }
}
