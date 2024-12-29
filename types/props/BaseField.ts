import type { BaseRulesProps } from '../ValidationRules'

export type BaseFieldProps = {
  label?: string
  class?: string
  disabled?: boolean
  hint?: string
} & BaseRulesProps

type Density = null | 'default' | 'comfortable' | 'compact'

export type BaseInputProps = {
  suffix?: string
  name?: string
  placeholder?: string
  type?: string
  density?: Density
} & BaseFieldProps
