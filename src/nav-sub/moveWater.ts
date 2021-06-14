import { Even } from 'ts-type-util'
import * as ts from 'src/@global/utils-typescript'

import { moveWaterToNextNode } from './moveWaterToNextNode'

const toggleElemsClassName = (elems: HTMLCollection, className: string) => {
  for (let i = 0; i < elems.length; i++) elems[i].classList.toggle(className)
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
  let delayCur = 0
  let cur: Even = from
  // step 1: drain
  delayCur += moveWaterToNextNode(cur, 'drain', flowDir, transitionSec, delayCur)
  cur += willMoveRight ? 2 : -2
  // step 2 (optional): pass
  while (cur !== to) {
    delayCur += moveWaterToNextNode(cur, 'pass', flowDir, transitionSec, delayCur)
    cur += willMoveRight ? 2 : -2
  }
  // step 3: stuck
  moveWaterToNextNode(cur, 'stuck', flowDir, transitionSec, delayCur)

  window.setTimeout(function () {
    if (navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')
    callback(to)
  }, (delayCur + transitionSec) * 1000)
  return delayCur
}
