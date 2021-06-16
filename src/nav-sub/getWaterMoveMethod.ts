import Nav from 'ts-type-nav'

type Return = (...args: number[]) => number
export const getWaterMoveMethod = (flowDir: Nav.FlowDirection, mode: Nav.FlowMode): Return => {
  if (mode === 'drain' && flowDir === 'left') return waterDrainToLeft
  else if (mode === 'drain' && flowDir === 'right') return waterDrainToRight
  else if (mode === 'pass' && flowDir === 'left') return waterPassToLeft
  else if (mode === 'pass' && flowDir === 'right') return waterPassToRight
  else if (mode === 'stuck' && flowDir === 'left') return waterStuckToLeft
  else if (mode === 'stuck' && flowDir === 'right') return waterStuckToRight
  else return () => 0
}

const waterDrainToLeft = (textIndex: number, delay: number, totalTime = 0): number => {
  triggerWaterFlow(textIndex, 'drain-to-left-text', delay)
  triggerWaterFlow(textIndex + 1, 'drain-to-left-valve', delay)

  const nextDelay = (totalTime * 1.16 * 20) / 116
  return nextDelay
}
const waterDrainToRight = (textIndex: number, delay: number, totalTime = 0): number => {
  triggerWaterFlow(textIndex, 'drain-to-right-text', delay)
  triggerWaterFlow(textIndex + 1, 'drain-to-right-valve', delay)

  const nextDelay = (totalTime * 1 * 4) / 100
  return nextDelay
}
const waterPassToLeft = (textIndex: number, delay: number, totalTime = 0): number => {
  triggerWaterFlow(textIndex, 'pass-to-left-text', delay)
  triggerWaterFlow(textIndex + 1, 'pass-to-left-valve', delay)

  const nextDelay = (totalTime * 2.16 * 120) / 216
  return nextDelay
}
const waterPassToRight = (textIndex: number, delay: number, totalTime = 0): number => {
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
  const highlighter = document.getElementById('nav-sub__highlighter-item' + highlighterNum) as HTMLElement
  if (!highlighter) return
  highlighter.className = 'nav-sub__highlighter-item'
  highlighter.classList.add(className)
  highlighter.style.animationDelay = delaySec + 's'
}
