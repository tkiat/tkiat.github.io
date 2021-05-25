import React from 'react'
import ReactMarkdown from 'react-markdown'
// const ReactMarkdownWithHtml = require('react-markdown/with-html')

const Content = props => {
  return (
  <div className={'markdown-content' + (props.isActive ? ' markdown-content--active' : '')}>
    <ReactMarkdown children={props.content} allowDangerousHtml />
  </div>
  )
}

export default Content
