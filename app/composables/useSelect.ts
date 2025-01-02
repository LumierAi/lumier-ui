import type { YDictionaryElement } from '~~/types/Dictionary'

type Model = object | string | boolean | number
export type SelectModel = Model | Model[] | null

export default function useSelect() {
  const DEFAULT_ITEM_VALUE: keyof YDictionaryElement = 'value'
  const DEFAULT_ITEM_TITLE: keyof YDictionaryElement = 'label'

  return {
    DEFAULT_ITEM_VALUE,
    DEFAULT_ITEM_TITLE,
  }
}
