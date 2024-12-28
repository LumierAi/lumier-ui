interface Rule {
  name: string
  message: string
  validate: (value: string) => boolean
}

export default function useValidationRules() {
  return {
    rules: [] as Rule[],
  }
}
