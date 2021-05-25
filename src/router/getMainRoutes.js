import {Suspense, lazy} from 'react'

import Loading          from '@/Loading'

import About          from '@/content/About'
import Hobby          from '@/content/Hobby'
import Resume          from '@/content/Resume'

// const About   = lazy(() => import('@/content/About'))
// const Hobby   = lazy(() => import('@/content/Hobby'))
// const Resume  = lazy(() => import('@/content/Resume'))

const routes = {
  '/about*': () => () => 
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>,
  '/hobby*': () => () =>
      <Suspense fallback={<Loading />}>
        <Hobby />
      </Suspense>,
  '/resume': () => () =>
      <Suspense fallback={<Loading />}>
        <Resume />
      </Suspense>,
}

export default routes
