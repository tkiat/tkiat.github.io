declare module 'my-card-type' {
  export type CardProject = {
    'title': string,
    'description': string,
    'keyword': string,

    'image-src'?: string,
    'inactive'?: string,
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
