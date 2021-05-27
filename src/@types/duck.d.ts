declare module 'my-duck-type' {
  export type DuckShape = 'DuckAboutMe' | 'DuckHobby' | 'DuckResume'

  type DuckBaseProps = {
    index: number,
    onclick: () => void,
    text: string,
  }
  export type DuckProps = DuckBaseProps & {
    href: string,
    isActive: boolean,
    shape: DuckShape,
  }
  export type DuckSidebarProps = DuckBaseProps & {
    myId: string,
  }
}
