import { parseLineInput } from '../../utils/input'

const toLayers = (raw: string, pixels: number): string[] => {
  const layers = []
  while (raw.length) {
    layers.push(raw.substr(0, pixels))
    raw = raw.substring(pixels)
  }
  return layers
}

export const part1 = (input: string, [x, y]: [number, number]): number => {
  const layers = toLayers(parseLineInput(input), x * y).map(layer => ({
    layer,
    zeroes: layer.match(/0/g)?.length ?? 0,
  }))
  const fewestZeroes = layers.reduce(
    (fewest, curr) => (fewest.zeroes > curr.zeroes ? curr : fewest),
    layers[0],
  )
  const numberOfOnes = fewestZeroes.layer.match(/1/g)?.length ?? 0
  const numberOfTwos = fewestZeroes.layer.match(/2/g)?.length ?? 0
  return numberOfOnes * numberOfTwos
}

export const part2 = (input: string, [x, y]: [number, number]): true => {
  const layers = toLayers(parseLineInput(input), x * y)
  let str = ''
  for (let i = 0; i < x * y; ++i) {
    let ix = 0
    let pixel = 2
    while (pixel === 2 && ix < layers.length) {
      pixel = Number(layers[ix].charAt(i))
      ix++
    }
    str += ['▓', '░', ' '][pixel]
    if (i > 0 && (i + 1) % x === 0) str += '\n'
  }
  console.log(str)
  return true
}
