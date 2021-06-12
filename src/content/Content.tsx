import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'

import * as Nav from 'ts-type-nav'

import { pathToTestId } from 'src/@global/utils'

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

type ContentProps = {
  isInsideWater: boolean
  urls: Nav.Url
}

const Content = ({ isInsideWater, urls }: ContentProps): React.ReactElement => {
  const paths = [
    urls.main[0] + urls.sub[0][0],
    urls.main[0] + urls.sub[0][1],
    urls.main[0] + urls.sub[0][2],
    urls.main[0] + urls.sub[0][3],

    urls.main[1] + urls.sub[1][0],
    urls.main[1] + urls.sub[1][1],
    urls.main[1] + urls.sub[1][2],
    urls.main[1] + urls.sub[1][3],

    urls.main[2],
  ]
  let IntroRoute = (props: RouteComponentProps) => (
    <div data-testid={pathToTestId(paths[0])}>
      <Intro />
    </div>
  )
  let PersonalityRoute = (props: RouteComponentProps) => (
    <div data-testid={pathToTestId(paths[1])}>
      <Personality />
    </div>
  )
  let RecordRoute = (props: RouteComponentProps) => (
    <div data-testid={pathToTestId(paths[2])}>
      <Record />
    </div>
  )
  let CreditsRoute = (props: RouteComponentProps) => (
    <div data-testid={pathToTestId(paths[3])}>
      <Credits />
    </div>
  )

  let WebRoute = (props: RouteComponentProps) => (
    <div data-testid={pathToTestId(paths[4])}>
      <Web />
    </div>
  )
  let PCRoute = (props: RouteComponentProps) => (
    <div data-testid={pathToTestId(paths[5])}>
      <PC />
    </div>
  )
  let EnvironmentRoute = (props: RouteComponentProps) => (
    <div data-testid={pathToTestId(paths[6])}>
      <Environment />
    </div>
  )
  let OthersHRoute = (props: RouteComponentProps) => (
    <div data-testid={pathToTestId(paths[7])}>
      <OthersH />
    </div>
  )

  let ResumeRoute = (props: RouteComponentProps) => (
    <div data-testid={pathToTestId(paths[8])}>
      <Resume />
    </div>
  )
  let NotFoundRoute = (props: RouteComponentProps) => (
    <div data-testid="page-notfound">
      <NotFound className="notfound notfound--content" />
    </div>
  )

  return (
    <div className={'content ' + (isInsideWater ? 'content--inside-water' : 'content--outside-water')}>
      <Router>
        <NotFoundRoute default />

        {[<Intro />].map((elem) => {
          let IntroRoute = (props: RouteComponentProps) => <div data-testid={pathToTestId(paths[0])}>{elem}</div>
          // elem.path = paths[0]
          return <IntroRoute />
        })}

        {/*<IntroRoute path={paths[0]} />*/}
        <PersonalityRoute path={paths[1]} />
        <RecordRoute path={paths[2]} />
        <CreditsRoute path={paths[3]} />

        <WebRoute path={paths[4]} />
        <PCRoute path={paths[5]} />
        <EnvironmentRoute path={paths[6]} />
        <OthersHRoute path={paths[7]} />

        <ResumeRoute path={paths[8]} />
      </Router>
    </div>
  )
}

export default Content
