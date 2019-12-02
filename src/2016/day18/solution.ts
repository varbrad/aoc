import { shallowArrayEqual } from '../../utils/array'

enum Cell {
  TRAP = '^',
  SAFE = '.',
}

const trapRules = [
  [Cell.TRAP, Cell.TRAP, Cell.SAFE],
  [Cell.SAFE, Cell.TRAP, Cell.TRAP],
  [Cell.TRAP, Cell.SAFE, Cell.SAFE],
  [Cell.SAFE, Cell.SAFE, Cell.TRAP],
]

const nextRow = (row: Cell[]): Cell[] => {
  return row.map((value, ix) => {
    const cells = [-1, 0, 1].map(v => row[ix + v] ?? Cell.SAFE)
    return trapRules.some(rule => shallowArrayEqual(rule, cells))
      ? Cell.TRAP
      : Cell.SAFE
  })
}

export const part1 = (input: string, rows: number): number => {
  let cells: Cell[] = input
    .trim()
    .split('')
    .map(v => (v === '.' ? Cell.SAFE : Cell.TRAP))

  let safeCells = 0

  for (let i = 0; i < rows; ++i) {
    safeCells += cells.filter(cell => cell === Cell.SAFE).length
    cells = nextRow(cells)
  }

  return safeCells
}

export const part2 = (input: string, rows: number): number => part1(input, rows)
