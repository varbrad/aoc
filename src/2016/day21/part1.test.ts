import { readFile } from '../../utils/readFile'
import { part1 } from './solution'

describe('2016 - Day 21 - Part 1', () => {
  it('should pass an example test case', () => {
    const input = `
      swap position 4 with position 0
      swap letter d with letter b
      reverse positions 0 through 4
      rotate left 1 step
      move position 1 to position 4
      move position 3 to position 0
      rotate based on position of letter b
      rotate based on position of letter d
    `
    expect(part1(input, 'abcde')).toEqual('decab')
  })
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input, 'abcdefgh')).toMatchInlineSnapshot(`"dgfaehcb"`)
  })
})
