export interface BaseRulesProps {
  required?: boolean
  customRules?: Rule[]
}
export type Rule = ((...args: any[]) => boolean | string)
