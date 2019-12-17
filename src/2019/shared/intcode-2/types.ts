import { IntcodeInstruction, IntcodeParameter } from './opcodes'

// Primitive values
export const IntcodeProgramSignature = 'intcode'

export enum IntcodeStatus {
  OK = 'ok',
  ERROR = 'error',
  NO_INPUT = 'no-input',
  INVALID_INSTRUCTION = 'invalid-instruction',
  OOB_POINTER = 'oob-pointer',
  NO_PROGRAM_LOADED = 'no-program-loaded',
  EXIT = 'exit',
}

// Interfaces
export interface IntcodeProgram {
  __intcode: typeof IntcodeProgramSignature
  instructions: readonly number[]
}

export interface IntcodeInstructionBlock {
  instruction: IntcodeInstruction
  parameters: IntcodeParameter[]
}

export interface IntcodeVM {
  run: () => void
}
