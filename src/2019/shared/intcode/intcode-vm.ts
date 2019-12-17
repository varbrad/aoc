import { parseLineInput } from '../../../utils/input'
import { Opcode, ParameterMode, Parameter, OpCodeParameters } from './opcodes'

export interface IntcodeState {
  memory: number[]
  index: number
  input?: number[]
  output: number[]
}

const getOpcode = (state: IntcodeState): [Opcode, ParameterMode[]] => {
  const value = state.memory[state.index]
  if (value === undefined)
    throw new Error(
      `OOB memory lookup -> Memory address ${state.index} is out-of-bounds!`,
    )
  const str = value.toString().padStart(5, '0')
  const opcode: Opcode = Number(str.substr(3, 2))
  const params: ParameterMode[] = str
    .substr(0, 3)
    .split('')
    .map(Number)
    .reverse()
  return [opcode, params]
}

const getOpcodeWithParameters = (
  state: IntcodeState,
): [Opcode, Parameter[]] => {
  const [opcode, modes] = getOpcode(state)
  const numberOfParameters = OpCodeParameters[opcode]
  const parameters: Parameter[] = []
  for (let i = 0; i < numberOfParameters; ++i) {
    parameters.push({
      mode: modes[i],
      value: state.memory[state.index + 1 + i],
    })
  }
  return [opcode, parameters]
}

const getValue = (state: IntcodeState, param: Parameter): number => {
  if (param.mode === ParameterMode.IMMEDIATE) return param.value
  return state.memory[param.value]
}

// eslint-disable-next-line complexity
const mutateState = (state: IntcodeState): boolean => {
  const [opcode, params] = getOpcodeWithParameters(state)
  switch (opcode) {
    case Opcode.ADD:
      state.memory[params[2].value] =
        getValue(state, params[0]) + getValue(state, params[1])
      break
    case Opcode.MULT:
      state.memory[params[2].value] =
        getValue(state, params[0]) * getValue(state, params[1])
      break
    case Opcode.IN:
      if (state.input === undefined || state.input.length === 0)
        throw new Error('Must have input with IN opcode!')
      state.memory[params[0].value] = state.input.shift() as number
      break
    case Opcode.OUT:
      state.output.push(getValue(state, params[0]))
      break
    case Opcode.JIT:
      if (getValue(state, params[0]) !== 0) {
        state.index = getValue(state, params[1])
        return false
      }
      break
    case Opcode.JIF:
      if (getValue(state, params[0]) === 0) {
        state.index = getValue(state, params[1])
        return false
      }
      break
    case Opcode.LT:
      const lessThan = getValue(state, params[0]) < getValue(state, params[1])
      state.memory[params[2].value] = lessThan ? 1 : 0
      break
    case Opcode.EQ:
      const equal = getValue(state, params[0]) === getValue(state, params[1])
      state.memory[params[2].value] = equal ? 1 : 0
      break
    case Opcode.EXIT:
      return true
  }
  // Move the pointer to the next opcode
  state.index += params.length + 1
  return false
}

export default (
  program: string,
  input?: IntcodeState['input'],
): IntcodeState => {
  const state: IntcodeState = {
    memory: parseLineInput(program)
      .split(',')
      .map(Number),
    index: 0,
    input,
    output: [],
  }

  while (!mutateState(state)) {}

  return state
}
