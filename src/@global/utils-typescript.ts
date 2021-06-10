export const isType = <T>(subject: unknown, possibleValues: T[]): subject is T => {
  return possibleValues.includes(subject as T)
}
