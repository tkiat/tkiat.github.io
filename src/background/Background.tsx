import React from 'react'
import * as Theme from 'ts-type-theme'

import { ReactComponent as Desert } from 'src/@global/asset/background/desert.svg'
import { ReactComponent as Ocean } from 'src/@global/asset/background/ocean.svg'
import { ReactComponent as Sakura } from 'src/@global/asset/background/sakura.svg'
import { ReactComponent as Snow } from 'src/@global/asset/background/snow.svg'

const backgrounds = {
  ocean: <Ocean className="background" />,
  desert: <Desert className="background" />,
  sakura: <Sakura className="background" />,
  snow: <Snow className="background" />,
}

type Props = {
  theme: Theme.Base
}
export default ({ theme }: Props): React.ReactElement => {
  return backgrounds[theme]
}
