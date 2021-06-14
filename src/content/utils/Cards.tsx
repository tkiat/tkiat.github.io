import React from 'react'

type Props = {
  items: React.ReactElement[]
}
export default ({ items }: Props): React.ReactElement => (
  <div className="cards">
    {items.map((item, i) => (
      <div key={i} className="cards__item">
        {item}
      </div>
    ))}
  </div>
)
