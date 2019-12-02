import { readFile } from '../../utils/readFile'
import { part1 } from './solution'

describe('2016 - Day 18 - Part 1', () => {
  it('should pass an example test case #1', () => {
    expect(part1('..^^.', 3)).toEqual(6)
  })
  it('should pass an example test case #2', () => {
    expect(part1('.^^.^.^^^^', 10)).toEqual(38)
  })
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input, 40)).toMatchInlineSnapshot(`1982`)
  })
})
