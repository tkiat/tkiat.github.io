import React from 'react'
import {ThemeBase} from 'my-theme-type'

import {ReactComponent as Desert} from './desert.svg'
import {ReactComponent as Ocean}  from './ocean.svg'
import {ReactComponent as Sakura} from './sakura.svg'
import {ReactComponent as Snow}   from './snow.svg'

const backgrounds = {
  'ocean': <Ocean className='background' />,
  'desert': <Desert className='background' />,
  'sakura': <Sakura className='background' />,
  'snow': <Snow className='background' />,
}

const Background = ({theme}: {theme: ThemeBase}): React.ReactElement => {
  return backgrounds[theme]
}

export default Background
