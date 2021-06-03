import React from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

type MarkdownProps = {
  content: string
}

const Markdown = ({ content }: MarkdownProps): React.ReactElement => (
  <div
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(marked(content), { USE_PROFILES: { html: true } }),
    }}></div>
)

export default Markdown
