import { parseMultiLineInput } from '../../utils/input'

interface DiskNode {
  x: number
  y: number
  size: number
  used: number
  available: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDiskNode = (item: any): item is DiskNode => {
  if (typeof item !== 'object') return false
  return true
}

const regex = /^\/dev\/grid\/node-x(\d+)-y(\d+)\s+(\d+)T\s+(\d+)T\s+(\d+)T\s+\d+%$/

const parseLine = (line: string): DiskNode | undefined => {
  const result = regex.exec(line)
  if (!result) return
  return {
    x: Number(result[1]),
    y: Number(result[2]),
    size: Number(result[3]),
    used: Number(result[4]),
    available: Number(result[5]),
  }
}

const isViable = (a: DiskNode, b: DiskNode): boolean => {
  // A not empty
  if (a.used === 0) return false
  // Not the same
  if (a.x === b.x && a.y === b.y) return false
  // Node A can fit on node B
  return a.used <= b.available
}

export const part1 = (input: string): number => {
  const nodes: DiskNode[] = parseMultiLineInput(input)
    .map(parseLine)
    .filter(isDiskNode)

  let count = 0
  for (let i = 0; i < nodes.length - 1; ++i) {
    const a = nodes[i]
    for (let j = i + 1; j < nodes.length; ++j) {
      const b = nodes[j]
      const ab = isViable(a, b)
      const ba = isViable(b, a)
      if (ab) count++
      if (ba) count++
    }
  }

  return count
}
