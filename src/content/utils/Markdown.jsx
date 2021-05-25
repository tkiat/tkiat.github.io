import React          from 'react'
import Markdown       from 'react-markdown'
import rehypeRaw      from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

const Content = props => <Markdown children={props.content} rehypePlugins={[rehypeRaw, rehypeSanitize]} />
export default Content
