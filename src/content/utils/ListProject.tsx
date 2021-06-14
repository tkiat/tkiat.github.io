import React from 'react'

type Project = {
  title: string
  description: string
  keyword: string[]
  type: string

  inactive?: boolean
  live?: string
  src?: string
}
type Props = {
  items: Project[]
}
export default ({ items }: Props): React.ReactElement => (
  <div className="cards-projects">
    {items.map((item, i) => (
      <div className="cards-project" key={i}>
        <div className="cards-project__item cards-project__item--type">{item.type}</div>
        <div
          className={
            'cards-project__item cards-project__item--description' +
            (item.inactive ? ' cards-project__item--description-inactive' : '')
          }>
          <h3>{item.title}</h3>
          {item.description && <span> - {item.description}</span>}
        </div>
        {item.src && (
          <div className="cards-project__item cards-project__item--link">
            <a href={item.src} aria-label={'source code of ' + item.title}>
              Source
            </a>
          </div>
        )}

        {item.live && (
          <div className="cards-project__item cards-project__item--link">
            <a href={item.live} aria-label={'go to ' + item.title}>
              Live
            </a>
          </div>
        )}

        {item.keyword.map((k, i) => (
          <div key={i} className="cards-project__item cards-project__item--keyword">
            {k}
          </div>
        ))}
      </div>
    ))}
  </div>
)
