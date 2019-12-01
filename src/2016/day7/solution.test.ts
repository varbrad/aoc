import { readFile } from '../../utils/readFile'
import { part1, part2 } from './solution'

describe('2016 - Day 7 - Part 1', () => {
  it('should pass test case #1', () => {
    expect(part1('abba[mnop]qrst')).toEqual(1)
  })
  it('should pass test case #2', () => {
    expect(part1('abcd[bddb]xyyx')).toEqual(0)
  })
  it('should pass test case #3', () => {
    expect(part1('aaaa[qwer]tyui')).toEqual(0)
  })
  it('should pass test case #4', () => {
    expect(part1('ioxxoj[asdfgh]zxcvbn')).toEqual(1)
  })
  it('should pass sumation test case', () => {
    expect(
      part1(`
      abba[mnop]qrst
      abcd[bddb]xyyx
      aaaa[qwer]tyui
      ioxxoj[asdfgh]zxcvbn
    `),
    ).toEqual(2)
  })
  it('should give our input result', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input)).toMatchInlineSnapshot(`105`)
  })
})

describe('2016 - Day 7 - Part 2', () => {
  it('should pass test case #1', () => {
    expect(part2('aba[bab]xyz')).toEqual(1)
  })
  it('should pass test case #2', () => {
    expect(part2('xyx[xyx]xyx')).toEqual(0)
  })
  it('should pass test case #3', () => {
    expect(part2('aaa[kek]eke')).toEqual(1)
  })
  it('should pass test case #4', () => {
    expect(part2('zazbz[bzb]cdb')).toEqual(1)
  })
  it('should pass sumation test case', () => {
    expect(
      part2(`
      aba[bab]xyz
      xyx[xyx]xyx
      aaa[kek]eke
      zazbz[bzb]cdb
    `),
    ).toEqual(3)
  })
  it('should give our input result', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part2(input)).toMatchInlineSnapshot(`258`)
  })
})
