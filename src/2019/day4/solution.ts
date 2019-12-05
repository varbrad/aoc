export const part1 = (min: number, max: number): number => {
  let ok = 0
  const adjacentRegex = /(\d)\1/
  for (let i = min; i <= max; ++i) {
    const iStr = i.toString()
    // We need two adjacent digits
    const twoAdjacent = iStr.match(adjacentRegex)
    if (!twoAdjacent) continue
    // In-order
    const inOrder =
      iStr ===
      iStr
        .split('')
        .map(Number)
        .sort()
        .join('')
    if (!inOrder) continue
    ok++
  }
  return ok
}

export const part2 = (min: number, max: number): number => {
  let ok = 0
  const adjacentRegex = /(\d)\1*/g
  for (let i = min; i <= max; ++i) {
    const iStr = i.toString()
    const adjacents = iStr.match(adjacentRegex)
    const hasTwo = adjacents?.some(adjacent => adjacent.length === 2) ?? false
    if (!hasTwo) continue
    // In-order
    const inOrder =
      iStr ===
      iStr
        .split('')
        .map(Number)
        .sort()
        .join('')
    if (!inOrder) continue
    ok++
  }
  return ok
}
