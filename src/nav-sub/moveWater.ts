import * as ts from 'src/@global/utils-typescript'

import { getWaterMoveMethod } from './getWaterMoveMethod'

type NextStep = { [a: string]: Function }
type NextStepOrStop = NextStep | undefined

export const beginMoveWaterSequence = (): NextStep => {
  return {
    checkValidInputs,
  }
}

const checkValidInputs = (from: number, to: number): NextStepOrStop => {
  if (from === to || from < 0 || to < 0 || !ts.isEven(from) || !ts.isEven(to)) {
    console.error('moveWater.checkValidInputs(): either from or to is invalid')
    return undefined
  }
  return {
    willSkipAnimation,
  }
}

const willSkipAnimation = (callback: Function): NextStepOrStop => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    callback()
    console.log('moveWater.willSkipAnimation(): skip animation due to (prefers-reduced-motion: reduce)')
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
  return { moveWater }
}

const moveWater = (from: number, to: number, transitionSec: number): NextStep => {
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
    setCleanupTimer: (elems: any, callback: any) => {
      window.setTimeout(function () {
        cleanup(elems, callback)
      }, cleanupDelay)
      return finalDelay
    },
  }
}

const cleanup = (elems: HTMLCollection, callback: any) => {
  toggleNavItemsWaiting(elems)
  callback()
}
