import { parseMultiLineInput } from '../../utils/input'

type CelestialObject = string
type OrbitMap = { [o: string]: CelestialObject }
type OrbitCache = { [o: string]: number }

const parseOrbit = (line: string): [CelestialObject, CelestialObject] => {
  const [a, b] = line.split(')')
  return [a, b]
}

const cache: OrbitCache = {}
const getOrbitChain = (orbitMap: OrbitMap, body: CelestialObject): number => {
  const orbiting = orbitMap[body]
  if (cache[orbiting]) return cache[orbiting]
  if (orbiting === undefined) return 0
  const value = 1 + getOrbitChain(orbitMap, orbiting)
  cache[orbiting] = value
  return value
}

const getOrbitMap = (input: string): OrbitMap => {
  return parseMultiLineInput(input, parseOrbit).reduce((prev, [a, b]) => {
    return { ...prev, [b]: a }
  }, {})
}

export const part1 = (input: string): number => {
  const orbitMap: OrbitMap = getOrbitMap(input)
  return Object.keys(orbitMap).reduce(
    (prev, curr) => prev + getOrbitChain(orbitMap, curr),
    0,
  )
}

const getOrbitList = (
  orbitMap: OrbitMap,
  body: CelestialObject,
): CelestialObject[] => {
  const value = orbitMap[body]
  if (value === undefined) return []
  return [value, ...getOrbitList(orbitMap, value)]
}

const getCommonBody = (
  a: CelestialObject[],
  b: CelestialObject[],
): CelestialObject | null => {
  for (let i = 0; i < a.length; ++i) {
    const isInB = b.includes(a[i])
    if (isInB) return a[i]
  }
  return null
}

export const part2 = (input: string): number => {
  const orbitMap: OrbitMap = getOrbitMap(input)
  const you = getOrbitList(orbitMap, 'YOU')
  const santa = getOrbitList(orbitMap, 'SAN')

  const commonBody = getCommonBody(you, santa)
  if (!commonBody)
    throw new Error('Could not find a common body between you & santa, oh no!')

  const youToBody = you.indexOf(commonBody)
  const santaToBody = santa.indexOf(commonBody)

  return youToBody + santaToBody
}
