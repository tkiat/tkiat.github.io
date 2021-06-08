import React from 'react'

import Markdown from './Markdown'

type CardsProps = {
  items: string[]
}

const Cards = ({ items }: CardsProps): React.ReactElement => {
  return (
    <div className="cards">
      {items.map((item: string, i: number) => {
        return (
          <div className="cards__item" key={i}>
            <Markdown content={item} />
          </div>
        )
      })}
    </div>
  )
}

export default Cards
