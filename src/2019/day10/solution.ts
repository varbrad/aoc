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

interface Result {
  asteroid: Asteroid
  detects: number
}

export const part1 = (input: string): number => {
  const asteroids = getAsteroids(input)

  const detections: Result[] = asteroids.map(start => {
    let count = 0
    for (let i = 0; i < asteroids.length; ++i) {
      const target = asteroids[i]
      const detected = canDetectAsteroid(start, target, asteroids)
      if (detected) count++
    }
    return { asteroid: start, detects: count }
  })

  const max = detections.reduce((prev: Result | null, curr) => {
    if (prev === null) return curr
    return curr.detects > prev.detects ? curr : prev
  }, null)

  console.log(max?.asteroid)
  return max?.detects || -1
}

interface AsteroidAngle {
  asteroid: Asteroid
  distance: number
  angle: number
  vaporized?: boolean
}

const calcAngle = (a: Asteroid, b: Asteroid): AsteroidAngle => {
  let angle = Math.atan2(b.y - a.y, b.x - a.x) - Math.PI / 2
  if (angle < 0) angle += Math.PI * 2
  const dist = distance(a, b)
  return { asteroid: a, angle, distance: dist }
}

const sameVal = (a: number, b: number): boolean => {
  const diff = Math.abs(a - b)
  return diff < 0.000000001
}

export const part2 = (
  input: string,
  start: Asteroid,
  vapourLimit = 200,
): number => {
  const asteroids = getAsteroids(input)
  const startIndex = asteroids.findIndex(asteroid =>
    sameAsteroid(asteroid, start),
  )
  asteroids.splice(startIndex, 1)
  const angles: AsteroidAngle[] = []
  for (let i = 0; i < asteroids.length; ++i) {
    const asteroid = asteroids[i]
    angles.push(calcAngle(asteroid, start))
  }
  angles.sort((a, b) => {
    if (sameVal(a.angle, b.angle)) return a.distance < b.distance ? -1 : 1
    return a.angle < b.angle ? -1 : 1
  })

  let i = 0
  const vapedList: AsteroidAngle[] = []
  for (let j = 0; j < 5000; ++j) {
    const target = angles[i]
    target.vaporized = true
    vapedList.push(target)
    if (vapedList.length === vapourLimit) break
    for (let k = 0; k < 500; ++k) {
      i = (i + 1) % angles.length
      const nextTarget = angles[i]
      // Is it already vaped?
      if (nextTarget.vaporized) continue
      // Is it the same value as target?
      if (sameVal(target.angle, nextTarget.angle)) continue
      break
    }
  }

  const vaped = vapedList.pop()
  if (!vaped) return -1
  return vaped.asteroid.x * 100 + vaped.asteroid.y
}
