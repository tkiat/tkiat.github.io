import React from 'react'

import Cards from 'src/content/utils/Cards'
import Markdown from 'src/content/utils/Markdown'
import ContentWithTabs from 'src/content/utils/ContentWithTabs'

import data from './personalityData'

const storage = 'tab-index-about-personality'
const items = [
  {
    title: 'Overview',
    content: (
      <Cards
        items={data.overview.map((x) => (
          <Markdown content={x} />
        ))}
      />
    ),
  },
  {
    title: 'Goal & Purpose',
    content: (
      <Cards
        items={data.goal_purpose.map((x) => (
          <Markdown content={x} />
        ))}
      />
    ),
  },
  {
    title: 'Preferences',
    content: (
      <Cards
        items={data.preferences.map((x) => (
          <Markdown content={x} />
        ))}
      />
    ),
  },
  {
    title: 'Opinion',
    content: <Markdown content={data.opinion} />,
  },
]

export default (): React.ReactElement => <ContentWithTabs items={items} storage={storage} />
