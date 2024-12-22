export function formatNumber(number: number) {
  const { format: formatNumber } = Intl.NumberFormat('pl-PL', {
    notation: 'compact',
    maximumFractionDigits: 1,
  })

  return formatNumber(number)
}
