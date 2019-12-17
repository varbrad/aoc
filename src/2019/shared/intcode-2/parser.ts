import { parseLineInput } from '../../../utils/input'
import { IntcodeProgram, IntcodeProgramSignature } from './types'

class IntcodeParser {
  public static isIntcodeProgram(item: unknown): item is IntcodeProgram {
    if (!item || typeof item !== 'object') return false
    return (item as IntcodeProgram).__intcode === IntcodeProgramSignature
  }

  public static parse(program: IntcodeProgram | string): IntcodeProgram {
    if (IntcodeParser.isIntcodeProgram(program)) return program
    return {
      __intcode: IntcodeProgramSignature,
      instructions: parseLineInput(program)
        .split(',')
        .map(Number),
    }
  }
}

export default IntcodeParser
