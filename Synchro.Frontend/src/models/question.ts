export interface QuestionDataDto {
  totalQuestionsCount?: number;
  answeredQuestionsCount?: number;
  correctlyAnsweredQuestionsCount?: number;
  correctlyAnsweredQuestionsPercentage?: number;
  questions?: QuestionViewDto[];
}

export interface QuestionViewDto {
  isCorrect: boolean;
  image?: string;
  text: string;
  topics?: string[];
  userAnswer: string;
  correctAnswer: string;
}

export interface QuestionDto {
  id: string;
  text: string;
  options: string[];
  image?: string;
  correctAnswer: string;
  topics?: string[];
  createdBy: string;
  createdAt: string;
  lastModifiedBy?: string;
  lastModifiedAt?: string;
}
