import React from 'react'

import Markdown from 'src/content/utils/Markdown'
import Cards from 'src/content/utils/Cards'

const CardsMarkdown = ({ mdArray }: { mdArray: string[] }): React.ReactElement => {
  return (
    <Cards
      items={mdArray.map((x) => (
        <Markdown content={x} />
      ))}
    />
  )
}

export default CardsMarkdown
