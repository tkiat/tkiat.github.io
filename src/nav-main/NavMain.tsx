import React from 'react'

import {DuckShape} from 'my-duck-type'
import {NavMainProps} from 'my-nav-type'

import toggleSidebar from 'src/@global/toggleSidebar'
import Duck          from 'src/nav-main/Duck'
import DuckSidebar   from 'src/nav-main/DuckSidebar'

const NavMain = ({currentIndex, onclick, urlAtIndex}: NavMainProps): React.ReactElement => {
  return (
    <>
      {['DuckAboutMe', 'DuckHobby', 'DuckResume'].map((duck, index) =>
      <Duck
        key={index}
        index={index}
        href={urlAtIndex[index]}
        isActive={currentIndex === index}
        shape={duck as DuckShape}
        text={['About', 'Hobby', 'Resume'][index]}
        onclick={onclick} />
      )}
      <DuckSidebar
        myId='duck-sidebar'
        index={3}
        text='Settings'
        onclick={toggleSidebar} />
    </>
  )
}

export default NavMain
