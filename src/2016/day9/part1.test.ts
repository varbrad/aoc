import { readFile } from '../../utils/readFile'
import { part1 } from './solution'

describe('2016 - Day 9 - Part 1', () => {
  it('should pass the simple test cases', () => {
    expect(part1('ADVENT')).toEqual(6)
    expect(part1('A(1x5)BC')).toEqual(7)
    expect(part1('(3x3)XYZ')).toEqual(9)
    expect(part1('A(2x2)BCD(2x2)EFG')).toEqual(11)
    expect(part1('(6x1)(1x3)A')).toEqual(6)
    expect(part1('X(8x2)(3x3)ABCY')).toEqual(18)
  })
  it('should work on our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input)).toMatchInlineSnapshot(`74532`)
  })
})
