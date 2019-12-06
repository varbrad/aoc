import { readFile } from '../../utils/readFile'
import intcodeVm from '../shared/intcode/intcode-vm'

describe('2019 - Day 5', () => {
  it('should solve our puzzle input for part 1', () => {
    const input = readFile(__dirname, 'input.txt')
    const output = intcodeVm(input, 1).output
    expect(output.pop()).toMatchInlineSnapshot(`15386262`)
  })
  it('should solve our puzzle input for part 2', () => {
    const input = readFile(__dirname, 'input.txt')
    const output = intcodeVm(input, 5).output
    expect(output.pop()).toMatchInlineSnapshot(`10376124`)
  })
})
