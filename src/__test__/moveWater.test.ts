import { moveWater } from 'src/nav-sub/moveWater'

import { Even } from 'my-math-type'

const transitionSec = 156600 // lcm(100, 116, 216)

const stripHTMLWhitespaces = (str: string) => str.replace(/>\s+</g, '><')

const item = 'nav__highlighter-item'
const initDocument = stripHTMLWhitespaces(`
  <div>
    <div id="${item}0" class="${item}"></div>
    <div id="${item}1" class="${item}"></div>
    <div id="${item}2" class="${item}"></div>
    <div id="${item}3" class="${item}"></div>
    <div id="${item}4" class="${item}"></div>
    <div id="${item}5" class="${item}"></div>
    <div id="${item}6" class="${item}"></div>
  </div>
`)

test('with invalid inputs, do nothing and return zero', () => {
  expect(moveWater(2 as Even, 2 as Even, 0)).toBe(0)
  expect(moveWater(-1 as Even, 2 as Even, 0)).toBe(0)
  expect(moveWater(2 as Even, -1 as Even, 0)).toBe(0)
})

test('water drains to the right, then pass two nodes, then stop at the final node', () => {
  document.body.innerHTML = initDocument
  const delayDrain = (transitionSec * 4) / 100
  const delayPass = (transitionSec * 2.16 * 120) / 216

  const finalDelay = moveWater(0 as Even, 6 as Even, transitionSec)

  expect(document.getElementById(`${item}0`)!.className).toBe(`${item} drain-to-right-text`)
  expect(document.getElementById(`${item}1`)!.className).toBe(`${item} drain-to-right-valve`)
  expect(document.getElementById(`${item}2`)!.className).toBe(`${item} pass-to-right-text`)
  expect(document.getElementById(`${item}3`)!.className).toBe(`${item} pass-to-right-valve`)
  expect(document.getElementById(`${item}4`)!.className).toBe(`${item} pass-to-right-text`)
  expect(document.getElementById(`${item}5`)!.className).toBe(`${item} pass-to-right-valve`)
  expect(document.getElementById(`${item}6`)!.className).toBe(`${item} stuck-to-right-text`)
  expect(finalDelay).toBe(delayDrain + delayPass * 2)
})

test('water drains to the left, then pass two nodes, then stop at the final node', () => {
  document.body.innerHTML = initDocument
  const delayDrain = (transitionSec * 1.16 * 20) / 116
  const delayPass = (transitionSec * 2.16 * 120) / 216

  const finalDelay = moveWater(6 as Even, 0 as Even, transitionSec)

  expect(document.getElementById(`${item}6`)!.className).toBe(`${item} drain-to-left-text`)
  expect(document.getElementById(`${item}5`)!.className).toBe(`${item} pass-to-left-valve`)
  expect(document.getElementById(`${item}4`)!.className).toBe(`${item} pass-to-left-text`)
  expect(document.getElementById(`${item}3`)!.className).toBe(`${item} pass-to-left-valve`)
  expect(document.getElementById(`${item}2`)!.className).toBe(`${item} pass-to-left-text`)
  expect(document.getElementById(`${item}1`)!.className).toBe(`${item} stuck-to-left-valve`)
  expect(document.getElementById(`${item}0`)!.className).toBe(`${item} stuck-to-left-text`)
  expect(finalDelay).toBe(delayDrain + delayPass * 2)
})
