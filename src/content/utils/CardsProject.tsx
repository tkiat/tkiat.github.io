import React from 'react'
import { CardsProjectProps } from 'my-card-type'

// {item['image-src'] && <img className='cards-project__img' src={item['image-src']} alt="Broken :(" aria-label={'image for ' + item.title} />}
const CardsProject = ({ isActive, items }: CardsProjectProps): React.ReactElement => {
  return (
    <div className={'cards-project' + (isActive ? ' cards-project--active' : '')}>
      {items.map((item, i) => {
        return (
          <div>
            <div className={'cards-project__item' + (item.inactive ? ' cards-project__item--inactive' : '')} key={i}>
              <span className="cards-project__type">{item.type}</span>
              {item.inactive && <span className="cards-project__type cards-project__type--inactive">Inactive</span>}
              {item.src && (
                <span className="cards-project__type cards-project__type--source">
                  <a href={item.src} aria-label={'source code of ' + item.title}>
                    {' '}
                    Source
                  </a>
                </span>
              )}
              {item.live && (
                <span className="cards-project__type cards-project__type--live">
                  <a href={item.live} aria-label={'go to ' + item.title}>
                    Live
                  </a>
                </span>
              )}
              <span className="cards-project__description">
                <h3 className="cards-project__header">{item.title}</h3>
                {item.description && <span> - {item.description}</span>}
              </span>
            </div>
            {item.keyword.map((k) => {
              return <div className="cards-project__item cards-project__item--keyword">{k}</div>
            })}
          </div>
        )
      })}
    </div>
  )
}

export default CardsProject
