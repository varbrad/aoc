export enum IntcodeInstruction {
  ADD = 1,
  MULT = 2,
  IN = 3,
  OUT = 4,
  JIT = 5,
  JIF = 6,
  LT = 7,
  EQ = 8,
  EXIT = 99,
}

export const IntcodeParameterLength: Record<IntcodeInstruction, number> = {
  [IntcodeInstruction.ADD]: 3,
  [IntcodeInstruction.MULT]: 3,
  [IntcodeInstruction.IN]: 1,
  [IntcodeInstruction.OUT]: 1,
  [IntcodeInstruction.JIT]: 2,
  [IntcodeInstruction.JIF]: 2,
  [IntcodeInstruction.LT]: 3,
  [IntcodeInstruction.EQ]: 3,
  [IntcodeInstruction.EXIT]: 0,
}

export enum IntcodeParameterMode {
  POSITION = 0,
  IMMEDIATE = 1,
}

export interface IntcodeParameter {
  value: number
  mode: IntcodeParameterMode
}
