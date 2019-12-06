import { readFile } from '../../utils/readFile'
import { part1 } from './solution'

describe('2019 - Day 6 - Part 1', () => {
  it('should pass a simple example', () => {
    const input = `
      COM)B
      B)C
      C)D
      D)E
      E)F
      B)G
      G)H
      D)I
      E)J
      J)K
      K)L
    `
    expect(part1(input)).toEqual(42)
  })
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input)).toMatchInlineSnapshot(`160040`)
  })
})
