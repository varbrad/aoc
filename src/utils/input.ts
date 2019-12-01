export function parseLineInput(input: string): string {
  return input.trim()
}

export function parseMultiLineInput(input: string): string[]
export function parseMultiLineInput<T>(
  input: string,
  map: (item: string) => T,
): T[]
export function parseMultiLineInput<T>(
  input: string,
  map?: (item: string) => T,
): T[] {
  const parsed = parseLineInput(input)
    .split('\n')
    .map(str => str.trim())
  if (map) {
    return parsed.map(map)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return parsed as any[]
  }
}
