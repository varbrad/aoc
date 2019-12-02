import { readFile } from '../../utils/readFile'
import { part2 } from './solution'

describe('2016 - Day 18 - Part 2', () => {
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part2(input, 400000)).toMatchInlineSnapshot(`20005203`)
  })
})
