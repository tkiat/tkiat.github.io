import React from 'react'

type CardsProps = {
  items: React.ReactElement[]
}

const Cards = ({ items }: CardsProps): React.ReactElement => {
  return (
    <div className="cards">
      {items.map((item, i) => {
        return (
          <div className="cards__item" key={i}>
            {item}
          </div>
        )
      })}
    </div>
  )
}

export default Cards
