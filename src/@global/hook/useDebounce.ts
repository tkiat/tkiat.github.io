import React from 'react'

const useDebounce = <T>(value: T, msDelay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState(value)
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, msDelay)

    // cleanup when value changes within the msDelay period
    return () => {
      clearTimeout(handler)
    }
  }, [value, msDelay])
  return debouncedValue
}

export default useDebounce
