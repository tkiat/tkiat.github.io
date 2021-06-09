import React from 'react'

import ListProject from 'src/content/utils/ListProject'
import Markdown from 'src/content/utils/Markdown'
import TabsContent from 'src/content/utils/TabsContent'

import * as data from './webData'

const storage = 'tab-index-hobby-web'
const items = [
  {
    title: 'Work',
    content: <ListProject items={data.work} />,
  },
  {
    title: 'Trivial',
    content: <ListProject items={data.trivial} />,
  },
  {
    title: 'Pull Request',
    content: <Markdown content={data.pullRequest} />,
  },
]

export default (): React.ReactElement => <TabsContent items={items} storage={storage} />
