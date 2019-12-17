import IntcodeVM2 from '../shared/intcode-2/vm'
import { permutateGn } from '../../utils/permutate'
import { IntcodeStatus } from '../shared/intcode-2/types'

const amplify = (program: string, input: number[]): number => {
  let signal = 0
  while (input.length) {
    const phaseSetting = input.shift()
    if (phaseSetting === undefined) break
    const vm = new IntcodeVM2(program, [phaseSetting, signal])
    vm.run()
    signal = vm.getLastOutput()
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

const amplifyFeedback = (program: string, input: number[]): number => {
  const amplifiers = input.map(
    phaseSetting => new IntcodeVM2(program, phaseSetting),
  )
  let ix = 0
  let signal = 0
  while (true) {
    const amplifier = amplifiers[ix]
    amplifier.addInput(signal)
    const result = amplifier.run()
    signal = amplifier.getLastOutput()
    if (ix === 4 && result === IntcodeStatus.EXIT) break
    ix = (ix + 1) % 5
  }
  return signal
}

export const part2 = (input: string): number => {
  const permutor = permutateGn([5, 6, 7, 8, 9])
  let maxSignal = -1
  while (true) {
    const result = permutor.next()
    if (result.done) break
    const signal = amplifyFeedback(input, result.value)
    if (signal > maxSignal) maxSignal = signal
  }
  return maxSignal
}
