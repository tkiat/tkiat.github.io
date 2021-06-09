import { Status } from 'my-util-type'

import updateFavicon from './updateFavicon'

let favicon: HTMLLinkElement
let status: Status = 1

test('return ERROR status if favicon not found', () => {
  status = updateFavicon()
  expect(status).toBe(1)
})

describe('favicon is found', () => {
  beforeAll(() => {
    favicon = document.createElement('link')
    favicon.id = 'favicon'
    document.head.appendChild(favicon)
    status = updateFavicon()
  })
  test('must return SUCCESS status', () => {
    expect(status).toBe(0)
  })
  test('favicon href must be inline SVG encoded', () => {
    expect(favicon).toHaveAttribute('href', expect.stringMatching(/^data:image\/svg\+xml,%3C/))
  })
})
