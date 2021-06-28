export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)
export const pathToTestId = (path: string) => 'page' + path.toLowerCase().split('/').join('-')
export const stripHTMLWhitespaces = (str: string) => str.replace(/>\s+</g, '><')
