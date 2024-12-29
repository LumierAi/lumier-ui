import type { BaseRulesProps, Rule } from '../../types/ValidationRules'

const keys = <T extends Record<string, unknown>>(obj: T) => Object.keys(obj) as (keyof T)[]

// TODO: fix this
type Rules = any
type BaseRules = Omit<Record<keyof BaseRulesProps, Rule>, 'customRules'>

export default function defineRules<T extends BaseRulesProps = BaseRulesProps>(props: T, inputRules: Partial<Record<keyof T, Rule>> = {}) {
  const baseRules: BaseRules = {
    required: v => !!v || 'Pole wymagane',
  }

  const rules = computed<Rules>(() => {
    const allRules = { ...baseRules, ...inputRules }
    const propsRules = keys(allRules)
      .filter(key => props[key] !== null && props[key] !== undefined && props[key] !== false)
      .map(key => allRules[key]!)
    return [...propsRules, ...(props.customRules ?? [])]
  })

  return {
    rules,
  }
}
