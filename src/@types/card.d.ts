declare module 'my-card-type' {
  export type CardProject = {
    'title': string,
    'description': string,
    'keyword': string,
    'type': string,

    'inactive'?: boolean,
    'live'?: string,
    'src'?: string,
  }

  export type CardsProps = {
    isActive: boolean,
    items: string[],
  }
  export type CardsProjectProps = {
    isActive: boolean,
    items: CardProject[],
  }
}
