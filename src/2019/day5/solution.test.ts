import { readFile } from '../../utils/readFile'
import IntcodeVM2 from '../shared/intcode-2/vm'

describe('2019 - Day 5', () => {
  it('should solve our puzzle input for part 1', () => {
    const input = readFile(__dirname, 'input.txt')
    const output = new IntcodeVM2(input, [1]).runAndOutput()
    expect(output).toMatchInlineSnapshot(`15386262`)
  })
  it('should solve our puzzle input for part 2', () => {
    const input = readFile(__dirname, 'input.txt')
    const output = new IntcodeVM2(input, [5]).runAndOutput()
    expect(output).toMatchInlineSnapshot(`10376124`)
  })
})
