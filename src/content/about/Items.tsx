import React from 'react'

import Markdown from 'src/content/utils/Markdown'
import CardsMarkdown from 'src/content/utils/CardsMarkdown'
import TabsContent from 'src/content/utils/TabsContent'

import * as data from './itemData'

const storage = 'tab-index-about-items'
const items = [
  {
    title: 'Intro',
    content: <Markdown content={data.intro} />,
    index: 0,
  },
  {
    title: 'Physical',
  },
  {
    title: 'Gadgets',
    content: <CardsMarkdown mdArray={data.gadgets} />,
    index: 1,
  },
  {
    title: 'Hygiene',
    content: <Markdown content={data.hygiene} />,
    index: 2,
  },
  // TODO
  {
    title: 'Tools',
    content: <Markdown content={data.hygiene} />,
    index: 3,
  },
  {
    title: 'Cloths',
    content: <Markdown content={data.hygiene} />,
    index: 4,
  },
  {
    title: 'Kitchenware',
    content: <Markdown content={data.hygiene} />,
    index: 5,
  },
  {
    title: 'Nonphysical',
    clickable: false,
  },
  {
    title: 'Software',
    content: <CardsMarkdown mdArray={data.software} />,
    index: 6,
  },
  {
    title: 'Media',
    content: <CardsMarkdown mdArray={data.software} />,
    index: 7,
  },
]

export default (): React.ReactElement => <TabsContent items={items} storage={storage} />
