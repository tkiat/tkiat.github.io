import React from 'react'

import Markdown from 'src/content/utils/Markdown'
import TabsContent from 'src/content/utils/TabsContent'

import * as data from './othersData'

const storage = 'tab-index-hobby-others'
const items = [
  {
    title: 'Content',
    content: <Markdown content={data.content} />,
  },
  {
    title: 'Courses',
    content: <Markdown content={data.courses} />,
  },
  {
    title: 'Others',
    content: <Markdown content={data.others} />,
  },
  {
    title: 'Archive',
    content: <Markdown content={data.archive} />,
  },
]

export default (): React.ReactElement => <TabsContent items={items} storage={storage} />