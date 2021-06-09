import { WaveArguments } from 'my-wave-type'

import { stripHTMLWhitespaces } from 'src/@global/utils'
import { moveItemsAlongWave } from './moveItemsAlongWave'
import wave from 'src/canvas/wave/wave'

const getDocWithItems = (numItems: number) => {
  return stripHTMLWhitespaces('<div>' + '<div class="item">Item</div>'.repeat(numItems) + '</div>')
}

const waveProps: WaveArguments = {
  index: 0,
  from: { x: 0, y: 738 },
  to: { x: 1280, y: 738 },
  totalPoints: 5,

  height: 0,
  speed: 0,
  shakiness: 0,
}
const waveMock = wave(waveProps)

describe('test items length', () => {
  test('must get ERROR when items length >= number of points on the wave', () => {
    document.body.innerHTML = getDocWithItems(5)
    const items = document.body.querySelectorAll('.item') as NodeListOf<HTMLElement>
    expect(moveItemsAlongWave(items, waveMock, 0)).toBe(1)
  })

  test('must get SUCCESS when items length < number of points on the wave', () => {
    document.body.innerHTML = getDocWithItems(4)
    const items = document.body.querySelectorAll('.item') as NodeListOf<HTMLElement>
    expect(moveItemsAlongWave(items, waveMock, 0)).toBe(0)
  })
})

test('assume the wave is steady horizontally, all items must float on it but not rotate', () => {
  document.body.innerHTML = getDocWithItems(4)
  const items = document.body.querySelectorAll('.item') as NodeListOf<HTMLElement>
  moveItemsAlongWave(items, waveMock, 0)
  expect(items[0].style.transform).toBe('translateY(738px) rotate(0deg)')
  expect(items[1].style.transform).toBe('translateY(738px) rotate(0deg)')
  expect(items[2].style.transform).toBe('translateY(738px) rotate(0deg)')
  expect(items[3].style.transform).toBe('translateY(738px) rotate(0deg)')
})
