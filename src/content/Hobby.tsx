import React, {Suspense}     from 'react'
import {useRoutes} from 'hookrouter'

import NotFound       from '@/NotFound'
import Loading       from '@/Loading'
// import getHobbyRoutes from '@/router/getHobbyRoutes'
import Environment from '@/content/Hobby/Environment'
import Others      from '@/content/Hobby/Others'
import PC          from '@/content/Hobby/PC'
import Web         from '@/content/Hobby/Web'

const routes = {
  '/Web': () =>
    <Suspense fallback={<Loading />}>
      <Web />
    </Suspense>,
  '/PC': () =>
    <Suspense fallback={<Loading />}>
      <PC />
    </Suspense>,
  '/Environment': () =>
    <Suspense fallback={<Loading />}>
      <Environment />
    </Suspense>,
  '/Others': () =>
    <Suspense fallback={<Loading />}>
      <Others />
    </Suspense>,
}

const Content = props => {
  const routeResult = useRoutes(routes)
  return (
    <>
      <div className="content content--outside-water">
        {routeResult || <NotFound className='notfound--content' />}
      </div>
    </>
  )
}

export default Content
