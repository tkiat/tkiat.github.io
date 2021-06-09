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

let NotFoundRoute = (props: RouteComponentProps) => (
  <div data-testid="page-notfound">
    <NotFound className="notfound notfound--content" />
  </div>
)

let IntroRoute = (props: RouteComponentProps) => (
  <div data-testid="page-about-intro">
    <Intro />
  </div>
)
let PersonalityRoute = (props: RouteComponentProps) => (
  <div data-testid="page-about-personality">
    <Personality />
  </div>
)
let RecordRoute = (props: RouteComponentProps) => (
  <div data-testid="page-about-record">
    <Record />
  </div>
)
let CreditsRoute = (props: RouteComponentProps) => (
  <div data-testid="page-about-credits">
    <Credits />
  </div>
)

let WebRoute = (props: RouteComponentProps) => (
  <div data-testid="page-hobby-web">
    <Web />
  </div>
)
let PCRoute = (props: RouteComponentProps) => (
  <div data-testid="page-hobby-pc">
    <PC />
  </div>
)
let EnvironmentRoute = (props: RouteComponentProps) => (
  <div data-testid="page-hobby-environment">
    <Environment />
  </div>
)
let OthersHRoute = (props: RouteComponentProps) => (
  <div data-testid="page-hobby-others">
    <OthersH />
  </div>
)

let ResumeRoute = (props: RouteComponentProps) => (
  <div data-testid="page-resume">
    <Resume />
  </div>
)

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
