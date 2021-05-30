import React  from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

type MarkdownContentProps = {
  content: string,
  isActive: boolean,
}

const MarkdownContent = ({content, isActive}: MarkdownContentProps): React.ReactElement => {
  return (
  <div className={'markdown-content' + (isActive ? ' markdown-content--active' : '')}>
    <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked(content), {USE_PROFILES: {html: true}}),}}></div>
  </div>
  )
}

export default MarkdownContent
