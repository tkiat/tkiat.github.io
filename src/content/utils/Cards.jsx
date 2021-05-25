import React from 'react'

import Markdown from './Markdown'

const Cards = props => {
  return (
    <div className={'cards' + (props.isActive ? ' cards--active' : '')}>
      {
        props.items.map((item, i) => {
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
