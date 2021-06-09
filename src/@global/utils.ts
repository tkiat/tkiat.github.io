export const getInitTabIndex = (storage: string) => parseInt(localStorage.getItem(storage) ?? '0')
export const stripHTMLWhitespaces = (str: string) => str.replace(/>\s+</g, '><')
export const updateRef = <T>(ref: React.MutableRefObject<T>, val: T): void => {
  ref.current = val
}
