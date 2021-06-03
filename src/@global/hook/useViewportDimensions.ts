import React from 'react'
import {useImmer} from 'use-immer'

import useDebounce from './useDebounce'

type Dimension = {'height': number, 'width': number}

const useViewportDimensions = (msDelay: number): Dimension => {

  const [dimensions, setDimensions] = useImmer<Dimension>({
    height: document.documentElement.clientHeight,
    width: document.documentElement.clientWidth
  })
  const debouncedDimension = useDebounce<Dimension>(dimensions, msDelay)

  React.useEffect(() => {
    const debouncedHandleResize = () => {
      setDimensions(draft => {
        draft.height = document.documentElement.clientHeight
        draft.width = document.documentElement.clientWidth
      })
    }
    window.addEventListener('resize', debouncedHandleResize)
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  }, [setDimensions])

  return debouncedDimension
}

export default useViewportDimensions
