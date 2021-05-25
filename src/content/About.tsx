import React, {Suspense}     from 'react'
import {useRoutes} from 'hookrouter'

import NotFound       from '@/NotFound'
import Loading       from '@/Loading'
// import getAboutRoutes from '@/router/getAboutRoutes'

import Intro        from '@/content/About/Intro'
import WhatIUse     from '@/content/About/WhatIUse'
import WhoIAm       from '@/content/About/WhoIAm'
import Others       from '@/content/About/Others'

const routes = {
  '/Intro': () =>
    <Suspense fallback={<Loading />}>
      <Intro />
    </Suspense>,
  '/WhoIAm': () =>
    <Suspense fallback={<Loading />}>
      <WhoIAm />
    </Suspense>,
  '/WhatIUse': () =>
    <Suspense fallback={<Loading />}>
      <WhatIUse />
    </Suspense>,
  '/Others': () =>
    <Suspense fallback={<Loading />}>
      <Others />
    </Suspense>,
}

const About = () => {
  const routeResult = useRoutes(routes)
  return (
    <>
      <div className="content content--outside-water">
        {routeResult || <NotFound className='notfound--content' />}
      </div>
    </>
  )
}

export default About
