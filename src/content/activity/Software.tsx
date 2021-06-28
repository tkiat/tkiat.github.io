import React from 'react'

import ListProject from 'src/content/utils/ListProject'
import Markdown from 'src/content/utils/Markdown'
import TabsContent from 'src/content/utils/TabsContent'

import * as data from './softwareData'

let index = 0

const storage = 'tab-index-activity-software'
const items = [
  {
    title: 'Web',
  },
  {
    title: 'Project',
    content: <ListProject items={data.webProject} />,
    index: index++,
  },
  {
    title: 'Experiment',
    content: <ListProject items={data.webExperiment} />,
    index: index++,
  },
  {
    title: 'PC',
  },
  {
    title: 'Project',
    content: <ListProject items={data.pcProject} />,
    index: index++,
  },
  {
    title: 'Utility',
    content: <ListProject items={data.pcUtility} />,
    index: index++,
  },
  {
    title: 'General',
    clickable: false,
  },
  {
    title: 'Pull Request',
    content: <Markdown content={data.pullRequest} />,
    index: index++,
  },
  {
    title: 'Learning',
    content: <Markdown content={data.learning} />,
    index: index++,
  },
]

export default (): React.ReactElement => <TabsContent items={items} storage={storage} />
