enum Direction {
  LEFT = 0,
  UP = 1,
  RIGHT = 2,
  DOWN = 3,
}

export const part1 = (input: string): number => {
  let dir = Direction.UP
  let [x, y] = [0, 0]
  const instructions = input
    .trim()
    .split(', ')
    .map(ins => ({
      direction: ins[0] === 'R' ? 1 : -1,
      steps: Number(ins[1]),
    }))
  instructions.forEach(ins => {
    dir = (dir + ins.direction) % 4
    switch (dir) {
      case Direction.UP:
        y -= ins.steps
        break
      case Direction.DOWN:
        y += ins.steps
        break
      case Direction.LEFT:
        x -= ins.steps
        break
      case Direction.RIGHT:
        x += ins.steps
        break
    }
  })
  return Math.abs(x) + Math.abs(y)
}
