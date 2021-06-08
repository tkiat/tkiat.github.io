import React from 'react'

import Cards from 'src/content/utils/Cards'
import Markdown from 'src/content/utils/Markdown'
import ContentWithTabs from 'src/content/utils/ContentWithTabs'

import data from './recordData'

const storage = 'tab-index-about-record'
const items = [
  {
    title: 'Gadgets',
    content: (
      <Cards
        items={data.gadgets.map((x) => (
          <Markdown content={x} />
        ))}
      />
    ),
  },
  {
    title: 'Software',
    content: (
      <Cards
        items={data.software.map((x) => (
          <Markdown content={x} />
        ))}
      />
    ),
  },
  {
    title: 'Hygiene',
    content: <Markdown content={data.hygiene} />,
  },
  {
    title: 'Drinks',
    content: <Markdown content={data.drinks} />,
  },
]

export default (): React.ReactElement => <ContentWithTabs items={items} storage={storage} />
