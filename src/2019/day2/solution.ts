import { parseLineInput } from '../../utils/input'

const runInstruction = (
  instructions: number[],
  index: number,
): [boolean, number] => {
  const op = instructions[index]
  if (op === 99) return [true, -1]
  const [a, b, c] = instructions.slice(index + 1, index + 4).map(n => n)
  if (op === 1) {
    instructions[c] = instructions[a] + instructions[b]
  } else if (op === 2) {
    instructions[c] = instructions[a] * instructions[b]
  }
  return [false, index + 4]
}

export const part1 = (
  input: string,
  gravityAssist?: [number, number],
): number => {
  const instructions = parseLineInput(input)
    .split(',')
    .map(Number)
  if (gravityAssist) {
    instructions[1] = gravityAssist[0]
    instructions[2] = gravityAssist[1]
  }
  let index = 0
  for (let i = 0; i < 50000; ++i) {
    const [finished, newIndex] = runInstruction(instructions, index)
    if (finished) break
    index = newIndex
  }

  return instructions[0]
}

export const part2 = (input: string, magicNumber: number): number => {
  for (let a = 0; a < 100; ++a) {
    const rough = part1(input, [a, 0])
    if (magicNumber - rough > 100) continue
    for (let b = 0; b < 100; ++b) {
      const val = part1(input, [a, b])
      if (val === magicNumber) return 100 * a + b
    }
  }
  return -1
}
