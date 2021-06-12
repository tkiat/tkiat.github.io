import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'

import { pathToTestId } from 'src/@global/utils'
import { paths } from 'src/appInputs'

import NotFound from 'src/@global/component/NotFound'
import Intro from 'src/content/about/Intro'
import Credits from 'src/content/about/Credits'
import Record from 'src/content/about/Record'
import Personality from 'src/content/about/Personality'
import Environment from 'src/content/hobby/Environment'
import Others from 'src/content/hobby/Others'
import PC from 'src/content/hobby/PC'
import Web from 'src/content/hobby/Web'
import Resume from 'src/content/resume/Resume'

type ContentProps = {
  isInsideWater: boolean
}

let NotFoundRoute = (props: RouteComponentProps) => (
  <div data-testid="page-notfound">
    <NotFound className="notfound notfound--content" />
  </div>
)

const contents = [
  { path: paths[0], elem: <Intro /> },
  { path: paths[1], elem: <Personality /> },
  { path: paths[2], elem: <Record /> },
  { path: paths[3], elem: <Credits /> },
  { path: paths[4], elem: <Web /> },
  { path: paths[5], elem: <PC /> },
  { path: paths[6], elem: <Environment /> },
  { path: paths[7], elem: <Others /> },
  { path: paths[8], elem: <Resume /> },
]

const Content = ({ isInsideWater }: ContentProps): React.ReactElement => {
  return (
    <div className={'content ' + (isInsideWater ? 'content--inside-water' : 'content--outside-water')}>
      <Router>
        <NotFoundRoute default />
        {contents.map(({ path, elem }, i) => {
          let Route = (props: RouteComponentProps) => <div data-testid={pathToTestId(path)}>{elem}</div>
          return <Route key={i} path={path} />
        })}
      </Router>
    </div>
  )
}

export default Content
