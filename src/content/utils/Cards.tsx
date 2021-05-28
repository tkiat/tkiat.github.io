import React from 'react'
import {CardsProps} from 'my-card-type'

import Markdown from './Markdown'

const Cards = ({isActive, items}: CardsProps): React.ReactElement => {
  return (
    <div className={'cards' + (isActive ? ' cards--active' : '')}>
      {
        items.map((item: string, i: number) => {
          return (
            <div className='cards__item' key={i}>
              <Markdown content={item} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Cards
