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
  let cur = from
  {
    // step 1: drain
    const method = getWaterMoveMethod(flowDir, 'drain')
    delayCur += method(cur, delayCur, transitionSec)
    cur += step
  }
  // step 2 (optional): pass
  const transitions = Array.from(new Array((to - cur) / step), (_, i) => cur + i * step)
  transitions.map((x) => {
    const method = getWaterMoveMethod(flowDir, 'pass')
    delayCur += method(x, delayCur, transitionSec)
    cur += step
  })
  // step 3: stuck
  {
    const method = getWaterMoveMethod(flowDir, 'stuck')
    method(cur, delayCur, transitionSec)
  }

  window.setTimeout(function () {
    if (navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')
    callback(to)
  }, (delayCur + transitionSec) * 1000)
  return delayCur
}
