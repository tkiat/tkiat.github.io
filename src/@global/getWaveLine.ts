import { NavMainIndex } from 'my-nav-type'
import { Dimension, Line } from 'my-util-type'

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
