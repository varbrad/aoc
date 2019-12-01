import { sumArray } from '../../utils/array'
import { parseMultiLineInput } from '../../utils/input'

const getFuel = (n: number): number => Math.floor(n / 3) - 2
const getFuelRecursive = (n: number): number => {
  const fuel = getFuel(n)
  return fuel > 0 ? fuel + getFuelRecursive(fuel) : 0
}

export const part1 = (input: string): number => {
  const values = parseMultiLineInput(input, Number)
  return sumArray(values.map(getFuel))
}

export const part2 = (input: string): number => {
  const values = parseMultiLineInput(input, Number)
  return sumArray(values.map(getFuelRecursive))
}
