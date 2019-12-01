interface Node {
  x: number
  y: number
}

const toCoord = (node: Node): string => `${node.x},${node.y}`

const isWallFn = (input: number): ((node: Node) => boolean) => {
  const cache = new Map<string, boolean>()
  return (node: Node): boolean => {
    const cachedValue = cache.get(toCoord(node))
    if (cachedValue !== undefined) return cachedValue
    if (node.x < 0 || node.y < 0) return true
    const { x, y } = node
    const binaryOnes = (x * x + 3 * x + 2 * x * y + y + y * y + input)
      .toString(2)
      .split('')
      .filter(digit => digit === '1')
    const wall = binaryOnes.length % 2 !== 0
    cache.set(toCoord(node), wall)
    return wall
  }
}

const sameNode = (a: Node, b: Node): boolean => toCoord(a) === toCoord(b)

export const part1 = (input: number, start: Node, goal: Node): number => {
  const isWall = isWallFn(input)
  const getNeighbours = (a: Node): Node[] =>
    [
      { x: a.x - 1, y: a.y },
      { x: a.x + 1, y: a.y },
      { x: a.x, y: a.y - 1 },
      { x: a.x, y: a.y + 1 },
    ].filter(node => !isWall(node))

  const walkPath = (cameFrom: Map<string, Node>, current: Node): number => {
    const nodePath = [current]
    while (!sameNode(current, start)) {
      const next = cameFrom.get(toCoord(current))
      if (!next) return -1
      current = next
      nodePath.push(current)
    }
    return nodePath.length - 1
  }

  const heuristic = (a: Node): number =>
    Math.abs(a.x - goal.x) + Math.abs(a.y - goal.y)

  const openSet: Node[] = [start]
  const cameFrom = new Map<string, Node>()
  const gScore = new Map<string, number>()
  const fScore = new Map<string, number>()

  gScore.set(toCoord(start), 0)
  fScore.set(toCoord(start), heuristic(start))

  while (openSet.length > 0) {
    const node = openSet.shift()
    if (!node) return -1
    if (sameNode(node, goal)) {
      return walkPath(cameFrom, node)
    }
    const neighbours = getNeighbours(node)
    neighbours.forEach(neighbour => {
      const g = (gScore.get(toCoord(node)) ?? Infinity) + 1
      const neighbourG = gScore.get(toCoord(neighbour)) ?? Infinity
      if (g < neighbourG) {
        cameFrom.set(toCoord(neighbour), node)
        gScore.set(toCoord(neighbour), g)
        fScore.set(toCoord(neighbour), g + heuristic(neighbour))
        const inOpenSet = openSet.find(node => sameNode(node, neighbour))
        if (!inOpenSet) openSet.push(neighbour)
      }
    })
  }
  return -1
}

export const part2 = (input: number, start: Node, maxWalk: number): number => {
  const isWall = isWallFn(input)
  const flooded = new Map<string, number>()

  const flood = (node: Node, steps: number): void => {
    if (isWall(node)) return
    if (steps > maxWalk) return
    const nodeSteps = flooded.get(toCoord(node))
    if (nodeSteps !== undefined && steps >= nodeSteps) return
    flooded.set(toCoord(node), steps)
    flood({ x: node.x - 1, y: node.y }, steps + 1)
    flood({ x: node.x + 1, y: node.y }, steps + 1)
    flood({ x: node.x, y: node.y - 1 }, steps + 1)
    flood({ x: node.x, y: node.y + 1 }, steps + 1)
  }

  flood(start, 0)

  const ys: string[] = []
  for (let y = 0; y < 25; ++y) {
    let str = ''
    for (let x = 0; x < 25; ++x) {
      const node = { x, y }
      if (isWall(node)) {
        str += '██'
        continue
      }
      if (flooded.get(toCoord(node)) !== undefined) {
        str += '░░'
        continue
      }
      str += '  '
    }
    ys.push(str)
  }

  console.log(ys.join('\n'))

  return flooded.size
}
