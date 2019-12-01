import { part1 } from './solution'

describe('2016 - Day 13 - Part 1', () => {
  it('should solve a simple puzzle', () => {
    expect(part1(10, { x: 1, y: 1 }, { x: 7, y: 4 })).toEqual(11)
  })
  it('should solve our puzzle input', () => {
    expect(part1(1358, { x: 1, y: 1 }, { x: 31, y: 39 })).toMatchInlineSnapshot(
      `96`,
    )
  })
})
