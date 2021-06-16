import * as ts from 'src/@global/utils-typescript'

import { getWaterMoveMethod } from './getWaterMoveMethod'

const toggleElemsClassName = (elems: HTMLCollection, className: string) => {
  Array.prototype.map.call(elems, (elem) => elem.classList.toggle(className))
}

export const moveWater = (
  { from, to }: { from: number; to: number },
  transitionSec: number,
  callback: (to: number) => void
): number => {
  if (from === to || from < 0 || to < 0 || !ts.isEven(from) || !ts.isEven(to)) return 0

  const skipAnimation = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (skipAnimation) {
    callback(to)
    return 0
  }

  const navLinkItems = document.getElementsByClassName('nav-sub__link')
  if (!navLinkItems) return 1
  toggleElemsClassName(navLinkItems, 'waiting')

  const flowDir = to > from ? 'right' : 'left'
  const step = to > from ? 2 : -2

  const waterTransitions = Array.from(new Array((to - from) / step + 1), (_, i) => from + i * step)
  const finalDelay = waterTransitions.reduce((delay, x) => {
    const mode = x === from ? 'drain' : x === to ? 'stuck' : 'pass'
    const method = getWaterMoveMethod(flowDir, mode)
    return delay + method(x, delay, transitionSec)
  }, 0)

  window.setTimeout(function () {
    if (navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')
    callback(to)
  }, (finalDelay + transitionSec) * 1000)
  return finalDelay
}
