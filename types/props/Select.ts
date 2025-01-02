import type { CustomDictionary, YDictionary } from '~~/types/Dictionary'
import type { BaseFieldProps } from '~~/types/props/BaseField'

export type SelectProps<TValue extends string, TTitle extends string> = BaseFieldProps & {
  multiple?: boolean
  returnObject?: boolean
  placeholder?: string
  required?: boolean
} & ({
  items: YDictionary | null
  itemTitle?: never
  itemValue?: never
} | CustomDictionary<TValue, TTitle>)
