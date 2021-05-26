import React from 'react'
import {Link} from "@reach/router"

import {ReactComponent as DuckAboutMeSVG} from './svg/duck-aboutme.svg'
import {ReactComponent as DuckHobbySVG}   from './svg/duck-hobby.svg'
import {ReactComponent as DuckResumeSVG}  from './svg/duck-resume.svg'

// type Duck = React.FunctionComponent<React.SVGProps<SVGSVGElement>>
type Duck = 'DuckAboutMe' | 'DuckHobby' | 'DuckResume'

const DasDuck: React.FunctionComponent<{className: string, shape: Duck}> = ({className, shape}) => {
  switch(shape) {
    case 'DuckAboutMe': return <DuckAboutMeSVG className={className} />
    case 'DuckHobby': return <DuckHobbySVG className={className} />
    case 'DuckResume': return <DuckResumeSVG className={className} />
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

const Duck = props => {
  const xOffset = '20px'
  const left = `calc((100% - var(--sidebar-width)) * (2 * ${props.index} + 1) / 8 - ${xOffset})` // totalWidth * (2 * index + 1)/((totalPoints - 1) * 2)
  return (
    <Link className={'duck' + (props.isActive ? ' duck--active' : '')} to={props.href} aria-label={props.text} style={{left: left}} draggable='false' onClick={props.onclick}>
      <div className='duck__text'>{props.text}</div>
      <DasDuck className='duck__svg' shape={props.shape} />
    </Link>
  )
}

export default Duck
