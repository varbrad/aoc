import { readFile } from '../../utils/readFile'
import { part1 } from './solution'

describe('2019 - Day 3 - Part 1', () => {
  it('should pass a simple test case # 1', () => {
    const input = `
      R8,U5,L5,D3
      U7,R6,D4,L4
    `
    expect(part1(input)).toEqual(6)
  })
  it('should pass a simple test case #2', () => {
    const input = `
      R75,D30,R83,U83,L12,D49,R71,U7,L72
      U62,R66,U55,R34,D71,R55,D58,R83
    `
    expect(part1(input)).toEqual(159)
  })
  it('should pass a simple test case #3', () => {
    const input = `
      R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
      U98,R91,D20,R16,D67,R40,U7,R15,U6,R7
    `
    expect(part1(input)).toEqual(135)
  })
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input)).toMatchInlineSnapshot(`2193`)
  })
})
