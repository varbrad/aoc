import { parseMultiLineInput } from '../../utils/input'

interface Point {
  x: number
  y: number
}

type Line = [Point, Point]

const regex = /^(U|R|D|L)(\d+)$/

const toRect = (a: Line): Line => {
  const left = Math.min(a[0].x, a[1].x)
  const right = Math.max(a[0].x, a[1].x)
  const top = Math.min(a[0].y, a[1].y)
  const bottom = Math.max(a[0].y, a[1].y)
  return [
    {
      x: left,
      y: top,
    },
    {
      x: right,
      y: bottom,
    },
  ]
}

const intersect = (a: Line, b: Line): boolean => {
  a = toRect(a)
  b = toRect(b)
  return (
    a[0].x <= b[1].x && a[1].x >= b[0].x && a[0].y <= b[1].y && a[1].y >= b[0].y
  )
}

const intersectionPoint = (a: Line, b: Line): Point => {
  if (a[0].x === a[1].x) {
    return { x: a[0].x, y: b[0].y }
  }
  return { x: b[0].x, y: a[0].y }
}

const parseRegexArray = (point: Point, res: RegExpExecArray | null): Point => {
  if (!res) return point
  const dir = res[1]
  const delta = Number(res[2])
  const x = point.x + (dir === 'L' ? -delta : dir === 'R' ? delta : 0)
  const y = point.y + (dir === 'U' ? -delta : dir === 'D' ? delta : 0)
  return { x, y }
}

const makePath = (input: string): Line[] => {
  let [x, y] = [0, 0]
  return input
    .split(',')
    .map(value => regex.exec(value))
    .map(result => {
      const origin = { x, y }
      const nextPoint = parseRegexArray(origin, result)
      x = nextPoint.x
      y = nextPoint.y
      return [origin, nextPoint]
    })
}

const manhattan = (point: Point): number =>
  Math.abs(point.x) + Math.abs(point.y)

export const part1 = (input: string): number => {
  const [path1, path2] = parseMultiLineInput(input, makePath)

  let closest: number | null = null
  for (let i = 0; i < path1.length; ++i) {
    const line1 = path1[i]
    for (let j = 0; j < path2.length; ++j) {
      const line2 = path2[j]
      if (intersect(line1, line2)) {
        const point = intersectionPoint(line1, line2)
        const distance = manhattan(point)
        if (distance === 0) continue
        if (closest === null || distance < closest) closest = distance
      }
    }
  }

  return closest ?? -1
}

interface Intersection {
  i: number
  j: number
  point: Point
}

const lineLength = (line: Line): number => {
  const dx = Math.abs(line[0].x - line[1].x)
  const dy = Math.abs(line[0].y - line[1].y)
  return dx + dy
}

const pathSum = (path: Line[]): number[] => {
  let sum = 0
  return [
    0,
    ...path.map(line => {
      const length = lineLength(line)
      sum += length
      return sum
    }),
  ]
}

export const part2 = (input: string): number => {
  const [path1, path2] = parseMultiLineInput(input, makePath)

  const [p1sum, p2sum] = [path1, path2].map(pathSum)
  const intersections: Intersection[] = []
  for (let i = 0; i < path1.length; ++i) {
    const line1 = path1[i]
    for (let j = 0; j < path2.length; ++j) {
      const line2 = path2[j]
      if (intersect(line1, line2)) {
        const point = intersectionPoint(line1, line2)
        const distance = manhattan(point)
        if (distance === 0) continue
        intersections.push({ i, j, point })
      }
    }
  }

  let smallestPathSum = -1
  for (const { i, j, point } of intersections) {
    const iLine = path1[i]
    const jLine = path2[j]
    const sumA = p1sum[i] + lineLength([iLine[0], point])
    const sumB = p2sum[j] + lineLength([jLine[0], point])
    const totalPath = sumA + sumB
    if (totalPath === 0) continue
    if (smallestPathSum === -1 || totalPath < smallestPathSum) {
      smallestPathSum = totalPath
    }
  }

  return smallestPathSum
}
