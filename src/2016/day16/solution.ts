const invert = (input: string): string => {
  return input
    .split('')
    .reverse()
    .map(a => (a === '1' ? '0' : '1'))
    .join('')
}

type Bit = 0 | 1

export const part1 = (input: string, diskSize: number): string => {
  while (input.length < diskSize) {
    input = `${input}0${invert(input)}`
  }
  let bits: Bit[] = input
    .substr(0, diskSize)
    .split('')
    .map(v => (v === '1' ? 1 : 0))
  while (bits.length % 2 === 0) {
    const newBits: Bit[] = []
    for (let i = 0; i < bits.length; i += 2) {
      const [a, b] = [bits[i], bits[i + 1]]
      newBits.push(a === b ? 1 : 0)
    }
    bits = newBits
  }
  return bits.join('')
}
