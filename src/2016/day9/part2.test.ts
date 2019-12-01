import { readFile } from '../../utils/readFile'
import { part2 } from './solution'

describe('2016 - Day 9 - Part 2', () => {
  it('should pass the simple test cases', () => {
    expect(part2('ADVENT')).toEqual(6)
    expect(part2('A(1x5)BC')).toEqual(7)
    expect(part2('(3x3)XYZ')).toEqual(9)
    expect(part2('X(8x2)(3x3)ABCY')).toEqual(20)
    expect(part2('(27x12)(20x12)(13x14)(7x10)(1x12)A')).toEqual(241920)
    expect(
      part2('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN'),
    ).toEqual(445)
  })
  it('should work on our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part2(input)).toMatchInlineSnapshot(`11558231665`)
  })
})
