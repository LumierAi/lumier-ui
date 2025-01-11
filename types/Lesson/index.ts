export type LessonStatus = 'not_started' | 'in_progress' | 'completed'

interface BulbThreshold {
  bulbNumber: number
  questionsNeeded: number
}

export interface Lesson {
  id: string
  bulbs: number
  status: LessonStatus
  position: number
  maxBulbs: number
  correctAnswers: number
  _count: {
    CourseQuestion: number
  }
  bulbThresholds: BulbThreshold[]
}
