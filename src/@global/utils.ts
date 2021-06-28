export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)
// export const getArr = (from: number, to: number) => (to > from ? [...Array(to - from).keys()].map((i) => i + from) : [])
export const pathToTestId = (path: string) => 'page' + path.toLowerCase().split('/').join('-')
export const stripHTMLWhitespaces = (str: string) => str.replace(/>\s+</g, '><')
