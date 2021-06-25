import React from 'react'

import ListProject from 'src/content/utils/ListProject'
import Markdown from 'src/content/utils/Markdown'
import TabsContent from 'src/content/utils/TabsContent'

import * as data from './softwareData'

const storage = 'tab-index-hobby-web'
const items = [
  {
    title: 'Web',
    clickable: false,
  },
  {
    title: 'Project',
    content: <ListProject items={data.webProject} />,
  },
  {
    title: 'Experiment',
    content: <ListProject items={data.webExperiment} />,
  },
  {
    title: 'PC',
    clickable: false,
  },
  {
    title: 'Project',
    content: <ListProject items={data.pcProject} />,
  },
  {
    title: 'Utility',
    content: <ListProject items={data.pcUtility} />,
  },
  {
    title: 'General',
    clickable: false,
  },
  {
    title: 'Pull Request',
    content: <Markdown content={data.pullRequest} />,
  },
  {
    title: 'Learning',
    content: <Markdown content={data.learning} />,
  },
]

export default (): React.ReactElement => <TabsContent items={items} storage={storage} />
