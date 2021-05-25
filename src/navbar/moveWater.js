export const moveWater = (from, to, transitionSec) => {
  if(from === to) return

  const willMoveRight = to > from
  const flowDir = willMoveRight ? 'right' : 'left'
  let delayCur = 0
  let cur = from
  // step 1: drain
  delayCur += moveWaterToNextNode(cur, 'drain', flowDir, transitionSec, delayCur)
  cur += willMoveRight ? 2 : -2
  // step 2 (optional): pass
  while(cur !== to) {
    delayCur += moveWaterToNextNode(cur, 'pass', flowDir, transitionSec, delayCur)
    cur += willMoveRight ? 2 : -2
  }
  // step 3: stuck
  moveWaterToNextNode(cur, 'stuck', flowDir, transitionSec, delayCur)

  return delayCur
}

const moveWaterToNextNode = (textIndex, mode, flowDir, totalTime, delay) => {
       if(mode === 'drain' && flowDir === 'left')  return waterDrainToLeft(textIndex, totalTime, delay)
  else if(mode === 'drain' && flowDir === 'right') return waterDrainToRight(textIndex, totalTime, delay)
  else if(mode === 'pass'  && flowDir === 'left')  return waterPassToLeft(textIndex, totalTime, delay)
  else if(mode === 'pass'  && flowDir === 'right') return waterPassToRight(textIndex, totalTime, delay)
  else if(mode === 'stuck' && flowDir === 'left')  return waterStuckToLeft(textIndex, delay)
  else if(mode === 'stuck' && flowDir === 'right') return waterStuckToRight(textIndex, delay)
}

const waterDrainToLeft = (textIndex, totalTime, delay) => {
  triggerWaterFlow(textIndex, 'drain-to-left-text', delay)
  triggerWaterFlow(textIndex + 1, 'drain-to-left-valve', delay)

  const nextDelay = (totalTime * 1.16) * 20/116
  return nextDelay
}
const waterDrainToRight = (textIndex, totalTime, delay) => {
  triggerWaterFlow(textIndex, 'drain-to-right-text', delay)
  triggerWaterFlow(textIndex + 1, 'drain-to-right-valve', delay)

  const nextDelay = (totalTime * 1) * 4/100
  return nextDelay
}
const waterPassToLeft = (textIndex, totalTime, delay) => {
  triggerWaterFlow(textIndex, 'pass-to-left-text', delay)
  triggerWaterFlow(textIndex + 1, 'pass-to-left-valve', delay)

  const nextDelay = (totalTime * 2.16) * 120/216
  return nextDelay
}
const waterPassToRight = (textIndex, totalTime, delay) => {
  triggerWaterFlow(textIndex, 'pass-to-right-text', delay)
  triggerWaterFlow(textIndex + 1, 'pass-to-right-valve', delay)

  const nextDelay = (totalTime * 2.16) * 120/216
  return nextDelay
}
const waterStuckToLeft = (textIndex, delay) => {
  triggerWaterFlow(textIndex, 'stuck-to-left-text', delay)
  triggerWaterFlow(textIndex + 1, 'stuck-to-left-valve', delay)
  return 0
}
const waterStuckToRight = (textIndex, delay) => {
  triggerWaterFlow(textIndex, 'stuck-to-right-text', delay)
  triggerWaterFlow(textIndex + 1, 'stuck-to-right-valve', delay)
  return 0
}

const triggerWaterFlow = (highlighterNum, className, delaySec) => {
  const highlighter = document.getElementById('nav__highlighter-item' + highlighterNum)
  if (!highlighter) return
  highlighter.className = 'nav__highlighter-item'
  highlighter.classList.add(className)
  highlighter.style.animationDelay = delaySec + 's'
  // window.setTimeout(function() {
  // }, 0)
//   highlighter.onanimationend = () => {
//     highlighter.classList.remove('nav__highlighter-item--init')
//     highlighter.classList.remove(className)
//     highlighter.style.animationDelay = '0'
//   }
}
