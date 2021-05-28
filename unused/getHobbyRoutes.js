import {Suspense}     from 'react'

import Loading     from 'Loading.js'

import Environment from 'content/Hobby/Environment.js'
import Others      from 'content/Hobby/Others.js'
import PC          from 'content/Hobby/PC.js'
import Web         from 'content/Hobby/Web.js'

const allRoutes = () => {
  return {
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
}

const getHobbyRoutes = () => {
  return allRoutes()
}

export default getHobbyRoutes
