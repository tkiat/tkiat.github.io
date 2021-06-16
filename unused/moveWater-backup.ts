import * as ts from 'src/@global/utils-typescript'

import { getWaterMoveMethod } from './getWaterMoveMethod'

export const moveWater = (
  { from, to }: { from: number; to: number },
  transitionSec: number,
  callback: () => void
): number => {
  if (!areInputsValid(from, to)) return 0
  if (willSkipAnimation()) {
    callback()
    return 0
  }

  const navItems = toggleNavItemsWaiting()
  if (!navItems) return 0

  const finalDelay = nowMoveWater(from, to, transitionSec)

  const cleanupDelayMsec = (finalDelay + transitionSec) * 1000
  cleanup(navItems, cleanupDelayMsec, callback)

  return finalDelay
}

const toggleNavItemsWaiting = (navLinkItems = document.getElementsByClassName('nav-sub__link')) => {
  if (!navLinkItems) return false
  Array.prototype.map.call(navLinkItems, (navLinkItems) => navLinkItems.classList.toggle('waiting'))
  return navLinkItems
}

const areInputsValid = (from: number, to: number): any => {
  if (from === to || from < 0 || to < 0 || !ts.isEven(from) || !ts.isEven(to)) return false
  return true
}

const willSkipAnimation = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const nowMoveWater = (from: number, to: number, transitionSec: number): number => {
  const flowDir = to > from ? 'right' : 'left'
  const step = to > from ? 2 : -2

  const waterTransitions = Array.from(new Array((to - from) / step + 1), (_, i) => from + i * step)
  const finalDelay = waterTransitions.reduce((delay, x) => {
    const mode = x === from ? 'drain' : x === to ? 'stuck' : 'pass'
    const method = getWaterMoveMethod(flowDir, mode)
    return delay + method(x, delay, transitionSec)
  }, 0)

  return finalDelay
}

const cleanup = (elems: HTMLCollection, delay: number, callback: any) => {
  window.setTimeout(function () {
    toggleNavItemsWaiting(elems)
    callback()
  }, delay)
}

// export const moveWater = (
//   { from, to }: { from: number; to: number },
//   transitionSec: number,
//   callback: (to: number) => void
// ): number => {
//   if (from === to || from < 0 || to < 0 || !ts.isEven(from) || !ts.isEven(to)) return 0
//
//   const skipAnimation = window.matchMedia('(prefers-reduced-motion: reduce)').matches
//   if (skipAnimation) {
//     callback(to)
//     return 0
//   }
//
//   const navLinkItems = document.getElementsByClassName('nav-sub__link')
//   if (!navLinkItems) return 1
//
//   toggleElemsClassName(navLinkItems, 'waiting')
//
//   const flowDir = to > from ? 'right' : 'left'
//   const step = to > from ? 2 : -2
//
//   const waterTransitions = Array.from(new Array((to - from) / step + 1), (_, i) => from + i * step)
//   const finalDelay = waterTransitions.reduce((delay, x) => {
//     const mode = x === from ? 'drain' : x === to ? 'stuck' : 'pass'
//     const method = getWaterMoveMethod(flowDir, mode)
//     return delay + method(x, delay, transitionSec)
//   }, 0)
//
//   window.setTimeout(function () {
//     if (navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')
//     callback(to)
//   }, (finalDelay + transitionSec) * 1000)
//   return finalDelay
// }
