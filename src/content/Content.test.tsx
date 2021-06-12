import React from 'react'
import { render, screen } from '@testing-library/react'
import { createHistory, createMemorySource, LocationProvider } from '@reach/router'

// import { urls } from 'src/appInputs'
import Content from './Content'
import { pathToTestId } from 'src/@global/utils'

export const urls: any = {
  main: {
    0: '/about',
    1: '/hobby',
    2: '/work',
  },
  sub: {
    0: ['/Intro', '/Personality', '/Record', '/Credits'],
    1: ['/Web', '/PC', '/TODO', '/Others'],
  },
}
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

const renderWithRouter = (
  ui: React.ReactElement,
  { route = paths[0], history = createHistory(createMemorySource(route)) } = {}
) => {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  }
}

test('initial page load, then navigate to all other valid routes', async () => {
  const {
    history: { navigate },
  } = renderWithRouter(<Content isInsideWater={false} urls={urls} />)

  expect(screen.getByTestId(pathToTestId(paths[0]))).toBeInTheDocument()

  for (let i = 1; i < paths.length; i++) {
    await navigate(paths[i])
    expect(screen.getByTestId(pathToTestId(paths[i]))).toBeInTheDocument()
  }
})
//   const paths = [
//     '/about/Personality',
//     '/about/Record',
//     '/about/Credits',
//
//     '/hobby/Web',
//     '/hobby/PC',
//     '/hobby/Environment',
//     '/hobby/Others',
// ]

test('landing on a notfound page', () => {
  renderWithRouter(<Content isInsideWater={false} urls={urls} />, { route: '/notfound-path' })
  expect(screen.getByTestId('page-notfound')).toBeInTheDocument()
})
