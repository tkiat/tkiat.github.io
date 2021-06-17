import * as ts from 'src/@global/utils-typescript'

import { getWaterMoveMethod } from './getWaterMoveMethod'

type NextStep = { [a: string]: Function }
type NextStepOrStop = NextStep | undefined

export const moveWater = (
  from: number,
  to: number,
  transitionSec: number,
  navLinkItems: HTMLCollection,
  callback: Function
) => {
  return checkValidInputs(from, to)
    ?.checkIfSkipAnimation(callback)
    ?.toggleNavItemsWaiting(navLinkItems)
    ?.letsMoveWater(from, to, transitionSec)
    .waitUntilWaterStops()
    .then((toggleNavItemsWaiting: Function) => {
      toggleNavItemsWaiting(navLinkItems)
      callback()
    })
}

const checkValidInputs = (from: number, to: number): NextStepOrStop => {
  if (from === to) return undefined
  if (from < 0 || to < 0 || !ts.isEven(from) || !ts.isEven(to)) {
    console.error('moveWater.checkValidInputs(): either from or to is invalid')
    return undefined
  }
  return {
    checkIfSkipAnimation,
  }
}

const checkIfSkipAnimation = (callback: Function): NextStepOrStop => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    callback()
    console.log('moveWater.checkIfSkipAnimation(): skip animation due to (prefers-reduced-motion: reduce)')
    return undefined
  }
  return { toggleNavItemsWaiting }
}

const toggleNavItemsWaiting = (items: HTMLCollection): NextStepOrStop => {
  if (!items) {
    console.error('moveWater.toggleNavItemsWaiting(): cannot find any nav items')
    return undefined
  }
  Array.prototype.map.call(items, (items) => items.classList.toggle('waiting'))
  return { letsMoveWater }
}

const letsMoveWater = (from: number, to: number, transitionSec: number) => {
  const flowDir = to > from ? 'right' : 'left'
  const step = to > from ? 2 : -2

  const waterTransitions = Array.from(new Array((to - from) / step + 1), (_, i) => from + i * step)
  const finalDelay = waterTransitions.reduce((delay, x) => {
    const mode = x === from ? 'drain' : x === to ? 'stuck' : 'pass'
    const method = getWaterMoveMethod(flowDir, mode)
    return delay + method(x, delay, transitionSec)
  }, 0)

  const cleanupDelay = (finalDelay + transitionSec) * 1000
  return {
    waitUntilWaterStops: () => waitUntilWaterStops(cleanupDelay),
  }
}

const waitUntilWaterStops = (delay: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay)
  }).then(() => toggleNavItemsWaiting)
