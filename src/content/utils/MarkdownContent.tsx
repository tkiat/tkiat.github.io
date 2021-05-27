import React          from 'react'

import Markdown from './Markdown'

type MarkdownContentProps = {
  content: string,
  isActive: boolean,
}

const MarkdownContent = ({content, isActive}: MarkdownContentProps): React.ReactElement => {
  return (
  <div className={'markdown-content' + (isActive ? ' markdown-content--active' : '')}>
    <Markdown content={content} />
  </div>
  )
}

export default MarkdownContent
