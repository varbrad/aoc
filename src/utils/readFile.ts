import fs from 'fs'
import path from 'path'

export const readFile = (dir: string, file: string): string =>
  fs.readFileSync(path.join(dir, file), { encoding: 'utf-8' })
