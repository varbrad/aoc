import { IntcodeInstructionBlock, IntcodeStatus } from './types'
import IntcodeVM2 from './vm'
import { IntcodeInstruction, IntcodeParameterMode } from './opcodes'

interface ProcessInterface {
  vm: IntcodeVM2
  block: IntcodeInstructionBlock
}

type ProcessingStrategy = (context: ProcessInterface) => IntcodeStatus

class IntcodeInstructionProcessor {
  public static process(
    vm: IntcodeVM2,
    block: IntcodeInstructionBlock,
  ): IntcodeStatus {
    const strategy = this.getStrategy(block)
    return strategy.call(this, { vm, block })
  }

  public static add(context: ProcessInterface): IntcodeStatus {
    const params = this.getParameters(context)
    context.vm.movePointer(4)
    return context.vm.set(this.getDestination(context), params[0] + params[1])
  }

  public static mult(context: ProcessInterface): IntcodeStatus {
    const params = this.getParameters(context)
    context.vm.movePointer(4)
    return context.vm.set(this.getDestination(context), params[0] * params[1])
  }

  public static in(context: ProcessInterface): IntcodeStatus {
    const hasInput = context.vm.hasAvailableInput()
    if (!hasInput) return IntcodeStatus.NO_INPUT
    const input = context.vm.getNextInput()
    context.vm.movePointer(2)
    return context.vm.set(this.getDestination(context), input)
  }

  public static out(context: ProcessInterface): IntcodeStatus {
    const params = this.getParameters(context)
    context.vm.addOutput(params[0])
    context.vm.movePointer(2)
    return IntcodeStatus.OK
  }

  public static jit(context: ProcessInterface): IntcodeStatus {
    const params = this.getParameters(context)
    if (params[0] !== 0) {
      context.vm.setPointer(params[1])
    } else {
      context.vm.movePointer(3)
    }
    return IntcodeStatus.OK
  }

  public static jif(context: ProcessInterface): IntcodeStatus {
    const params = this.getParameters(context)
    if (params[0] === 0) {
      context.vm.setPointer(params[1])
    } else {
      context.vm.movePointer(3)
    }
    return IntcodeStatus.OK
  }

  public static lt(context: ProcessInterface): IntcodeStatus {
    const params = this.getParameters(context)
    context.vm.movePointer(4)
    return context.vm.set(
      this.getDestination(context),
      params[0] < params[1] ? 1 : 0,
    )
  }

  public static eq(context: ProcessInterface): IntcodeStatus {
    const params = this.getParameters(context)
    context.vm.movePointer(4)
    return context.vm.set(
      this.getDestination(context),
      params[0] === params[1] ? 1 : 0,
    )
  }

  public static rbo(context: ProcessInterface): IntcodeStatus {
    const params = this.getParameters(context)
    context.vm.movePointer(2)
    context.vm.moveRelativeBaseOffset(params[0])
    return IntcodeStatus.OK
  }

  public static exit(): IntcodeStatus {
    return IntcodeStatus.EXIT
  }

  public static noop(): IntcodeStatus {
    return IntcodeStatus.INVALID_INSTRUCTION
  }

  private static getParameters(context: ProcessInterface): number[] {
    return context.vm.getParameterValues(context.block.parameters)
  }

  private static getDestination(context: ProcessInterface): number {
    const { parameters } = context.block
    const lastParam = parameters[parameters.length - 1]
    if (lastParam.mode === IntcodeParameterMode.POSITION) return lastParam.value
    return context.vm.getRelativeBaseOffset() + lastParam.value
  }

  // eslint-disable-next-line complexity
  private static getStrategy(
    block: IntcodeInstructionBlock,
  ): ProcessingStrategy {
    switch (block.instruction) {
      case IntcodeInstruction.ADD:
        return this.add
      case IntcodeInstruction.MULT:
        return this.mult
      case IntcodeInstruction.IN:
        return this.in
      case IntcodeInstruction.OUT:
        return this.out
      case IntcodeInstruction.JIT:
        return this.jit
      case IntcodeInstruction.JIF:
        return this.jif
      case IntcodeInstruction.LT:
        return this.lt
      case IntcodeInstruction.EQ:
        return this.eq
      case IntcodeInstruction.RBO:
        return this.rbo
      case IntcodeInstruction.EXIT:
        return this.exit
      default:
        return this.noop
    }
  }
}

export default IntcodeInstructionProcessor
