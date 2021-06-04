import { moveWater } from 'src/nav-sub/moveWater'

import { Even } from 'my-math-type'

const expectElemToHaveClasses = (id: string, classes: string) =>
  expect(document.getElementById(id)).toHaveClass(classes, { exact: true })
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
const transitionSec = 156600 // lcm(100, 116, 216)

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

  expectElemToHaveClasses(item + '0', item + ' drain-to-right-text')
  expectElemToHaveClasses(item + '1', item + ' drain-to-right-valve')
  expectElemToHaveClasses(item + '2', item + ' pass-to-right-text')
  expectElemToHaveClasses(item + '3', item + ' pass-to-right-valve')
  expectElemToHaveClasses(item + '4', item + ' pass-to-right-text')
  expectElemToHaveClasses(item + '5', item + ' pass-to-right-valve')
  expectElemToHaveClasses(item + '6', item + ' stuck-to-right-text')
  expect(finalDelay).toBe(delayDrain + delayPass * 2)
})

test('water drains to the left, then pass two nodes, then stop at the final node', () => {
  document.body.innerHTML = initDocument
  const delayDrain = (transitionSec * 1.16 * 20) / 116
  const delayPass = (transitionSec * 2.16 * 120) / 216

  const finalDelay = moveWater(6 as Even, 0 as Even, transitionSec)

  expectElemToHaveClasses(item + '6', item + ' drain-to-left-text')
  expectElemToHaveClasses(item + '5', item + ' pass-to-left-valve')
  expectElemToHaveClasses(item + '4', item + ' pass-to-left-text')
  expectElemToHaveClasses(item + '3', item + ' pass-to-left-valve')
  expectElemToHaveClasses(item + '2', item + ' pass-to-left-text')
  expectElemToHaveClasses(item + '1', item + ' stuck-to-left-valve')
  expectElemToHaveClasses(item + '0', item + ' stuck-to-left-text')
  expect(finalDelay).toBe(delayDrain + delayPass * 2)
})
