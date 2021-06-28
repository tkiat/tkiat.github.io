import React from 'react'

import Markdown from 'src/content/utils/Markdown'
import TabsContent from 'src/content/utils/TabsContent'

import * as data from './generalData'

let index = 0
const storage = 'tab-index-activity-general'
const items = [
  {
    title: 'Reading',
    content: <Markdown content={data.reading} />,
    index: index++,
  },
  {
    title: 'Content',
    content: <Markdown content={data.content} />,
    index: index++,
  },
  {
    title: 'Courses',
    content: <Markdown content={data.courses} />,
    index: index++,
  },
  {
    title: 'Archive',
    content: <Markdown content={data.archive} />,
    index: index++,
  },
]

export default (): React.ReactElement => <TabsContent items={items} storage={storage} />
