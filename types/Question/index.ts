export type QuestionType = 'closed_question' | 'open_question' | 'true_or_false' | 'fill_in_blanks'
export type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'very_hard'

export interface CourseQuestion {
  id: string
  createdAt: Date
  type: QuestionType
  userAnswer: string | null
  body: {
    difficulty: QuestionDifficulty
    options?: string[]
    question: string
    schemaId: string
    type: QuestionType
    answer?: string
  }
  moduleId: string
  schemaId: string
  userId: string
  position: number
  lessonId: string
  difficulty: QuestionDifficulty | null
  message?: string
}
