import { WaveProps } from 'ts-type-wave'

import { stripHTMLWhitespaces } from 'src/@global/utils'
import { moveItemsAlongWave } from './moveItemsAlongWave'
import wave from 'src/canvas/wave/wave'

const getDocWithDupeItems = (numItems: number) => {
  return stripHTMLWhitespaces('<div>' + '<div class="item">Item</div>'.repeat(numItems) + '</div>')
}

const waveProps: WaveProps = {
  index: 0,
  from: { x: 0, y: 738 },
  to: { x: 1280, y: 738 },
  totalPoints: 5,
}
const waveMock = wave(waveProps)

describe('test items length', () => {
  test('must get ERROR status when items length >= number of points on the wave', () => {
    document.body.innerHTML = getDocWithDupeItems(5)
    const items = document.body.querySelectorAll('.item') as NodeListOf<HTMLElement>
    expect(moveItemsAlongWave(items, waveMock, 0)).toBe(1)
  })

  test('must get SUCCESS status when items length < number of points on the wave', () => {
    document.body.innerHTML = getDocWithDupeItems(4)
    const items = document.body.querySelectorAll('.item') as NodeListOf<HTMLElement>
    expect(moveItemsAlongWave(items, waveMock, 0)).toBe(0)
  })
})

test('assume the wave is steady horizontally, all items must float on it but not rotate', () => {
  document.body.innerHTML = getDocWithDupeItems(4)
  const items = document.body.querySelectorAll('.item') as NodeListOf<HTMLElement>
  moveItemsAlongWave(items, waveMock, 0)
  expect(items[0].style.transform).toBe('translateY(738px) rotate(0deg)')
  expect(items[1].style.transform).toBe('translateY(738px) rotate(0deg)')
  expect(items[2].style.transform).toBe('translateY(738px) rotate(0deg)')
  expect(items[3].style.transform).toBe('translateY(738px) rotate(0deg)')
})
