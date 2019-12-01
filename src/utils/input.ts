export function parseMultiLineInput(input: string): string[]
export function parseMultiLineInput<T>(
  input: string,
  map: (item: string) => T,
): T[]
export function parseMultiLineInput<T>(
  input: string,
  map?: (item: string) => T,
): T[] {
  const parsed = input
    .trim()
    .split('\n')
    .map(str => str.trim())
  if (map) {
    return parsed.map(map)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return parsed as any[]
  }
}
