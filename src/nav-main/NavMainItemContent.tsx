import React from 'react'
import {Link} from '@reach/router'
import {NavMainItemContentProps} from 'my-nav-type'

import {ReactComponent as DuckAboutMeSVG} from 'src/@global/asset/duck/duck-aboutme.svg'
import {ReactComponent as DuckHobbySVG}   from 'src/@global/asset/duck/duck-hobby.svg'
import {ReactComponent as DuckResumeSVG}  from 'src/@global/asset/duck/duck-resume.svg'

const NavMainItemContent = ({href, isActive, left, onclick, shape, text}: NavMainItemContentProps): React.ReactElement => {
  return (
    <Link className={'nav-main' + (isActive ? ' nav-main--active' : '')} to={href} aria-label={text} style={{left: left}} draggable='false' onClick={onclick}>
      <div className='nav-main__text'>{text}</div>
      {
        {
          'DuckAbout': <DuckAboutMeSVG className='nav-main__svg' />,
          'DuckHobby': <DuckHobbySVG className='nav-main__svg' />,
          'DuckResume': <DuckResumeSVG className='nav-main__svg' />,
        }[shape]
      }
    </Link>
  )
}

export default NavMainItemContent
