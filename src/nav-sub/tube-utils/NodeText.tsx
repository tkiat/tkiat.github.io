import React from 'react'

import { Link } from '@reach/router'
import TubeText from './TubeText'

type Props = {
  i: number
  cur: number
  to: string
  word: string
  onclick: React.MouseEventHandler<HTMLAnchorElement>
}
export default (props: Props) => {
  return (
    <Link className={'nav-sub__link'} to={props.to} onClick={props.onclick} draggable="false">
      <TubeText word={props.word} />
      <div className="nav-sub__highlighter-wrapper">
        <div
          id={'nav-sub__highlighter-item' + props.i * 2}
          className={
            'nav-sub__highlighter-item' + (props.i === props.cur ? ' nav-sub__highlighter-item--init' : '')
          }></div>
      </div>
    </Link>
  )
}
