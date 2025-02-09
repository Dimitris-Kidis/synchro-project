export interface CreateQuestionCommand {
  text?: string;
  options?: string[];
  image?: string | null;
  correctAnswer?: string;
  topics?: string[];
}

export interface UpdateQuestionCommand {
  id: string;
  text: string;
  options: string[];
  image?: string;
  correctAnswer: string;
  topics?: string[];
}

export interface Question {
  id?: string;
  text: string;
  options: string[];
  image?: string | null;
  correctAnswer?: string;
  topics?: string[];
  createdBy?: string;
  createdAt?: string;
  lastModifiedBy?: string;
  lastModifiedAt?: string;
}
