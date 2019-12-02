import { readFile } from '../../utils/readFile'
import { part1 } from './solution'

describe('2016 - Day 22 - Part 1', () => {
  it('should pass an example test case', () => {
    const input = `
      root@ebhq-gridcenter# df -h
      Filesystem            Size  Used  Avail  Use%
      /dev/grid/node-x0-y0   10T    8T     2T   80%
      /dev/grid/node-x0-y1   11T    6T     5T   54%
      /dev/grid/node-x0-y2   32T   28T     4T   87%
      /dev/grid/node-x1-y0    9T    7T     2T   77%
      /dev/grid/node-x1-y1    8T    0T     8T    0%
      /dev/grid/node-x1-y2   11T    7T     4T   63%
      /dev/grid/node-x2-y0   10T    6T     4T   60%
      /dev/grid/node-x2-y1    9T    8T     1T   88%
      /dev/grid/node-x2-y2    9T    6T     3T   66%
    `
    expect(part1(input)).toEqual(7)
  })
  it('should solve our puzzle input', () => {
    const input = readFile(__dirname, 'input.txt')
    expect(part1(input)).toMatchInlineSnapshot(`1043`)
  })
})
