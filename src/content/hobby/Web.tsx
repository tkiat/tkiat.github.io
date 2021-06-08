import React from 'react'

import CardsProject from 'src/content/utils/CardsProject'
import Markdown from 'src/content/utils/Markdown'
import ContentWithTabs from 'src/content/utils/ContentWithTabs'

import data from './webData'

const storage = 'tab-index-hobby-web'
const items = [
  {
    title: 'Work',
    content: <CardsProject items={data.work} />,
  },
  {
    title: 'Trivial',
    content: <CardsProject items={data.trivial} />,
  },
  {
    title: 'Pull Request',
    content: <Markdown content={data.pullRequest} />,
  },
]

export default (): React.ReactElement => <ContentWithTabs items={items} storage={storage} />
