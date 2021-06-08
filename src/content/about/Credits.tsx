import React from 'react'

import Cards from 'src/content/utils/Cards'
import Markdown from 'src/content/utils/Markdown'

import data from './creditsData'

export default (): React.ReactElement => (
  <Cards
    items={data.credits.map((x) => (
      <Markdown content={x} />
    ))}
  />
)
