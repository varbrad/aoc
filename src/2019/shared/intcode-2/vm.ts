import { ensureArray } from '../../../utils/array'
import {
  IntcodeProgram,
  IntcodeVM,
  IntcodeStatus,
  IntcodeInstructionBlock,
} from './types'
import IntcodeParser from './parser'
import {
  IntcodeInstruction,
  IntcodeParameter,
  IntcodeParameterMode,
  IntcodeParameterLength,
} from './opcodes'
import IntcodeInstructionProcessor from './instructions'

class IntcodeVM2 implements IntcodeVM {
  private program?: IntcodeProgram
  private memory: number[] = []
  private pointer = 0
  private inputs: number[] = []
  private outputs: number[] = []

  constructor(...args: Parameters<IntcodeVM2['reset']>) {
    this.reset(...args)
  }

  public reset(
    program?: IntcodeProgram | string,
    input?: number | number[],
  ): void {
    if (program) this.program = IntcodeParser.parse(program)
    if (!this.program) throw new Error(IntcodeStatus.NO_PROGRAM_LOADED)
    this.memory = [...this.program.instructions]
    this.pointer = 0
    this.inputs = []
    this.outputs = []
    if (input) this.addInput(input)
  }

  public getMemory(): number[] {
    return [...this.memory]
  }

  public run(): IntcodeStatus {
    let lastState: IntcodeStatus = IntcodeStatus.OK
    while (true) {
      lastState = this.tick()
      if (lastState !== IntcodeStatus.OK) break
    }
    return lastState
  }

  public runAndOutput(): number {
    this.run()
    return this.getLastOutput()
  }

  public getParameterValue(parameter: IntcodeParameter): number {
    if (parameter.mode === IntcodeParameterMode.IMMEDIATE)
      return parameter.value
    return this.memory[parameter.value]
  }

  public getParameterValues(parameters: IntcodeParameter[]): number[] {
    return parameters.map(this.getParameterValue.bind(this))
  }

  public set(index: number, value: number): IntcodeStatus {
    this.memory[index] = value
    return IntcodeStatus.OK
  }

  public get(index: number): number {
    return this.memory[index]
  }

  public setPointer(index: number): void {
    this.pointer = index
  }

  public movePointer(dIndex: number): void {
    this.pointer += dIndex
  }

  public hasAvailableInput(): boolean {
    return this.inputs.length > 0
  }

  public getNextInput(): number {
    const input = this.inputs.shift()
    if (input === undefined) throw new Error(IntcodeStatus.NO_INPUT)
    return input
  }

  public addOutput(value: number): void {
    this.outputs.push(value)
  }

  public getLastOutput(): number {
    return this.outputs[this.outputs.length - 1]
  }

  public getOutput(): number[] {
    return [...this.outputs]
  }

  public addInput(input: number | number[]): void {
    this.inputs.push(...ensureArray(input))
  }

  private getInstruction(
    pointer?: number,
  ): [IntcodeInstruction, IntcodeParameterMode[]] {
    const value = this.memory[pointer ?? this.pointer]
    if (value === undefined) throw new Error(IntcodeStatus.OOB_POINTER)
    const str = value.toString().padStart(5, '0')
    const instruction: IntcodeInstruction = Number(str.substr(3, 2))
    const params: IntcodeParameterMode[] = str
      .substr(0, 3)
      .split('')
      .map(Number)
      .reverse()
    return [instruction, params]
  }

  private getInstructionBlock(pointer?: number): IntcodeInstructionBlock {
    const index = pointer ?? this.pointer
    const [instruction, modes] = this.getInstruction(index)
    const parameterLength = IntcodeParameterLength[instruction]
    const parameters: IntcodeParameter[] = []
    for (let i = 0; i < parameterLength; ++i) {
      parameters.push({
        mode: modes[i],
        value: this.memory[index + 1 + i],
      })
    }
    return { instruction, parameters }
  }

  private tick(): IntcodeStatus {
    const instructionBlock = this.getInstructionBlock()
    //
    return IntcodeInstructionProcessor.process(this, instructionBlock)
  }
}

export default IntcodeVM2
