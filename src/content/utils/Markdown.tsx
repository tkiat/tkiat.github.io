import React          from 'react'
import ReactMarkdown  from 'react-markdown'
import rehypeRaw      from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

type MarkdownProps = {
  content: string
}

const Markdown = ({content}: MarkdownProps): React.ReactElement => <ReactMarkdown children={content} rehypePlugins={[rehypeRaw, rehypeSanitize]} />

export default Markdown
