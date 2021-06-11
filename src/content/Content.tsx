import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'

import { Url } from 'ts-type-nav'

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

type ContentProps = {
  isInsideWater: boolean
  urls: Url
}

const Content = ({ isInsideWater, urls }: ContentProps): React.ReactElement => {
  return (
    <div className={'content ' + (isInsideWater ? 'content--inside-water' : 'content--outside-water')}>
      <Router>
        <NotFoundRoute default />

        <IntroRoute path={urls.main[0] + urls.sub[0][0]} />
        <PersonalityRoute path={urls.main[0] + urls.sub[0][1]} />
        <RecordRoute path={urls.main[0] + urls.sub[0][2]} />
        <CreditsRoute path={urls.main[0] + urls.sub[0][3]} />

        <WebRoute path={urls.main[1] + urls.sub[1][0]} />
        <PCRoute path={urls.main[1] + urls.sub[1][1]} />
        <EnvironmentRoute path={urls.main[1] + urls.sub[1][2]} />
        <OthersHRoute path={urls.main[1] + urls.sub[1][3]} />

        <ResumeRoute path={urls.main[2]} />
      </Router>
    </div>
  )
}

export default Content
