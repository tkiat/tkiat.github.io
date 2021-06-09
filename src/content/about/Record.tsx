import React from 'react'

import Markdown from 'src/content/utils/Markdown'
import CardsMarkdown from 'src/content/utils/CardsMarkdown'
import ContentWithTabs from 'src/content/utils/ContentWithTabs'

import * as data from './recordData'

const storage = 'tab-index-about-record'
const items = [
  {
    title: 'Gadgets',
    content: <CardsMarkdown mdArray={data.gadgets} />,
  },
  {
    title: 'Software',
    content: <CardsMarkdown mdArray={data.software} />,
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
