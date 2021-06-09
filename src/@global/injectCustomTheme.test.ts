import injectCustomTheme from './injectCustomTheme'

test('return ERROR status if the argument element is not a stylesheet', () => {
  const invalidStyle = document.createElement('div') as unknown as HTMLStyleElement
  document.head.appendChild(invalidStyle)
  const status = injectCustomTheme(invalidStyle)
  expect(status).toBe(1)
})

test('custom theme should contain all expected custom fields', () => {
  const style = document.createElement('style')
  document.head.appendChild(style)
  const status = injectCustomTheme(style)

  expect(style.sheet).toBeTruthy()
  if (!style.sheet) return

  expect(style.sheet.cssRules[0]).toBeInstanceOf(CSSStyleRule)
  if (!(style.sheet.cssRules[0] instanceof CSSStyleRule)) return

  expect(style.sheet.cssRules[0].selectorText).toBe("[theme-supplement='custom']")
  const expectedProperty = [
    '--duck-beak-color',
    '--duck-body-color',
    '--duck-wing-color',
    '--tube-stroke-color',
    '--tube-water-color',
    '--wave-front0-color',
    '--wave-front1-color',
    '--wave-front2-color',
  ]
  expect(Object.values(style.sheet!.cssRules[0].style)).toEqual(expect.arrayContaining(expectedProperty))
  expect(status).toBe(0)
})
