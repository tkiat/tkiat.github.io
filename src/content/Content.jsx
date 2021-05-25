import React, {Suspense}     from 'react'

import { Link, Redirect, Route } from "wouter"

import Intro        from '@/content/About/Intro'
import WhatIUse     from '@/content/About/WhatIUse'
import WhoIAm       from '@/content/About/WhoIAm'
import Others       from '@/content/About/Others'

import HobbyEnv     from '@/content/Hobby/Environment'
import HobbyOthers      from '@/content/Hobby/Others'
import HobbyPC          from '@/content/Hobby/PC'
import HobbyWeb         from '@/content/Hobby/Web'

import Resume       from '@/content/Resume'

import NotFound       from '@/NotFound'
import Loading       from '@/Loading'

const getPage = (main='about', sub='intro') => {
  if(main === 'about') {
    if(sub === 'intro') return <Intro />
    else if(sub === 'whoiam') return <WhoIAm />
    else if(sub === 'whatiuse') return <WhatIUse />
    else if(sub === 'others') return <Others />
  }
  else if(main === 'hobby') {
    if(sub === 'environment') return <HobbyEnv />
    else if(sub === 'others') return <HobbyOthers />
    else if(sub === 'pc') return <HobbyPC />
    else if(sub === 'web') return <HobbyWeb />
  }
  else if(main === 'resume') {
    return <Resume />
  }
  return <NotFound className='notfound--content' />
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <div className={'content ' + (props.main === 'resume' ? 'content--inside-water' : 'content--outside-water')}>
        <Suspense fallback={<Loading />}>
          {getPage(props.main, props.sub)}
        </Suspense>
      </div>
    </>
  )
}

export default Content
