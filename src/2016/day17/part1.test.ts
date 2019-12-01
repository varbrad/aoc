import { part1 } from './solution'

describe('2016 - Day 17 - Part 1', () => {
  it('should pass an example test case', () => {
    expect(part1('ihgpwlah')).toEqual('DDRRRD')
  })
  it('should pass a slightly more complex test case', () => {
    expect(part1('kglvqrro')).toEqual('DDUDRLRRUDRD')
  })
  it('should pass a complex test case', () => {
    expect(part1('ulqzkmiv')).toEqual('DRURDRUDDLLDLUURRDULRLDUUDDDRR')
  })
  it('should solve our puzzle input', () => {
    expect(part1('awrkjxxr')).toMatchInlineSnapshot(`"RDURRDDLRD"`)
  })
})
