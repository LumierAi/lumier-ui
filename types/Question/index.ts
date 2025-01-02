export type QuestionType = 'closed_question' | 'open_question'
export type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'very_hard'
export interface CourseQuestion {
  id: string
  body: {
    difficulty: QuestionDifficulty
    options: string[]
    question: string
    schemaId: string
    type: QuestionType
  }
  userAnswer: string | null
  type: QuestionType
}
