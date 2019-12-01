import { readFile } from '../../utils/readFile'
import { part1, part2 } from './solution'

describe('2019 - Day 1 - Part 1', () => {
  it('should pass a basic test case #1', () => {
    expect(part1('12')).toEqual(2)
  })
  it('should pass a basic test case #2', () => {
    expect(part1('14')).toEqual(2)
  })
  it('should pass a basic test case #3', () => {
    expect(part1('1969')).toEqual(654)
  })
  it('should pass a basic test case #4', () => {
    expect(part1('100756')).toEqual(33583)
  })
  it('should pass a sumation test case', () => {
    expect(
      part1(`
    14
    12
    1969
    100756
    `),
    ).toEqual(33583 + 654 + 2 + 2)
  })
  it('should give our input result', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input)).toMatchInlineSnapshot(`3414791`)
  })
})

describe('2019 - Day 1 - Part 2', () => {
  it('should pass a basic test case #1', () => {
    expect(part2('12')).toEqual(2)
  })
  it('should pass a basic test case #2', () => {
    expect(part2('14')).toEqual(2)
  })
  it('should pass a basic test case #3', () => {
    expect(part2('1969')).toEqual(966)
  })
  it('should pass a basic test case #4', () => {
    expect(part2('100756')).toEqual(50346)
  })
  it('should pass a sumation test case', () => {
    expect(
      part2(`
    12
    14
    1969
    100756
    `),
    ).toEqual(50346 + 966 + 2 + 2)
  })
  it('should give our input result', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part2(input)).toMatchInlineSnapshot(`5119312`)
  })
})
