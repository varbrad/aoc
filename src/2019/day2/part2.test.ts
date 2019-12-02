import { readFile } from '../../utils/readFile'
import { part2 } from './solution'

describe('2019 - Day 2 - Part 2', () => {
  it('should solve puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part2(input, 19690720)).toMatchInlineSnapshot(`9425`)
  })
})
