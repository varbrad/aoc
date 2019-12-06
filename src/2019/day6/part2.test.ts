import { readFile } from '../../utils/readFile'
import { part2 } from './solution'

describe('2019 - Day 6 - Part 2', () => {
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
      K)YOU
      I)SAN
    `
    expect(part2(input)).toEqual(4)
  })
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part2(input)).toMatchInlineSnapshot(`373`)
  })
})
