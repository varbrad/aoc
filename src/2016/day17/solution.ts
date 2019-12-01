import md5 from 'md5'

enum Direction {
  UP = 'U',
  DOWN = 'D',
  LEFT = 'L',
  RIGHT = 'R',
}
enum DoorState {
  LOCKED,
  OPEN,
}

interface MoveState {
  [Direction.UP]: DoorState
  [Direction.DOWN]: DoorState
  [Direction.LEFT]: DoorState
  [Direction.RIGHT]: DoorState
}

interface Position {
  x: number
  y: number
}

const oob = (position: Position): boolean =>
  position.x < 1 || position.x > 4 || position.y < 1 || position.y > 4

const getDoorState = (position: Position, value: number): DoorState => {
  if (value <= 10 || oob(position)) return DoorState.LOCKED
  return DoorState.OPEN
}

let lastHash: number[]
const getHash = (input: string, history: Direction[]): number[] => {
  // if (lastHash !== undefined && history.length > 300) return lastHash
  lastHash = md5(input + history.join(''))
    .substr(0, 4)
    .split('')
    .map(hex => parseInt(hex, 16))
  return lastHash
}

const getMoveState = (
  input: string,
  position: Position,
  history: Direction[],
): MoveState => {
  const hash = getHash(input, history)
  return {
    [Direction.UP]: getDoorState({ ...position, y: position.y - 1 }, hash[0]),
    [Direction.DOWN]: getDoorState({ ...position, y: position.y + 1 }, hash[1]),
    [Direction.LEFT]: getDoorState({ ...position, x: position.x - 1 }, hash[2]),
    [Direction.RIGHT]: getDoorState(
      { ...position, x: position.x + 1 },
      hash[3],
    ),
  }
}

const isPosDir = (item: unknown): item is [Position, Direction[]] => {
  if (!Array.isArray(item)) return false
  if (item.length !== 2) return false
  return true
}

const getNextUniverses = (
  input: string,
  pos: Position,
  movement: MoveState,
  history: Direction[],
): [Position, Direction[]][] => {
  const universes: ([Position, Direction[]] | undefined)[] = []

  universes.push(
    movement[Direction.UP]
      ? [{ ...pos, y: pos.y - 1 }, [...history, Direction.UP]]
      : undefined,
  )

  universes.push(
    movement[Direction.DOWN]
      ? [{ ...pos, y: pos.y + 1 }, [...history, Direction.DOWN]]
      : undefined,
  )

  universes.push(
    movement[Direction.LEFT]
      ? [{ ...pos, x: pos.x - 1 }, [...history, Direction.LEFT]]
      : undefined,
  )

  universes.push(
    movement[Direction.RIGHT]
      ? [{ ...pos, x: pos.x + 1 }, [...history, Direction.RIGHT]]
      : undefined,
  )

  return universes.filter(isPosDir)
}

export const part1 = (input: string): string => {
  let moves = 0
  let universes: [Position, Direction[]][] = [[{ x: 1, y: 1 }, []]]
  while (universes.length > 0 && moves < 100) {
    moves++
    const nextUniverses: typeof universes = []
    for (let k = 0; k < universes.length; ++k) {
      const [pos, history] = universes[k]
      const movements = getMoveState(input, pos, history)
      nextUniverses.push(...getNextUniverses(input, pos, movements, history))
    }
    universes = nextUniverses
    const gotToVault = universes.find(([pos]) => pos.x === 4 && pos.y === 4)
    if (gotToVault) {
      return gotToVault[1].join('')
    }
  }
  return 'Couldn\'t find a solution!'
}

export const part2 = (input: string): number => {
  let moves = 0
  let universes: [Position, Direction[]][] = [[{ x: 1, y: 1 }, []]]
  let lastSuccessMoves = -1
  while (universes.length > 0 && moves < 1000) {
    moves++
    const nextUniverses: typeof universes = []
    for (let k = 0; k < universes.length; ++k) {
      const [pos, history] = universes[k]
      const movements = getMoveState(input, pos, history)
      nextUniverses.push(...getNextUniverses(input, pos, movements, history))
    }
    universes = nextUniverses
    let wi: number
    while (
      (wi = universes.findIndex(([pos]) => pos.x === 4 && pos.y === 4)) !== -1
    ) {
      universes.splice(wi, 1)
      lastSuccessMoves = moves
    }
  }
  return lastSuccessMoves
}
