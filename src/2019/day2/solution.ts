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

export const part1 = (input: string, restoreGravityAssist = false): number => {
  const instructions = parseLineInput(input)
    .split(',')
    .map(Number)
  if (restoreGravityAssist) {
    instructions[1] = 12
    instructions[2] = 2
  }
  let index = 0
  for (let i = 0; i < 50000; ++i) {
    const [finished, newIndex] = runInstruction(instructions, index)
    if (finished) break
    index = newIndex
  }

  console.log(instructions)

  return instructions[0]
}
