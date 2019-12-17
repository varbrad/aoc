import IntcodeVM2 from './vm'
import { IntcodeStatus } from './types'

describe('Intcode 2.0', () => {
  it('should do nothing to null program', () => {
    const vm = new IntcodeVM2('99')
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getOutput()).toEqual([])
  })

  it('uses async stuff to be better', () => {
    const vm = new IntcodeVM2('1,9,10,3,2,3,11,0,99,30,40,50')
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getMemory()[0]).toEqual(3500)
  })

  it('should parse some simple programs', () => {
    const vm = new IntcodeVM2('1,0,0,0,99')
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getMemory()).toEqual([2, 0, 0, 0, 99])
  })

  it('should parse a program with parameter modes', () => {
    const vm = new IntcodeVM2('1002,4,3,4,33')
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getMemory()).toEqual([1002, 4, 3, 4, 99])
  })

  it('should solve a program if input equals 8', () => {
    const vm = new IntcodeVM2('3,9,8,9,10,9,4,9,99,-1,8')

    // 7
    vm.addInput(7)
    vm.run()
    expect(vm.getLastOutput()).toEqual(0)

    // 8
    vm.reset()
    vm.addInput(8)
    vm.run()
    expect(vm.getLastOutput()).toEqual(1)

    // 9
    vm.reset()
    vm.addInput(9)
    vm.run()
    expect(vm.getLastOutput()).toEqual(0)
  })

  it('should solve a program if input is non-zero/zero', () => {
    const vm = new IntcodeVM2('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9')

    // 5
    vm.addInput(5)
    vm.run()
    expect(vm.getLastOutput()).toEqual(1)

    // 0
    vm.reset()
    vm.addInput(0)
    vm.run()
    expect(vm.getLastOutput()).toEqual(0)
  })

  it('should run a program that determines if program is 0/1', () => {
    const vm = new IntcodeVM2('3,3,1105,-1,9,1101,0,0,12,4,12,99,1')

    // -9
    vm.addInput(-9)
    vm.run()
    expect(vm.getLastOutput()).toEqual(1)

    // 0
    vm.reset()
    vm.addInput(0)
    vm.run()
    expect(vm.getLastOutput()).toEqual(0)
  })

  it('should solve a program if input GT, EQ or LT 8', () => {
    const vm = new IntcodeVM2(`
      3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
    `)

    // 999
    vm.addInput(7)
    vm.run()
    expect(vm.getLastOutput()).toEqual(999)

    // 1000
    vm.reset()
    vm.addInput(8)
    vm.run()
    expect(vm.getLastOutput()).toEqual(1000)

    // 1001
    vm.reset()
    vm.addInput(9)
    vm.run()
    expect(vm.getLastOutput()).toEqual(1001)
  })

  it('should wait for input, and calculate a simple addition', () => {
    const [a, b] = [40, 90]
    const vm = new IntcodeVM2('3,11,3,12,1,11,12,13,4,13,99,-1,-1,-1')
    expect(vm.run()).toEqual(IntcodeStatus.NO_INPUT)
    expect(vm.run()).toEqual(IntcodeStatus.NO_INPUT)
    vm.addInput(a)
    expect(vm.run()).toEqual(IntcodeStatus.NO_INPUT)
    expect(vm.run()).toEqual(IntcodeStatus.NO_INPUT)
    vm.addInput(b)
    expect(vm.run()).toEqual(IntcodeStatus.EXIT)
    expect(vm.getLastOutput()).toEqual(a + b)
  })
})
