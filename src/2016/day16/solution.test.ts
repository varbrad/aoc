import { part1 } from './solution'

describe('2016 - Day 16 - Part 1', () => {
  it('should match test case', () => {
    expect(part1('10000', 20)).toEqual('01100')
  })

  it('should solve our puzzle input', () => {
    const input = '01111010110010011'
    expect(part1(input, 272)).toMatchInlineSnapshot(`"00100111000101111"`)
  })
})

describe('2016 - Day 16 - Part 2', () => {
  it('should solve our puzzle input', () => {
    const input = '01111010110010011'
    expect(part1(input, 35651584)).toMatchInlineSnapshot(`"11101110011100110"`)
  })
})
