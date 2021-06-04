import { flowDirection, flowMode } from 'my-nav-type'
import { Even } from 'my-math-type'

export const moveWater = (from: Even, to: Even, transitionSec: number): number => {
  if (from === to || from < 0 || to < 0) return 0

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

  return delayCur
}

const moveWaterToNextNode = (
  textIndex: number,
  mode: flowMode,
  flowDir: flowDirection,
  totalTime: number,
  delay: number
): number => {
  if (mode === 'drain' && flowDir === 'left') return waterDrainToLeft(textIndex, totalTime, delay)
  else if (mode === 'drain' && flowDir === 'right') return waterDrainToRight(textIndex, totalTime, delay)
  else if (mode === 'pass' && flowDir === 'left') return waterPassToLeft(textIndex, totalTime, delay)
  else if (mode === 'pass' && flowDir === 'right') return waterPassToRight(textIndex, totalTime, delay)
  else if (mode === 'stuck' && flowDir === 'left') return waterStuckToLeft(textIndex, delay)
  else if (mode === 'stuck' && flowDir === 'right') return waterStuckToRight(textIndex, delay)
  else return 0
}

const waterDrainToLeft = (textIndex: number, totalTime: number, delay: number): number => {
  triggerWaterFlow(textIndex, 'drain-to-left-text', delay)
  triggerWaterFlow(textIndex + 1, 'drain-to-left-valve', delay)

  const nextDelay = (totalTime * 1.16 * 20) / 116
  return nextDelay
}
const waterDrainToRight = (textIndex: number, totalTime: number, delay: number): number => {
  triggerWaterFlow(textIndex, 'drain-to-right-text', delay)
  triggerWaterFlow(textIndex + 1, 'drain-to-right-valve', delay)

  const nextDelay = (totalTime * 1 * 4) / 100
  return nextDelay
}
const waterPassToLeft = (textIndex: number, totalTime: number, delay: number): number => {
  triggerWaterFlow(textIndex, 'pass-to-left-text', delay)
  triggerWaterFlow(textIndex + 1, 'pass-to-left-valve', delay)

  const nextDelay = (totalTime * 2.16 * 120) / 216
  return nextDelay
}
const waterPassToRight = (textIndex: number, totalTime: number, delay: number): number => {
  triggerWaterFlow(textIndex, 'pass-to-right-text', delay)
  triggerWaterFlow(textIndex + 1, 'pass-to-right-valve', delay)

  const nextDelay = (totalTime * 2.16 * 120) / 216
  return nextDelay
}
const waterStuckToLeft = (textIndex: number, delay: number): number => {
  triggerWaterFlow(textIndex, 'stuck-to-left-text', delay)
  triggerWaterFlow(textIndex + 1, 'stuck-to-left-valve', delay)
  return 0
}
const waterStuckToRight = (textIndex: number, delay: number): number => {
  triggerWaterFlow(textIndex, 'stuck-to-right-text', delay)
  triggerWaterFlow(textIndex + 1, 'stuck-to-right-valve', delay)
  return 0
}

const triggerWaterFlow = (highlighterNum: number, className: string, delaySec: number): void => {
  const highlighter = document.getElementById('nav__highlighter-item' + highlighterNum) as HTMLElement
  if (!highlighter) return
  highlighter.className = 'nav__highlighter-item'
  highlighter.classList.add(className)
  highlighter.style.animationDelay = delaySec + 's'
}
