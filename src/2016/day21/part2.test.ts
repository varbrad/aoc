import { readFile } from '../../utils/readFile'
import { part1, part2 } from './solution'

describe('2016 - Day 21 - Part 2', () => {
  it('sanity checks', () => {
    expect(
      part1('rotate based on position of letter a', 'abcdefgh'),
    ).toMatchInlineSnapshot(`"habcdefg"`)
    expect(
      part2('rotate based on position of letter a', 'habcdefg'),
    ).toMatchInlineSnapshot(`"abcdefgh"`)
    expect(
      part1('rotate based on position of letter b', 'abcdefgh'),
    ).toMatchInlineSnapshot(`"ghabcdef"`)
    expect(
      part2('rotate based on position of letter b', 'ghabcdef'),
    ).toMatchInlineSnapshot(`"abcdefgh"`)
    expect(
      part1('rotate based on position of letter c', 'abcdefgh'),
    ).toMatchInlineSnapshot(`"fghabcde"`)
    expect(
      part2('rotate based on position of letter c', 'fghabcde'),
    ).toMatchInlineSnapshot(`"abcdefgh"`)
    expect(
      part1('rotate based on position of letter d', 'abcdefgh'),
    ).toMatchInlineSnapshot(`"efghabcd"`)
    expect(
      part2('rotate based on position of letter d', 'efghabcd'),
    ).toMatchInlineSnapshot(`"abcdefgh"`)
    expect(
      part1('rotate based on position of letter e', 'abcdefgh'),
    ).toMatchInlineSnapshot(`"cdefghab"`)
    expect(
      part2('rotate based on position of letter e', 'cdefghab'),
    ).toMatchInlineSnapshot(`"abcdefgh"`)
    expect(
      part1('rotate based on position of letter f', 'abcdefgh'),
    ).toMatchInlineSnapshot(`"bcdefgha"`)
    expect(
      part2('rotate based on position of letter f', 'bcdefgha'),
    ).toMatchInlineSnapshot(`"abcdefgh"`)
    expect(
      part1('rotate based on position of letter g', 'abcdefgh'),
    ).toMatchInlineSnapshot(`"abcdefgh"`)
    expect(
      part2('rotate based on position of letter g', 'abcdefgh'),
    ).toMatchInlineSnapshot(`"abcdefgh"`)
    expect(
      part1('rotate based on position of letter h', 'abcdefgh'),
    ).toMatchInlineSnapshot(`"habcdefg"`)
    expect(
      part2('rotate based on position of letter h', 'habcdefg'),
    ).toMatchInlineSnapshot(`"abcdefgh"`)
  })
  it('should match a test case #1', () => {
    const input = `
      swap position 4 with position 0
      swap letter d with letter b
      reverse positions 0 through 4
      rotate left 1 step
      move position 1 to position 4
      move position 3 to position 0
      rotate based on position of letter b
      rotate based on position of letter d
    `
    expect(part2(input, 'decab')).toEqual('abcde')
  })
  it('should match a test case #2', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part2(input, 'dgfaehcb')).toEqual('abcdefgh')
  })
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part2(input, 'fbgdceah')).toMatchInlineSnapshot(`"fdhgacbe"`)
  })
})
