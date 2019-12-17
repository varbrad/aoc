// import { readFile } from '../../utils/readFile'
import IntcodeVM2 from '../shared/intcode-2/vm'
import { IntcodeStatus } from '../shared/intcode-2/types'
import { readFile } from '../../utils/readFile'

describe('2019 - Day 9 - Part 2', () => {
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    const vm = new IntcodeVM2(input, 2)
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getLastOutput()).toMatchInlineSnapshot(`74917`)
  })
})
