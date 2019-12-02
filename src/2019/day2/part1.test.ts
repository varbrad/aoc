import { readFile } from '../../utils/readFile'
import { part1 } from './solution'

describe('2019 - Day 2 - Part 1', () => {
  it('should pass a simple test case #1', () => {
    expect(part1('1,9,10,3,2,3,11,0,99,30,40,50')).toEqual(3500)
  })
  it('should pass a simple test case #2', () => {
    expect(part1('1,0,0,0,99')).toEqual(2)
  })
  it('should pass a simple test case #3', () => {
    expect(part1('2,3,0,3,99')).toEqual(2)
  })
  it('should pass a simple test case #4', () => {
    expect(part1('2,4,4,5,99,0')).toEqual(2)
  })
  it('should pass a simple test case #5', () => {
    expect(part1('1,1,1,4,99,5,6,0,99')).toEqual(30)
  })
  it('should solve puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input, [12, 2])).toMatchInlineSnapshot(`3085697`)
  })
})
