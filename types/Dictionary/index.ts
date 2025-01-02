import type { KeyedItem } from '../'

export interface YDictionaryElement<T = string> {
  label: string
  value: T
};

export type YDictionary<T = string> = YDictionaryElement<T>[]

export interface CustomDictionary<Value extends string, Title extends string> {
  itemValue: Value
  itemTitle: Title
  items: KeyedItem<Value, Title>[] | null
}
