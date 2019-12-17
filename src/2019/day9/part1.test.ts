// import { readFile } from '../../utils/readFile'
import IntcodeVM2 from '../shared/intcode-2/vm'
import { IntcodeStatus } from '../shared/intcode-2/types'
import { readFile } from '../../utils/readFile'

describe('2019 - Day 9 - Part 1', () => {
  it.skip('should pass a simple example #1', () => {
    const input = '104,1125899906842624,99'
    const vm = new IntcodeVM2(input)
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getLastOutput()).toEqual(1125899906842624)
  })
  it.skip('should pass a simple example #2', () => {
    const input = '1102,34915192,34915192,7,4,7,99,0'
    const vm = new IntcodeVM2(input)
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getLastOutput()).toMatchInlineSnapshot(
      1219070632396864,
      `1219070632396864`,
    )
  })
  it.skip('should pass a simple example #3', () => {
    const input = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'
    const vm = new IntcodeVM2(input)
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getOutput().join(',')).toEqual(input)
  })
  it.skip('should pass a simple example #4', () => {
    const input = '3,1985,109,19,204,-34,99'
    const vm = new IntcodeVM2(input, 123)
    vm.setRelativeBaseOffset(2000)
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getLastOutput()).toEqual(123)
    expect(vm.getRelativeBaseOffset()).toEqual(2019)
  })
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    const vm = new IntcodeVM2(input, 1)
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getLastOutput()).toMatchInlineSnapshot(`2377080455`)
  })
})
