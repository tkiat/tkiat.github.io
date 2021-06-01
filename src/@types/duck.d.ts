declare module 'my-duck-type' {
  type DuckSharedProps = {
    index: number,
    onclick: () => void,
    text: string,
  }

  export type DuckColors = {
    beak: string,
    body: string,
    wing: string,
  }
  export type DuckShape = 'DuckAboutMe' | 'DuckHobby' | 'DuckResume'

  export type DuckProps = DuckSharedProps & {
    href: string,
    isActive: boolean,
    shape: DuckShape,
  }
  export type DuckSidebarProps = DuckSharedProps & {
    myId: string,
  }
}
