import injectCustomTheme from 'src/@global/injectCustomTheme'

test('custom theme should contain all custom fields', () => {
  const style = document.createElement('style')
  document.head.appendChild(style)
  injectCustomTheme(style)

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
})
