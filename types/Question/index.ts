export type QuestionType = 'closed_question' | 'open_question'
export type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'very_hard'

export interface CurrentQuestion {
  id: string
  createdAt: Date
  type: QuestionType
  userAnswer: string | null
  body: {
    difficulty: QuestionDifficulty
    options: string[]
    question: string
    schemaId: string
    type: QuestionType
  }
  moduleId: string
  schemaId: string
  userId: string
  position: number
  lessonId: string
  difficulty: QuestionDifficulty | null
  message?: string
}