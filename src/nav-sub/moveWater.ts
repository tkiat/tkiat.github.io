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

  const willMoveRight = to > from
  const flowDir = willMoveRight ? 'right' : 'left'
  const step = willMoveRight ? 2 : -2
  let delayCur = 0

  const transitions = Array.from(new Array((to - from) / step + 1), (_, i) => from + i * step)
  transitions.map((x) => {
    const mode = x === from ? 'drain' : x === to ? 'stuck' : 'pass'
    const method = getWaterMoveMethod(flowDir, mode)
    delayCur += method(x, delayCur, transitionSec)
  })

  window.setTimeout(function () {
    if (navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')
    callback(to)
  }, (delayCur + transitionSec) * 1000)
  return delayCur
}
