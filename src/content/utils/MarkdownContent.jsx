import React          from 'react'

import Markdown from './Markdown'

const Content = props => {
  return (
  <div className={'markdown-content' + (props.isActive ? ' markdown-content--active' : '')}>
    <Markdown content={props.content} />
  </div>
  )
}

export default Content
