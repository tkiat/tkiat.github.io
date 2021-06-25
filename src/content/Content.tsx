import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'

import { pathToTestId } from 'src/@global/utils'
import initData from 'src/appData'

import NotFound from 'src/@global/component/NotFound'
import Intro from 'src/content/about/Intro'
import Credits from 'src/content/about/Credits'
import Items from 'src/content/about/Items'
import Personality from 'src/content/about/Personality'
import Environment from 'src/content/activity/Environment'
import Others from 'src/content/activity/Others'
import Software from 'src/content/activity/Software'
import Resume from 'src/content/resume/Resume'

const contents = [
  { path: initData.paths[0], elem: <Intro /> },
  { path: initData.paths[1], elem: <Personality /> },
  { path: initData.paths[2], elem: <Items /> },
  { path: initData.paths[3], elem: <Credits /> },
  { path: initData.paths[4], elem: <Software /> },
  { path: initData.paths[5], elem: <Environment /> },
  { path: initData.paths[6], elem: <Others /> },
  { path: initData.paths[7], elem: <Resume /> },
]

type Props = {
  isInsideWater: boolean
}
export default ({ isInsideWater }: Props): React.ReactElement => (
  <div className={'content ' + (isInsideWater ? 'content--inside-water' : 'content--outside-water')}>
    <Router>
      {(() => {
        let NotFoundRoute = (props: RouteComponentProps) => (
          <div data-testid="page-notfound">
            <NotFound className="notfound notfound--content" />
          </div>
        )
        return <NotFoundRoute default />
      })()}
      {contents.map(({ path, elem }, i) => {
        let Route = (props: RouteComponentProps) => <div data-testid={pathToTestId(path)}>{elem}</div>
        return <Route key={i} path={path} />
      })}
    </Router>
  </div>
)
