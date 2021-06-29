import React from 'react'

import ListProject from 'src/content/utils/ListProject'
import Markdown from 'src/content/utils/Markdown'
import TabsContent from 'src/content/utils/TabsContent'

import webProject from './data-software/web-experiment.json'
import webExperiment from './data-software/web-project.json'
import pcProject from './data-software/pc-project.json'
import pcUtility from './data-software/pc-utility.json'
import { learning } from './data-software/learning'
import { pullRequest } from './data-software/pullrequest'

let index = 0

const storage = 'tab-index-activity-software'
const items = [
  {
    title: 'Web',
  },
  {
    title: 'Project',
    content: <ListProject items={webProject} />,
    index: index++,
  },
  {
    title: 'Experiment',
    content: <ListProject items={webExperiment} />,
    index: index++,
  },
  {
    title: 'PC',
  },
  {
    title: 'Project',
    content: <ListProject items={pcProject} />,
    index: index++,
  },
  {
    title: 'Utility',
    content: <ListProject items={pcUtility} />,
    index: index++,
  },
  {
    title: 'General',
    clickable: false,
  },
  {
    title: 'Pull Request',
    content: <Markdown content={pullRequest} />,
    index: index++,
  },
  {
    title: 'Learning',
    content: <Markdown content={learning} />,
    index: index++,
  },
]

export default (): React.ReactElement => <TabsContent items={items} storage={storage} />
