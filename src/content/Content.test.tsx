import React from 'react'
import { render, screen } from '@testing-library/react'
import { createHistory, createMemorySource, LocationProvider } from '@reach/router'
import Content from './Content'

const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/about/Intro', history = createHistory(createMemorySource(route)) } = {}
) => {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  }
}

test('initial page load, then navigate to all other valid routes', async () => {
  const {
    history: { navigate },
  } = renderWithRouter(<Content isInsideWater={false} />)

  expect(screen.getByTestId('page-about-intro')).toBeInTheDocument()

  const paths = [
    '/about/Personality',
    '/about/Record',
    '/about/Credits',

    '/hobby/Web',
    '/hobby/PC',
    '/hobby/Environment',
    '/hobby/Others',
  ]
  for (let i = 0; i < paths.length; i++) {
    await navigate(paths[i])
    const testId = 'page' + paths[i].toLowerCase().replaceAll('/', '-')
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  }
})

test('landing on a notfound page', () => {
  renderWithRouter(<Content isInsideWater={false} />, { route: '/notfound-path' })
  expect(screen.getByTestId('page-notfound')).toBeInTheDocument()
})
