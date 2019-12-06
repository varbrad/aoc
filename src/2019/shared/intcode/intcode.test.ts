import intcodeVm from './intcode-vm'

describe('Intcode VM', () => {
  it('should do nothing to null program', () => {
    const state = intcodeVm('99')
    expect(state.memory).toEqual([99])
    expect(state.output).toEqual([])
  })
  it('should parse a variety of simple programs', () => {
    expect(intcodeVm('1,0,0,0,99').memory).toEqual([2, 0, 0, 0, 99])
    expect(intcodeVm('2,3,0,3,99').memory).toEqual([2, 3, 0, 6, 99])
    expect(intcodeVm('2,4,4,5,99,0').memory).toEqual([2, 4, 4, 5, 99, 9801])
    expect(intcodeVm('1,1,1,4,99,5,6,0,99').memory).toEqual([
      30,
      1,
      1,
      4,
      2,
      5,
      6,
      0,
      99,
    ])
  })
  it('should parse a slightly more complex program', () => {
    const state = intcodeVm('1,9,10,3,2,3,11,0,99,30,40,50')
    expect(state.memory).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50])
  })
  it('should parse a program with parameter modes', () => {
    expect(intcodeVm('1002,4,3,4,33').memory).toEqual([1002, 4, 3, 4, 99])
  })
  it('should solve if the input equals 8', () => {
    expect(intcodeVm('3,9,8,9,10,9,4,9,99,-1,8', 7).output).toEqual([0])
    expect(intcodeVm('3,9,8,9,10,9,4,9,99,-1,8', 8).output).toEqual([1])
    expect(intcodeVm('3,9,8,9,10,9,4,9,99,-1,8', 9).output).toEqual([0])
  })
  it('should return 1 if non-zero and 0 if zero', () => {
    expect(
      intcodeVm('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', 5).output,
    ).toEqual([1])
    expect(
      intcodeVm('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', 0).output,
    ).toEqual([0])
    expect(
      intcodeVm('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', -9).output,
    ).toEqual([1])
    expect(intcodeVm('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', 0).output).toEqual([
      0,
    ])
  })
  it('should return 999, 1000, 1001 dependent on if number is >, === or < 8', () => {
    const program = `
      3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
    `
    expect(intcodeVm(program, 7).output).toEqual([999])
    expect(intcodeVm(program, 8).output).toEqual([1000])
    expect(intcodeVm(program, 9).output).toEqual([1001])
  })
})
