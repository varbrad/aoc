export function* permutateGn<T>(list: T[]): Generator<T[]> {
  const n = list.length
  const c: number[] = []
  for (let i = 0; i < n; ++i) c[i] = 0
  yield [...list]
  let i = 0
  while (i < n) {
    if (c[i] < i) {
      const swapIx = i % 2 === 0 ? 0 : c[i]
      const temp = list[swapIx]
      list[swapIx] = list[i]
      list[i] = temp
      yield [...list]
      c[i]++
      i = 0
    } else {
      c[i] = 0
      i++
    }
  }
}

export const permutate = <T>(n: T[]): T[][] => {
  const results: T[][] = []
  const permutor = permutateGn(n)
  while (true) {
    const result = permutor.next()
    if (result.done) break
    results.push(result.value)
  }
  return results
}

export const permutateWith = <T, U>(n: T[], fn: (p: T[]) => U): U[] => {
  const results: U[] = []
  const permutor = permutateGn(n)
  while (true) {
    const result = permutor.next()
    if (result.done) break
    results.push(fn(result.value))
  }
  return results
}
