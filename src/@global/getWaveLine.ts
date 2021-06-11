import { NavMainIndex } from 'ts-type-nav'
import { Dimension, Line } from 'ts-type-util'

export default (viewport: Dimension): { [k in NavMainIndex]: Line } => ({
  0: {
    from: {
      x: 0,
      y: viewport.height - 30,
    },
    to: {
      x: viewport.width,
      y: viewport.height - 30,
    },
  },
  1: {
    from: {
      x: 0,
      y: viewport.height - 30,
    },
    to: {
      x: viewport.width,
      y: viewport.height - 30,
    },
  },
  2: {
    from: {
      x: 0,
      y: 120,
    },
    to: {
      x: viewport.width,
      y: 200,
    },
  },
})
