import { Even } from 'my-util-type'

import { moveWater } from './moveWater'

const stripHTMLWhitespaces = (str: string) => str.replace(/>\s+</g, '><')

const item = 'nav-sub__highlighter-item'
const transitionSec = 156600 // lcm(100, 116, 216)

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

  expect(document.getElementById(item + '0')).toHaveClass(item + ' drain-to-right-text', { exact: true })
  expect(document.getElementById(item + '1')).toHaveClass(item + ' drain-to-right-valve', { exact: true })
  expect(document.getElementById(item + '2')).toHaveClass(item + ' pass-to-right-text', { exact: true })
  expect(document.getElementById(item + '3')).toHaveClass(item + ' pass-to-right-valve', { exact: true })
  expect(document.getElementById(item + '4')).toHaveClass(item + ' pass-to-right-text', { exact: true })
  expect(document.getElementById(item + '5')).toHaveClass(item + ' pass-to-right-valve', { exact: true })
  expect(document.getElementById(item + '6')).toHaveClass(item + ' stuck-to-right-text', { exact: true })
  expect(finalDelay).toBe(delayDrain + delayPass * 2)
})

test('water drains to the left, then pass two nodes, then stop at the final node', () => {
  document.body.innerHTML = initDocument
  const delayDrain = (transitionSec * 1.16 * 20) / 116
  const delayPass = (transitionSec * 2.16 * 120) / 216

  const finalDelay = moveWater(6 as Even, 0 as Even, transitionSec)

  expect(document.getElementById(item + '6')).toHaveClass(item + ' drain-to-left-text', { exact: true })
  expect(document.getElementById(item + '5')).toHaveClass(item + ' pass-to-left-valve', { exact: true })
  expect(document.getElementById(item + '4')).toHaveClass(item + ' pass-to-left-text', { exact: true })
  expect(document.getElementById(item + '3')).toHaveClass(item + ' pass-to-left-valve', { exact: true })
  expect(document.getElementById(item + '2')).toHaveClass(item + ' pass-to-left-text', { exact: true })
  expect(document.getElementById(item + '1')).toHaveClass(item + ' stuck-to-left-valve', { exact: true })
  expect(document.getElementById(item + '0')).toHaveClass(item + ' stuck-to-left-text', { exact: true })
  expect(finalDelay).toBe(delayDrain + delayPass * 2)
})
