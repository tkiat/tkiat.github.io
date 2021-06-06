import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'

import NotFound from 'src/@global/component/NotFound'
import Intro from 'src/content/about/Intro'
import Credits from 'src/content/about/Credits'
import Record from 'src/content/about/Record'
import Personality from 'src/content/about/Personality'
import Environment from 'src/content/hobby/Environment'
import OthersH from 'src/content/hobby/Others'
import PC from 'src/content/hobby/PC'
import Web from 'src/content/hobby/Web'
import Resume from 'src/content/resume/Resume'

let IntroRoute = (props: RouteComponentProps) => <Intro />
let PersonalityRoute = (props: RouteComponentProps) => <Personality />
let RecordRoute = (props: RouteComponentProps) => <Record />
let CreditsRoute = (props: RouteComponentProps) => <Credits />

let OthersHRoute = (props: RouteComponentProps) => <OthersH />
let WebRoute = (props: RouteComponentProps) => <Web />
let PCRoute = (props: RouteComponentProps) => <PC />
let EnvironmentRoute = (props: RouteComponentProps) => <Environment />

let ResumeRoute = (props: RouteComponentProps) => <Resume />
let NotFoundRoute = (props: RouteComponentProps) => <NotFound className="notfound notfound--content" />

const Content = ({ isInsideWater }: { isInsideWater: boolean }): React.ReactElement => {
  return (
    <div className={'content ' + (isInsideWater ? 'content--inside-water' : 'content--outside-water')}>
      <Router>
        <NotFoundRoute default />

        <IntroRoute path="/about/Intro" />
        <PersonalityRoute path="/about/Personality" />
        <RecordRoute path="/about/Record" />
        <CreditsRoute path="/about/Credits" />

        <OthersHRoute path="/hobby/Others" />
        <WebRoute path="/hobby/Web" />
        <PCRoute path="/hobby/PC" />
        <EnvironmentRoute path="/hobby/Environment" />

        <ResumeRoute path="/resume" />
      </Router>
    </div>
  )
}

export default Content
