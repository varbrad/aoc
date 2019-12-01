import { parseLineInput } from '../../utils/input'
import { sumArray } from '../../utils/array'

export const part1 = (input: string): number => {
  input = parseLineInput(input)
  let match
  let length = input.length
  const regex = /\((\d+)x(\d+)\)/g
  while ((match = regex.exec(input))) {
    const [str, chars, times] = match
    const increase = Number(chars) * (Number(times) - 1)
    length += increase - str.length
    regex.lastIndex = match.index + str.length + Number(chars)
  }
  return length
}

interface Marker {
  length: number
  chars: number
  times: number
  index: number
  nodes: Node[]
}

type Node = Marker | string

const parseMarker = (result: RegExpExecArray): Marker => {
  const length = result[0].length
  const chars = Number(result[1])
  const times = Number(result[2])
  return {
    length,
    chars,
    times,
    index: result.index,
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    nodes: getNodes(result.input.substr(result.index + length, chars)),
  }
}

const getNodes = (input: string): Node[] => {
  const length = input.length
  const nodes = []
  let ix = 0
  while (ix < input.length) {
    const str = input.substring(ix, length)
    const regexMarker = /\((\d+)x(\d+)\)/.exec(str)
    if (!regexMarker) {
      nodes.push(str)
      ix = length
      continue
    }
    const marker = parseMarker(regexMarker)
    if (marker.index > 0) nodes.push(str.substr(0, marker.index))
    //
    nodes.push(marker)
    //
    ix += marker.index + marker.length + marker.chars
  }
  return nodes
}

const calculateNode = (node: Node): number => {
  if (typeof node === 'string') return node.length
  return node.times * sumArray(node.nodes.map(calculateNode))
}

export const part2 = (input: string): number => {
  input = parseLineInput(input)
  const nodes = getNodes(input)
  return sumArray(nodes.map(calculateNode))
}
