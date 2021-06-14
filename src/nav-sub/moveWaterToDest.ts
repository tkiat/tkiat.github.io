import { Even } from 'ts-type-util'

import { moveWater } from './moveWater'

const toggleElemsClassName = (elems: HTMLCollection, className: string) => {
  for (let i = 0; i < elems.length; i++) elems[i].classList.toggle(className)
}

export const moveWaterToDest = (plan: { from: Even | -1; to: Even | -1 }, callback: (to: Even) => void) => {
  const from = plan.from
  const to = plan.to
  if (from === to || from === -1 || to === -1) return

  const skipAnimation = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (skipAnimation) {
    callback(to)
    return
  } else {
    const navTube = document.getElementById('nav-sub-tube')
    const navLinkItems = navTube && navTube.getElementsByClassName('nav-sub__link')
    if (navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')

    const transitionSec = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anim-period'))

    const delayTotal = moveWater(from, to, transitionSec)

    window.setTimeout(function () {
      if (navLinkItems) toggleElemsClassName(navLinkItems, 'waiting')
      callback(to)
    }, (delayTotal + transitionSec) * 1000)
  }
}
