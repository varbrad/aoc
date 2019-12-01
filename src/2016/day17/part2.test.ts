import { part2 } from './solution'

describe('2016 - Day 17 - Part 2', () => {
  it('should pass an example test case', () => {
    expect(part2('ihgpwlah')).toEqual(370)
  })
  it('should pass a slightly more complex test case', () => {
    expect(part2('kglvqrro')).toEqual(492)
  })
  it('should pass a complex test case', () => {
    expect(part2('ulqzkmiv')).toEqual(830)
  })
  it('should solve our puzzle input', () => {
    expect(part2('awrkjxxr')).toMatchInlineSnapshot(`526`)
  })
})
