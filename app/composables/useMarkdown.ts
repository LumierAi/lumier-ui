import snarkdown from 'snarkdown'

export function useMarkdown(markdown: string): string {
  return snarkdown(markdown) as string
}
