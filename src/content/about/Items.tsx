import React from 'react'

import Markdown from 'src/content/utils/Markdown'
import CardsMarkdown from 'src/content/utils/CardsMarkdown'
import TabsContent from 'src/content/utils/TabsContent'

import * as data from './itemData'

const storage = 'tab-index-about-record'
const items = [
  {
    title: 'Intro',
    content: <Markdown content={data.intro} />,
  },
  {
    title: 'Physical',
    clickable: false,
  },
  {
    title: 'Gadgets',
    content: <CardsMarkdown mdArray={data.gadgets} />,
  },
  {
    title: 'Hygiene',
    content: <Markdown content={data.hygiene} />,
  },
  // TODO
  {
    title: 'Tools',
    content: <Markdown content={data.hygiene} />,
  },
  {
    title: 'Cloths',
    content: <Markdown content={data.hygiene} />,
  },
  {
    title: 'Kitchenware',
    content: <Markdown content={data.hygiene} />,
  },
  {
    title: 'Nonphysical',
    clickable: false,
  },
  {
    title: 'Software',
    content: <CardsMarkdown mdArray={data.software} />,
  },
  {
    title: 'Media',
    content: <CardsMarkdown mdArray={data.software} />,
  },
]

export default (): React.ReactElement => <TabsContent items={items} storage={storage} />
