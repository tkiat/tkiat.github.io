import React from 'react'
import {Link} from '@reach/router'
import {NavMainItemContentProps} from 'my-nav-type'

import {ReactComponent as DuckAboutMeSVG} from 'src/@global/asset/duck/duck-aboutme.svg'
import {ReactComponent as DuckHobbySVG}   from 'src/@global/asset/duck/duck-hobby.svg'
import {ReactComponent as DuckResumeSVG}  from 'src/@global/asset/duck/duck-resume.svg'

const NavMainItemContent = ({href, index, isActive, onclick, shape, text}: NavMainItemContentProps): React.ReactElement => {
  const xOffset = '20px'
  const left = `calc((100% - var(--sidebar-width)) * (2 * ${index} + 1) / 8 - ${xOffset})` // totalWidth * (2 * index + 1)/((totalPoints - 1) * 2)
  return (
    <Link className={'duck' + (isActive ? ' duck--active' : '')} to={href} aria-label={text} style={{left: left}} draggable='false' onClick={onclick}>
      <div className='duck__text'>{text}</div>
      {
        {
          'DuckAbout': <DuckAboutMeSVG className='duck__svg' />,
          'DuckHobby': <DuckHobbySVG className='duck__svg' />,
          'DuckResume': <DuckResumeSVG className='duck__svg' />,
        }[shape]
      }
    </Link>
  )
}

export default NavMainItemContent
