import React    from 'react'
import {Router, RouteComponentProps} from '@reach/router'

import Intro       from 'src/content/about/Intro'
import Credits     from 'src/content/about/Credits'
import Record      from 'src/content/about/Record'
import Personality from 'src/content/about/Personality'
import Environment from 'src/content/hobby/Environment'
import OthersH     from 'src/content/hobby/Others'
import PC          from 'src/content/hobby/PC'
import Web         from 'src/content/hobby/Web'
import Resume      from 'src/content/resume/Resume'
import NotFound    from 'src/NotFound'


const Content = ({isInsideWater}: {isInsideWater: boolean}): React.ReactElement => {
let IntroRoute   = (props: RouteComponentProps) => <Intro />
let PersonalityRoute = (props: RouteComponentProps) => <Personality />
let RecordRoute  = (props: RouteComponentProps) => <Record />
let CreditsRoute = (props: RouteComponentProps) => <Credits />

let OthersHRoute     = (props: RouteComponentProps) => <OthersH />
let WebRoute         = (props: RouteComponentProps) => <Web />
let PCRoute          = (props: RouteComponentProps) => <PC />
let EnvironmentRoute = (props: RouteComponentProps) => <Environment />

let ResumeRoute      = (props: RouteComponentProps) => <Resume />
let NotFoundRoute    = (props: RouteComponentProps) => <NotFound className='notfound notfound--content' />
  return (
    <div className={'content ' + (isInsideWater ? 'content--inside-water' : 'content--outside-water')}>
      <Router>
        <NotFoundRoute default />

        <IntroRoute       path='/about/Intro' />
        <PersonalityRoute path='/about/Personality' />
        <RecordRoute      path='/about/Record' />
        <CreditsRoute     path='/about/Credits' />

        <OthersHRoute     path='/hobby/Others' />
        <WebRoute         path='/hobby/Web' />
        <PCRoute          path='/hobby/PC' />
        <EnvironmentRoute path='/hobby/Environment' />

        <ResumeRoute path='/resume' />
      </Router>
    </div>
  )
}

export default Content

// /*{
//           <NotFound default />
// 
//           <Intro    path='/about/Intro' />
//           <Record path='/about/Record' />
//           <Personality   path='/about/Personality' />
//           <Credits  path='/about/Others' />
// 
//           <Environment path='/hobby/Environment' />
//           <OthersH     path='/hobby/Others' />
//           <PC          path='/hobby/PC' />
//           <Web         path='/hobby/Web' />
// 
//           <Resume path='/resume' />
// }*/

// import Loading       from '@/Loading'
// const Intro    = React.lazy(() => import('@/content/about/Intro'))
// const Personality   = React.lazy(() => import('@/content/about/Personality'))
// const Record = React.lazy(() => import('@/content/about/Record'))
// const Others   = React.lazy(() => import('@/content/about/Others'))
// const Web         = React.lazy(() => import('@/content/hobby/Web'))
// const PC          = React.lazy(() => import('@/content/hobby/PC'))
// const Environment = React.lazy(() => import('@/content/hobby/Environment'))
// const OthersH     = React.lazy(() => import('@/content/hobby/Others'))
// const Resume     = React.lazy(() => import('@/content/Resume'))
// <React.Suspense fallback={<Loading />}>
