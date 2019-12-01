import { sumArray } from '../../utils/array'

const parseInput = (input: string): number[] =>
  input
    .trim()
    .split('\n')
    .map(str => Number(str.trim()))

const getFuel = (n: number): number => Math.floor(n / 3) - 2
const getFuelRecursive = (n: number): number => {
  const fuel = getFuel(n)
  return fuel > 0 ? fuel + getFuelRecursive(fuel) : 0
}

export const part1 = (input: string): number => {
  const values = parseInput(input)
  return sumArray(values.map(getFuel))
}

export const part2 = (input: string): number => {
  const values = parseInput(input)
  return sumArray(values.map(getFuelRecursive))
}
