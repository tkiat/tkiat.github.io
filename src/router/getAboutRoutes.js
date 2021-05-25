import {Suspense}     from 'react'

import Loading      from 'Loading.js'

import Intro        from 'content/About/Intro.js'
import WhatIUse     from 'content/About/WhatIUse.js'
import WhoIAm       from 'content/About/WhoIAm.js'
import Others       from 'content/About/Others.js'

const allRoutes = () => {
  return {
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
}

const getAboutRoutes = () => {
  return allRoutes()
}

export default getAboutRoutes
