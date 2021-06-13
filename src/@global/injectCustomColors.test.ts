import injectCustomColors from './injectCustomColors'
import { possible } from 'src/@global/utils-typescript'

test('return ERROR status if the argument element is not a stylesheet', () => {
  const invalidStyle = document.createElement('div') as unknown as HTMLStyleElement
  document.head.appendChild(invalidStyle)
  const status = injectCustomColors(invalidStyle, {})
  expect(status).toBe(1)
})

test('custom theme should contain all expected custom fields', () => {
  const style = document.createElement('style')
  document.head.appendChild(style)

  const customColors = Object.fromEntries(possible.customColors.map((x) => [x, 'rgb(0, 0, 0)']))
  const status = injectCustomColors(style, customColors)

  expect(style.sheet).toBeTruthy()

  if (!style.sheet) return
  expect(style.sheet.cssRules[0]).toBeInstanceOf(CSSStyleRule)

  if (!(style.sheet.cssRules[0] instanceof CSSStyleRule)) return
  expect(style.sheet.cssRules[0].selectorText).toBe('[theme-supplement="custom"]')

  const expectedProperties = possible.customColors.map((x) => '--' + x + '-color')
  expect(Object.values(style.sheet!.cssRules[0].style)).toEqual(expect.arrayContaining(expectedProperties))
  expect(status).toBe(0)
})
