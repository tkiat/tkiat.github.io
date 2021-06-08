import React from 'react'

import MarkdownContent from 'src/content/utils/MarkdownContent'

const todo = `
I am planning to upload some of my gardening photos and simple vegan cooking recipes. I am no expert in these but they seem to give me the purpose of my existence.
`

// const storage = 'tab-index-hobby-environment'

const Environment = (): React.ReactElement => {
  return <MarkdownContent content={todo} />
}

export default Environment
