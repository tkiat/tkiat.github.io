import React from 'react'

import Markdown from 'src/content/utils/Markdown'
import CardsMarkdown from 'src/content/utils/CardsMarkdown'
import TabsContent from 'src/content/utils/TabsContent'

import * as data from './personalityData'

let index = 0

const storage = 'tab-index-about-personality'
const items = [
  {
    title: 'Overview',
    content: <CardsMarkdown mdArray={data.overview} />,
    index: index++,
  },
  {
    title: 'Goal & Purpose',
    content: <CardsMarkdown mdArray={data.goal_purpose} />,
    index: index++,
  },
  {
    title: 'Preferences',
    content: <CardsMarkdown mdArray={data.preferences} />,
    index: index++,
  },
  {
    title: 'Opinion',
    content: <Markdown content={data.opinion} />,
    index: index++,
  },
]

export default (): React.ReactElement => <TabsContent items={items} storage={storage} />
