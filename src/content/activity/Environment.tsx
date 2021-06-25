import React from 'react'

import Markdown from 'src/content/utils/Markdown'

export default (): React.ReactElement => <Markdown content={todo} />

const todo = `
I am planning to upload some of my gardening photos and simple vegan cooking recipes. I am no expert in these but they seem to give me the purpose of my existence.
`
// const storage = 'tab-index-hobby-environment'
