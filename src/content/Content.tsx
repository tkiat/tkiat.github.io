import React    from 'react'
import {Router} from '@reach/router'

import Intro       from '@/content/about/Intro'
import OthersA     from '@/content/about/Others'
import WhatIUse    from '@/content/about/WhatIUse'
import WhoIAm      from '@/content/about/WhoIAm'
import Environment from '@/content/hobby/Environment'
import OthersH     from '@/content/hobby/Others'
import PC          from '@/content/hobby/PC'
import Web         from '@/content/hobby/Web'
import Resume      from '@/content/Resume'
import NotFound    from '@/NotFound'

const Content = ({isInsideWater}: {isInsideWater: boolean}): React.ReactElement => {
  return (
    <>
      <div className={'content ' + (isInsideWater ? 'content--inside-water' : 'content--outside-water')}>
        <Router>
          <NotFound className='notfound notfound--content' default />

          <Intro    path='/about/Intro' />
          <WhatIUse path='/about/WhatIUse' />
          <WhoIAm   path='/about/WhoIAm' />
          <OthersA  path='/about/Others' />

          <Environment path='/hobby/Environment' />
          <OthersH     path='/hobby/Others' />
          <PC          path='/hobby/PC' />
          <Web         path='/hobby/Web' />

          <Resume path='/resume' />
        </Router>
      </div>
    </>
  )
}

export default Content

// import Loading       from '@/Loading'
// const Intro    = React.lazy(() => import('@/content/about/Intro'))
// const WhoIAm   = React.lazy(() => import('@/content/about/WhoIAm'))
// const WhatIUse = React.lazy(() => import('@/content/about/WhatIUse'))
// const Others   = React.lazy(() => import('@/content/about/Others'))
// const Web         = React.lazy(() => import('@/content/hobby/Web'))
// const PC          = React.lazy(() => import('@/content/hobby/PC'))
// const Environment = React.lazy(() => import('@/content/hobby/Environment'))
// const OthersH     = React.lazy(() => import('@/content/hobby/Others'))
// const Resume     = React.lazy(() => import('@/content/Resume'))
// <React.Suspense fallback={<Loading />}>
