window.matchMedia = (whatever: string) => {
  return { 'declare to solve "window not found" bug here': whatever } as unknown as MediaQueryList
}

import React from 'react'
import { render, screen } from '@testing-library/react'
import { createHistory, createMemorySource, LocationProvider } from '@reach/router'

import Content from './Content'
import { pathToTestId } from 'src/@global/utils'
import { paths } from 'src/appInputs'

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
  } = renderWithRouter(<Content isInsideWater={false} />)

  expect(screen.getByTestId(pathToTestId(paths[0]))).toBeInTheDocument()

  for (let i = 1; i < paths.length; i++) {
    await navigate(paths[i])
    expect(screen.getByTestId(pathToTestId(paths[i]))).toBeInTheDocument()
  }
})

test('landing on a notfound page', () => {
  renderWithRouter(<Content isInsideWater={false} />, { route: '/notfound-path' })
  expect(screen.getByTestId('page-notfound')).toBeInTheDocument()
})
