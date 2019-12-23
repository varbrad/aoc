import { readFile } from '../../utils/readFile'
import { part1 } from './solution'

describe('2019 - Day 10 - Part 1', () => {
  it('should solve a simple puzzle #1', () => {
    expect(
      part1(`
      .#..#
      .....
      #####
      ....#
      ...##
    `),
    ).toEqual(8)
  })

  it('should solve a simple puzzle #2', () => {
    expect(
      part1(`
      ......#.#.
      #..#.#....
      ..#######.
      .#.#.###..
      .#..#.....
      ..#....#.#
      #..#....#.
      .##.#..###
      ##...#..#.
      .#....####
    `),
    ).toEqual(33)
  })

  it('should solve a simple puzzle #2', () => {
    expect(
      part1(`
      .#..##.###...#######
      ##.############..##.
      .#.######.########.#
      .###.#######.####.#.
      #####.##.#.##.###.##
      ..#####..#.#########
      ####################
      #.####....###.#.#.##
      ##.#################
      #####.##.###..####..
      ..######..##.#######
      ####.##.####...##..#
      .#####..#.######.###
      ##...#.##########...
      #.##########.#######
      .####.#.###.###.#.##
      ....##.##.###..#####
      .#.#.###########.###
      #.#.#.#####.####.###
      ###.##.####.##.#..##
    `),
    ).toEqual(210)
  })

  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input)).toMatchInlineSnapshot(`314`)
  })
})
