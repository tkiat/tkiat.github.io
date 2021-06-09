import { stripHTMLWhitespaces } from 'src/@global/utils'
import toggleSidebar from './toggleSidebar'

let status: unknown

test('return ERROR status if an element is not found', () => {
  status = toggleSidebar()
  expect(status).toBe(1)
})

describe('insert all relavant elements to the document before running toggleSidebar()', () => {
  beforeAll(() => {
    document.body.innerHTML = stripHTMLWhitespaces(`
    <div id='root'>
      <div id="sidebar-toggler"></div>
      <div id="nav-main-sidebar"></div>
    </div>
  `)
    status = toggleSidebar()
  })
  test('must return SUCCESS', () => {
    expect(status).toBe(0)
  })
  test.each(['root', 'sidebar-toggler', 'nav-main-sidebar'])('class name of id "%s" must be toggled', (id) => {
    expect(document.getElementById(id)).toBeInTheDocument()
    expect(document.getElementById(id)!.className).not.toEqual('')
  })
})
