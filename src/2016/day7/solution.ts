import { parseMultiLineInput } from '../../utils/input'

type IP = [string[], string[]]

const getSegments = (input: string): IP => {
  const [out, ins]: IP = [[], []]

  let active = false
  let n = 0

  while (n < input.length) {
    const nextPos = input.indexOf(active ? ']' : '[', n)
    const charPos = nextPos === -1 ? input.length : nextPos
    const str = input.substring(n, charPos)
    active ? ins.push(str) : out.push(str)
    n = charPos + 1
    active = !active
  }

  return [out, ins]
}

const isTLS = (str: string): boolean => {
  const result = /(\w)(\w)\2\1/.exec(str)
  return result !== null && result[1] !== result[2]
}

const getSSLMatches = (str: string): string[] => {
  const regex = /(\w)(\w)\1/g
  let match
  const matches = []
  while ((match = regex.exec(str))) {
    if (match[1] !== match[2]) matches.push(match[0])
    regex.lastIndex = match.index + 1
  }
  return matches
}

const invertMatch = (str: string) => {
  const [a, b] = [str[0], str[1]]
  return `${b}${a}${b}`
}

const supportsTLS = ([outside, inside]: IP): boolean => {
  const insideHasTLS = inside.some(isTLS)
  if (insideHasTLS) return false
  const outsideHasTLS = outside.some(isTLS)
  return outsideHasTLS
}

const supportsSSL = ([outside, inside]: IP): boolean => {
  const outsideSSL = outside.flatMap(getSSLMatches)
  const insideSSL = inside.flatMap(getSSLMatches).map(invertMatch)
  return outsideSSL.some(a => insideSSL.includes(a))
}

export const part1 = (input: string): number => {
  const ips = parseMultiLineInput(input, getSegments)
  return ips.filter(supportsTLS).length
}

export const part2 = (input: string): number => {
  const ips = parseMultiLineInput(input, getSegments)
  return ips.filter(supportsSSL).length
}
