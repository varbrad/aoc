import { readFile } from '../../utils/readFile'
import { part1 } from './solution'

describe('2019 - Day 7 - Part 1', () => {
  it('should pass a simple example #1', () => {
    const input = '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0'
    expect(part1(input)).toEqual(43210)
  })
  it('should pass a simple example #2', () => {
    const input =
      '3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0'
    expect(part1(input)).toEqual(54321)
  })
  it('should pass a simple example #3', () => {
    const input =
      '3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0'
    expect(part1(input)).toEqual(65210)
  })
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input)).toMatchInlineSnapshot(`255590`)
  })
})
