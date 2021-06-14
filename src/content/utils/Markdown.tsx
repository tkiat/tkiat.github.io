import React from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

type Props = {
  content: string
}

export default ({ content }: Props): React.ReactElement => (
  <div
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(marked(content), { USE_PROFILES: { html: true } }),
    }}></div>
)
