import { stringify } from 'querystring'
import { parseMultiLineInput } from '../../utils/input'

type Password = string[]
enum Direction {
  LEFT,
  RIGHT,
}
type RuleFunction = (password: Password, result: RegExpExecArray) => Password
interface Rule {
  rule: RegExp
  fn: RuleFunction
  fnInverse: RuleFunction
}

const swapPosition = (password: Password, x: number, y: number): Password => {
  const temp = password[x]
  password[x] = password[y]
  password[y] = temp
  return password
}

const swapLetter = (password: Password, a: string, b: string): Password => {
  const indexA = password.indexOf(a)
  const indexB = password.indexOf(b)
  return swapPosition(password, indexA, indexB)
}

const rotateSteps = (
  password: Password,
  dir: Direction,
  x: number,
): Password => {
  const modded = x % password.length
  const slicePoint = dir === Direction.LEFT ? modded : password.length - modded
  const [start, end] = [
    password.slice(0, slicePoint),
    password.slice(slicePoint, password.length),
  ]
  return [...end, ...start]
}

const rotatePosition = (password: Password, a: string): Password => {
  const indexA = password.indexOf(a)
  return rotateSteps(
    password,
    Direction.RIGHT,
    1 + indexA + (indexA >= 4 ? 1 : 0),
  )
}

const stepMap: { [k: number]: number } = {
  0: 1,
  1: 1,
  2: 6,
  3: 2,
  4: 7,
  5: 3,
  6: 8,
  7: 4,
}
const rotatePositionInverse = (password: Password, a: string): Password => {
  const index = password.indexOf(a)
  return rotateSteps(password, Direction.LEFT, stepMap[index])
}

const reversePositions = (
  password: Password,
  x: number,
  y: number,
): Password => {
  const [left, slice, right] = [
    password.slice(0, x),
    password.slice(x, y + 1),
    password.slice(y + 1, password.length),
  ]
  return [...left, ...slice.reverse(), ...right]
}

const movePosition = (password: Password, x: number, y: number): Password => {
  const [a] = password.splice(x, 1)
  password.splice(y, 0, a)
  return password
}

const RULE_MAP: Rule[] = [
  {
    rule: /^swap position (\d+) with position (\d+)$/,
    fn: (password, result) =>
      swapPosition(password, Number(result[1]), Number(result[2])),
    fnInverse: (password, result) =>
      swapPosition(password, Number(result[2]), Number(result[1])),
  },
  {
    rule: /^swap letter (\w) with letter (\w)$/,
    fn: (password, result) => swapLetter(password, result[1], result[2]),
    fnInverse: (password, result) => swapLetter(password, result[2], result[1]),
  },
  {
    rule: /^rotate (left|right) (\d+) steps?$/,
    fn: (password, result) =>
      rotateSteps(
        password,
        result[1] === 'left' ? Direction.LEFT : Direction.RIGHT,
        Number(result[2]),
      ),
    fnInverse: (password, result) =>
      rotateSteps(
        password,
        result[1] === 'left' ? Direction.RIGHT : Direction.LEFT,
        Number(result[2]),
      ),
  },
  {
    rule: /^rotate based on position of letter (\w)$/,
    fn: (password, result) => rotatePosition(password, result[1]),
    fnInverse: (password, result) => rotatePositionInverse(password, result[1]),
  },
  {
    rule: /^reverse positions (\d+) through (\d+)$/,
    fn: (password, result) =>
      reversePositions(password, Number(result[1]), Number(result[2])),
    fnInverse: (password, result) =>
      reversePositions(password, Number(result[1]), Number(result[2])),
  },
  {
    rule: /^move position (\w) to position (\w)$/,
    fn: (password, result) =>
      movePosition(password, Number(result[1]), Number(result[2])),
    fnInverse: (password, result) =>
      movePosition(password, Number(result[2]), Number(result[1])),
  },
]

const processInstruction = (password: Password, line: string): Password => {
  for (const { rule, fn } of RULE_MAP) {
    const result = rule.exec(line)
    if (result !== null) {
      const newPassword = fn([...password], result)
      return newPassword
    }
  }
  throw new Error('Something bad happened')
}

const reverseInstruction = (password: Password, line: string): Password => {
  for (const { rule, fnInverse } of RULE_MAP) {
    const result = rule.exec(line)
    if (result !== null) {
      const newPassword = fnInverse([...password], result)
      return newPassword
    }
  }
  throw new Error('Something bad happened')
}

export const part1 = (input: string, password: string): string => {
  const ins = parseMultiLineInput(input)
  return ins.reduce(processInstruction, password.split('')).join('')
}

export const part2 = (input: string, scrambled: string): string => {
  const ins = parseMultiLineInput(input)
  return ins
    .reverse()
    .reduce(reverseInstruction, scrambled.split(''))
    .join('')
}
