export const setLocalStorage = (storage: string, val: string) => {
  localStorage.setItem(storage, val)
}
export const updateRef = <T>(ref: React.MutableRefObject<T>, val: T): void => {
  ref.current = val
}
export const getInitTabIndex = (storage: string) => parseInt(localStorage.getItem(storage) ?? '0')
