import { readFile } from '../../utils/readFile'
import { part1 } from './day1'

const input = readFile(__dirname, 'input.txt')

describe('Day 1 - Part 1', () => {
  it('should pass test case A', () => {
    expect(part1('R2, L3')).toEqual(5)
  })

  it('should pass test case B', () => {
    expect(part1('R2, R2, R2')).toEqual(2)
  })

  it('should pass test case C', () => {
    expect(part1('R5, L5, R5, R3')).toEqual(12)
  })

  it('should pass test case D', () => {
    expect(part1('R20, L5, R0, R0, L20')).toEqual(40)
  })

  it('should produce a value for part 1', () => {
    expect(part1(input)).toMatchInlineSnapshot(`106`)
  })
})
