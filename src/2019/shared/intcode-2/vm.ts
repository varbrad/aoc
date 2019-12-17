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
  private relativeBaseOffset = 0
  private ticks = 0

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
    this.relativeBaseOffset = 0
    this.ticks = 0
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
    if (parameter.mode === IntcodeParameterMode.RELATIVE) {
      return this.get(parameter.value + this.relativeBaseOffset)
    }
    return this.get(parameter.value)
  }

  public getParameterValues(parameters: IntcodeParameter[]): number[] {
    return parameters.map(this.getParameterValue.bind(this))
  }

  public getRelativeBaseOffset(): number {
    return this.relativeBaseOffset
  }

  public set(index: number, value: number): IntcodeStatus {
    this.memory[index] = value
    return IntcodeStatus.OK
  }

  public get(index: number): number {
    return this.memory[index] || 0
  }

  public setPointer(index: number): void {
    this.pointer = index
  }

  public movePointer(dIndex: number): void {
    this.pointer += dIndex
  }

  public setRelativeBaseOffset(rbo: number): void {
    this.relativeBaseOffset = rbo
  }

  public moveRelativeBaseOffset(drbo: number): void {
    this.relativeBaseOffset += drbo
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
    console.log(this.ticks, value, this.relativeBaseOffset)
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

  public getTicks(): number {
    return this.ticks
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
    const status = IntcodeInstructionProcessor.process(this, instructionBlock)
    if (status === IntcodeStatus.OK) this.ticks++
    return status
  }
}

export default IntcodeVM2
