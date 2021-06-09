import React from 'react'

import Markdown from 'src/content/utils/Markdown'
import CardsMarkdown from 'src/content/utils/CardsMarkdown'
import ContentWithTabs from 'src/content/utils/ContentWithTabs'

import * as data from './personalityData'

const storage = 'tab-index-about-personality'
const items = [
  {
    title: 'Overview',
    content: <CardsMarkdown mdArray={data.overview} />,
  },
  {
    title: 'Goal & Purpose',
    content: <CardsMarkdown mdArray={data.goal_purpose} />,
  },
  {
    title: 'Preferences',
    content: <CardsMarkdown mdArray={data.preferences} />,
  },
  {
    title: 'Opinion',
    content: <Markdown content={data.opinion} />,
  },
]

export default (): React.ReactElement => <ContentWithTabs items={items} storage={storage} />
