import React from 'react'
import { useImmer } from 'use-immer'

import { Dimension } from 'ts-type-util'

import useDebounce from './useDebounce'

const useViewportDimensions = (msDelay: number): Dimension => {
  const [dimensions, setDimensions] = useImmer<Dimension>({
    h: document.documentElement.clientHeight,
    w: document.documentElement.clientWidth,
  })
  const debouncedDimension = useDebounce<Dimension>(dimensions, msDelay)

  React.useEffect(() => {
    const debouncedHandleResize = () => {
      setDimensions((draft) => {
        draft.h = document.documentElement.clientHeight
        draft.w = document.documentElement.clientWidth
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
