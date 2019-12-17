import { readFile } from '../../utils/readFile'
import { part2 } from './solution'

describe('2019 - Day 8 - Part 2', () => {
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    const output = part2(input, [25, 6])
    expect(output).toEqual(true)
  })
})
