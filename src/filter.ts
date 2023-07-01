export function filter(source: string, file: string, ignores: string[]): boolean {
  if (!ignores.includes('node_modules') && source.includes('node_modules'))
    return true
  if (ignores.includes(file))
    return false
  return true
}
