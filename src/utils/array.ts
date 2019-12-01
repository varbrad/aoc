export const sumArray = (arr: number[], initial = 0): number =>
  arr.reduce((curr, n) => curr + n, initial)
