import { permutateGn, permutate, permutateWith } from '../permutate'
import { sumArray } from '../array'

const toString = <T>(n: T[]): string => n.map(f => String(f)).join('')

describe('Permutate', () => {
  it('should work with a single field', () => {
    const values = [1]
    const output = permutate(values)
      .map(toString)
      .sort()
    expect(output).toEqual(['1'])
  })
  it('should work with two fields', () => {
    const values = [1, 2]
    const output = permutate(values)
      .map(toString)
      .sort()
    expect(output).toEqual(['12', '21'])
  })
  it('should work with three fields', () => {
    const values = [1, 2, 3]
    const output = permutate(values)
      .map(toString)
      .sort()
    expect(output).toEqual(['123', '132', '213', '231', '312', '321'])
  })

  it('should work with four fields', () => {
    const values = [1, 2, 3, 4]
    const output = permutate(values)
      .map(toString)
      .sort()
    expect(output.length).toEqual(24)
    expect(output).toEqual([
      '1234',
      '1243',
      '1324',
      '1342',
      '1423',
      '1432',
      '2134',
      '2143',
      '2314',
      '2341',
      '2413',
      '2431',
      '3124',
      '3142',
      '3214',
      '3241',
      '3412',
      '3421',
      '4123',
      '4132',
      '4213',
      '4231',
      '4312',
      '4321',
    ])
  })

  it('should work with an array of any characters', () => {
    const values = ['a', 'b', 'c']
    const output = permutate(values)
      .map(toString)
      .sort()
    expect(output).toEqual(['abc', 'acb', 'bac', 'bca', 'cab', 'cba'])
  })
})

describe('Permutate Generator', () => {
  it('should work with a single element to permute', () => {
    const permutor = permutateGn([1])
    expect(permutor.next().value).toEqual([1])
    expect(permutor.next().done).toEqual(true)
  })

  it('should work with two elements to permute', () => {
    const permutor = permutateGn([1, 2])
    expect(permutor.next().value).toEqual([1, 2])
    expect(permutor.next().value).toEqual([2, 1])
    expect(permutor.next().done).toEqual(true)
  })

  it('should work with three elements to permute', () => {
    const permutor = permutateGn([1, 2, 3])
    expect(permutor.next().value).toEqual([1, 2, 3])
    expect(permutor.next().value).toEqual([2, 1, 3])
    expect(permutor.next().value).toEqual([3, 1, 2])
    expect(permutor.next().value).toEqual([1, 3, 2])
    expect(permutor.next().value).toEqual([2, 3, 1])
    expect(permutor.next().value).toEqual([3, 2, 1])
    expect(permutor.next().done).toEqual(true)
  })

  it('should produce 4! permutations for an array with 4 elements', () => {
    const permutor = permutateGn([1, 2, 3, 4])
    let i = 0
    while (!permutor.next().done) i++
    expect(i).toEqual(4 * 3 * 2 * 1)
  })

  it('should produce 5! permutations for an array with 5 elements', () => {
    const permutor = permutateGn([1, 2, 3, 4, 5])
    let i = 0
    while (!permutor.next().done) i++
    expect(i).toEqual(5 * 4 * 3 * 2 * 1)
  })

  it('should produce 10! permutations for an array with 10 elements', () => {
    const permutor = permutateGn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    let i = 0
    while (!permutor.next().done) i++
    expect(i).toEqual(10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1)
  })
})

describe('Permutate With', () => {
  it('should run a simple map over all permutations', () => {
    const input = ['a', 'b', 'c']
    const output = permutateWith(input, toString).sort()
    expect(output).toEqual(['abc', 'acb', 'bac', 'bca', 'cab', 'cba'])
  })
  it('should be able to produce arbitrary output', () => {
    const input = [1, 2, 3, 4]
    const output = permutateWith(input, n => n.length)
    expect(sumArray(output)).toEqual(96)
  })
})
