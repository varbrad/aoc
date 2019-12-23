import { parseMultiLineInput } from '../../utils/input'

interface Asteroid {
  x: number
  y: number
}

const getAsteroids = (input: string): Asteroid[] => {
  const rows = parseMultiLineInput(input)
  const asteroids: Asteroid[] = []
  rows.forEach((row, y) => {
    row.split('').forEach((location, x) => {
      if (location === '#') asteroids.push({ x, y })
    })
  })
  return asteroids
}

const sameAsteroid = (a: Asteroid, b: Asteroid): boolean => {
  return a.x === b.x && a.y === b.y
}

const distance = (a: Asteroid, b: Asteroid): number => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

const pairToString = (a: Asteroid, b: Asteroid): string => {
  if (a.x > b.x && a.y > b.y) return pairToString(b, a)
  return `${a.x},${a.y} - ${b.x},${b.y}`
}

const getBound = (a: Asteroid, b: Asteroid): [Asteroid, Asteroid] => {
  const minX = Math.min(a.x, b.x)
  const maxX = Math.max(a.x, b.x)
  const minY = Math.min(a.y, b.y)
  const maxY = Math.max(a.y, b.y)
  return [
    { x: minX, y: minY },
    { x: maxX, y: maxY },
  ]
}

const inBound = ([a, b]: [Asteroid, Asteroid]) => (c: Asteroid): boolean => {
  if (c.x < a.x) return false
  if (c.x > b.x) return false
  if (c.y < a.y) return false
  if (c.y > b.y) return false
  return true
}

const cache: { [key: string]: boolean } = {}
const canDetectAsteroid = (
  a: Asteroid,
  b: Asteroid,
  cs: Asteroid[],
): boolean => {
  if (sameAsteroid(a, b)) return false
  const name = pairToString(a, b)
  if (cache[name] !== undefined) return cache[name]
  const ab = distance(a, b)
  const bound = getBound(a, b)
  const result = !cs.filter(inBound(bound)).some(c => {
    if (sameAsteroid(a, c)) return false
    if (sameAsteroid(b, c)) return false
    const ac = distance(a, c)
    const bc = distance(b, c)
    const acbc = ac + bc
    const diff = Math.abs(acbc - ab)
    return diff < 0.000001
  })

  cache[name] = result

  return result
}

export const part1 = (input: string): number => {
  const asteroids = getAsteroids(input)

  const detections = asteroids.map(start => {
    let count = 0
    for (let i = 0; i < asteroids.length; ++i) {
      const target = asteroids[i]
      const detected = canDetectAsteroid(start, target, asteroids)
      if (detected) count++
    }
    return count
  })

  const max = detections.reduce((prev, curr) => (prev < curr ? curr : prev), 0)

  return max
}
