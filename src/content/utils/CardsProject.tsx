import React from 'react'
import {CardProject, CardsProjectProps} from 'my-card-type'

const CardsProject = ({isActive, items}: CardsProjectProps): React.ReactElement => {
  return (
    <div className={'cards-project' + (isActive ? ' cards-project--active' : '')}>
      {
        items.map((item: CardProject, i: number) => {
          return (
            <div className={'cards-project__item' + (item.inactive ? ' cards-project__item--inactive' : '')} key={i}>
            {/*{item['image-src'] && <img className='cards-project__img' src={item['image-src']} alt="Broken :(" aria-label={'image for ' + item.title} />}*/}
              <span className='cards-project__type'>{item.type}</span>
              {item.inactive && <span className='cards-project__type cards-project__type--inactive'>
                Inactive
              </span>
              }
              {item.src &&
                <span className='cards-project__type cards-project__type--source'>
                   <a href={item.src} aria-label={'source code of ' + item.title}> Source</a>
                </span>
              }
              {item.live &&
                <span className='cards-project__type cards-project__type--live'>
                  <a href={item.live} aria-label={'go to ' + item.title}>Live</a>
                </span>
              }
              <span className='cards-project__description'>
                <h3 className='cards-project__header'>{item.title} &gt; </h3>
                {item.description}
                <h5 className='cards-project__header'> &gt; {item.keyword}</h5>
              </span>
            {/*{item.keyword && <div className='cards-project__keyword'><strong> - Keyword: </strong>{item.keyword}</div>}*/}
            </div>
          )
        })
      }
    </div>
  )
}

export default CardsProject
