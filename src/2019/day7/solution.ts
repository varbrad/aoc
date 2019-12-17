import intcodeVm from '../shared/intcode/intcode-vm'
import { permutateGn } from '../../utils/permutate'

const amplify = (program: string, input: number[]): number => {
  let signal = 0
  while (input.length) {
    const phaseSetting = input.shift()
    if (phaseSetting === undefined) break
    const intcode = intcodeVm(program, [phaseSetting, signal])
    signal = intcode.output[0]
  }
  return signal
}

export const part1 = (input: string): number => {
  const permutor = permutateGn([0, 1, 2, 3, 4])
  let maxSignal = -1
  while (true) {
    const result = permutor.next()
    if (result.done) break
    const signal = amplify(input, result.value)
    if (signal > maxSignal) maxSignal = signal
  }
  return maxSignal
}

export const part2 = (input: string): number => {
  const permutor = permutateGn([0, 1, 2, 3, 4])
  let maxSignal = -1
  while (true) {
    const result = permutor.next()
    if (result.done) break
    const signal = amplify(input, result.value)
    if (signal > maxSignal) maxSignal = signal
  }
  return maxSignal
}
