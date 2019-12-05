import { part1, part2 } from './solution'

describe('2019 - Day 4 - Part 1', () => {
  it('should solve a simple test case', () => {
    expect(part1(111111, 111111)).toEqual(1)
  })
  it('should solve our puzzle input', () => {
    expect(part1(193651, 649729)).toMatchInlineSnapshot(`1605`)
  })
})

describe('2019 - Day 4 - Part 2', () => {
  it('should solve a simple test case #1', () => {
    expect(part2(112233, 112233)).toEqual(1)
  })
  it('should solve a simple test case #2', () => {
    expect(part2(123444, 123444)).toEqual(0)
  })
  it('should solve a simple test case #3', () => {
    expect(part2(111122, 111122)).toEqual(1)
  })
  it('should solve a simple test case #4', () => {
    expect(part2(112233, 112233)).toEqual(1)
  })
  it('should solve our puzzle input', () => {
    expect(part2(193651, 649729)).toMatchInlineSnapshot(`1102`)
  })
})
