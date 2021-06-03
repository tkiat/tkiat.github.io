import React from 'react'
import {Link} from '@reach/router'
import {DuckShape, DuckProps} from 'my-duck-type'

import {ReactComponent as DuckAboutMeSVG} from 'src/@global/asset/duck/duck-aboutme.svg'
import {ReactComponent as DuckHobbySVG}   from 'src/@global/asset/duck/duck-hobby.svg'
import {ReactComponent as DuckResumeSVG}  from 'src/@global/asset/duck/duck-resume.svg'

const DuckSVG = ({className, shape}: {className: string, shape: DuckShape}): React.ReactElement => {
  switch(shape) {
    case 'DuckAboutMe': return <DuckAboutMeSVG className={className} />
    case 'DuckHobby': return <DuckHobbySVG className={className} />
    case 'DuckResume': return <DuckResumeSVG className={className} />
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

const Duck = ({href, index, isActive, onclick, shape, text}: DuckProps): React.ReactElement => {
  const xOffset = '20px'
  const left = `calc((100% - var(--sidebar-width)) * (2 * ${index} + 1) / 8 - ${xOffset})` // totalWidth * (2 * index + 1)/((totalPoints - 1) * 2)
  return (
    <Link className={'duck' + (isActive ? ' duck--active' : '')} to={href} aria-label={text} style={{left: left}} draggable='false' onClick={onclick}>
      <div className='duck__text'>{text}</div>
      <DuckSVG className='duck__svg' shape={shape} />
    </Link>
  )
}

export default Duck
