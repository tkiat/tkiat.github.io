import React from 'react'

import { ReactComponent as ValveBorder } from 'src/@global/asset/valve/border.svg'
import { ReactComponent as ValveMask } from 'src/@global/asset/valve/mask.svg'

type NodeValveProps = {
  i: number
  cur: number
}
export default (props: NodeValveProps) => {
  return (
    <>
      <div className="valve">
        <ValveBorder />
        <ValveMask />
      </div>
      <div className="nav-sub__highlighter-wrapper">
        <div
          id={'nav-sub__highlighter-item' + (props.i * 2 + 1)}
          className={
            'nav-sub__highlighter-item' + (props.i === props.cur ? ' nav-sub__highlighter-item--init' : '')
          }></div>
      </div>
    </>
  )
}
