export enum Opcode {
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

export const OpCodeParameters: Record<Opcode, number> = {
  [Opcode.ADD]: 3,
  [Opcode.MULT]: 3,
  [Opcode.IN]: 1,
  [Opcode.OUT]: 1,
  [Opcode.JIT]: 2,
  [Opcode.JIF]: 2,
  [Opcode.LT]: 3,
  [Opcode.EQ]: 3,
  [Opcode.EXIT]: 0,
}

export enum ParameterMode {
  POSITION = 0,
  IMMEDIATE = 1,
}

export interface Parameter {
  value: number
  mode: ParameterMode
}
