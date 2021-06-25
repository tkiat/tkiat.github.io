import React from 'react'

import ListProject from 'src/content/utils/ListProject'
import Markdown from 'src/content/utils/Markdown'
import TabsContent from 'src/content/utils/TabsContent'

import * as data from './pcData'

const storage = 'tab-index-hobby-pc'
const items = [
  {
    title: 'Work',
    content: <ListProject items={data.work} />,
  },
  {
    title: 'Utility',
    content: <ListProject items={data.utility} />,
  },
  {
    title: 'Pull Request',
    content: <Markdown content={data.pullRequest} />,
  },
]

export default (): React.ReactElement => <TabsContent items={items} storage={storage} />
