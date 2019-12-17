import { readFile } from '../../utils/readFile'
import { part1 } from './solution'

describe('2019 - Day 8 - Part 1', () => {
  it('should pass a simple example #3', () => {
    const input = '123456789012'
    expect(part1(input, [3, 2])).toEqual(1)
  })
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input, [25, 6])).toMatchInlineSnapshot(`1224`)
  })
})
