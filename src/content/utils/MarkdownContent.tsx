import React from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

type MarkdownContentProps = {
  content: string
}

const MarkdownContent = ({ content }: MarkdownContentProps): React.ReactElement => {
  return (
    <div className="markdown-content">
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(content), { USE_PROFILES: { html: true } }),
        }}></div>
    </div>
  )
}

export default MarkdownContent
