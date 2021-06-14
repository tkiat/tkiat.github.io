window.matchMedia = (whatever: string) => {
  return { 'declare to solve "window not found" bug here': whatever } as unknown as MediaQueryList
}

import { moveWater } from './moveWater'

import { stripHTMLWhitespaces } from 'src/@global/utils'

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

const dummyCallback = () => {}

test('with invalid inputs, do nothing and return zero', () => {
  expect(moveWater({ from: 2, to: 2 }, transitionSec, dummyCallback)).toBe(0)
  expect(moveWater({ from: -1, to: 2 }, transitionSec, dummyCallback)).toBe(0)
  expect(moveWater({ from: 2, to: -1 }, transitionSec, dummyCallback)).toBe(0)
})

test('water drains to the right, then pass two nodes, then stop at the final node', () => {
  document.body.innerHTML = initDocument
  const delayDrain = (transitionSec * 4) / 100
  const delayPass = (transitionSec * 2.16 * 120) / 216

  const finalDelay = moveWater({ from: 0, to: 6 }, transitionSec, dummyCallback)

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

  const finalDelay = moveWater({ from: 6, to: 0 }, transitionSec, dummyCallback)

  expect(document.getElementById(item + '6')).toHaveClass(item + ' drain-to-left-text', { exact: true })
  expect(document.getElementById(item + '5')).toHaveClass(item + ' pass-to-left-valve', { exact: true })
  expect(document.getElementById(item + '4')).toHaveClass(item + ' pass-to-left-text', { exact: true })
  expect(document.getElementById(item + '3')).toHaveClass(item + ' pass-to-left-valve', { exact: true })
  expect(document.getElementById(item + '2')).toHaveClass(item + ' pass-to-left-text', { exact: true })
  expect(document.getElementById(item + '1')).toHaveClass(item + ' stuck-to-left-valve', { exact: true })
  expect(document.getElementById(item + '0')).toHaveClass(item + ' stuck-to-left-text', { exact: true })
  expect(finalDelay).toBe(delayDrain + delayPass * 2)
})
