import React from 'react'
import { Link } from '@reach/router'
import * as Nav from 'ts-type-nav'

import { ReactComponent as DuckAboutMeSVG } from 'src/@global/asset/duck/duck-aboutme.svg'
import { ReactComponent as DuckHobbySVG } from 'src/@global/asset/duck/duck-hobby.svg'
import { ReactComponent as DuckResumeSVG } from 'src/@global/asset/duck/duck-resume.svg'

export type Props = {
  href: string
  isActive: boolean
  left: string
  onclick: () => void
  shape: Nav.NavMainItemContentShape
  text: string
}
export default ({ href, isActive, left, onclick, shape, text }: Props): React.ReactElement => {
  return (
    <Link
      className={'nav-main' + (isActive ? ' nav-main--active' : '')}
      to={href}
      aria-label={text}
      style={{ left: left }}
      onClick={onclick}
      draggable="false">
      <div className="nav-main__text">{text}</div>
      {
        {
          DuckAbout: <DuckAboutMeSVG className="nav-main__svg" />,
          DuckHobby: <DuckHobbySVG className="nav-main__svg" />,
          DuckResume: <DuckResumeSVG className="nav-main__svg" />,
        }[shape]
      }
    </Link>
  )
}
