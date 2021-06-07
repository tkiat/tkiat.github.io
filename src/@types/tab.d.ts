declare module 'my-tab-type' {
  // import { Updater } from 'use-immer'

  export type TabsProps = {
    storage: string
    // onclick: (index: number) => void
    // setCur: Updater<number>

    titles: string[]
    contents: React.ReactElement[]
  }
}
