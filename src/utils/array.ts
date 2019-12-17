export const sumArray = (arr: number[], initial = 0): number =>
  arr.reduce((curr, n) => curr + n, initial)

export const shallowArrayEqual = <T>(a: T[], b: T[]): boolean => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const flatten = <T>(a: T[][]): T[] => {
  return a.flatMap(v => v)
}

export const ensureArray = <T>(a: T | T[]): T[] => {
  if (Array.isArray(a)) return a
  return [a]
}
