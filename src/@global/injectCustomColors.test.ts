import injectCustomColors from './injectCustomColors'

test('return ERROR status if the argument element is not a stylesheet', () => {
  const invalidStyle = document.createElement('div') as unknown as HTMLStyleElement
  document.head.appendChild(invalidStyle)
  const status = injectCustomColors(invalidStyle, {})
  expect(status).toBe(1)
})

test('custom theme should contain all expected custom fields', () => {
  const style = document.createElement('style')
  document.head.appendChild(style)

  const customColors = {
    'duck-beak': 'rgb(0, 0, 0)',
    'duck-body': 'rgb(0, 0, 0)',
    'duck-wing': 'rgb(0, 0, 0)',
    'tube-stroke': 'rgb(0, 0, 0)',
    'tube-water': 'rgb(0, 0, 0)',
    'wave-front0': 'rgb(0, 0, 0)',
    'wave-front1': 'rgb(0, 0, 0)',
    'wave-front2': 'rgb(0, 0, 0)',
  }
  const status = injectCustomColors(style, customColors)

  expect(style.sheet).toBeTruthy()
  if (!style.sheet) return

  expect(style.sheet.cssRules[0]).toBeInstanceOf(CSSStyleRule)
  if (!(style.sheet.cssRules[0] instanceof CSSStyleRule)) return

  expect(style.sheet.cssRules[0].selectorText).toBe('[theme-supplement="custom"]')
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
