
export type Game = {
  id?: string,
  createdBy?: string,
  createdAt?: number,
  deletedAt?: number,
  status: string,
  name: string,
  questions: Question[],
};

export const SampleCategories = ["Pop Culture, World History, Science, Canadiana, Americana"];

export type Question = {
  id?: string,
  category: string,
  text: string
  answers: Answer[],
};

export type Answer = {
  text: string,
  isCorrect?: boolean,
};

export type RawQuestion = {
  category: string,
  prompt: string,
  text: string,
};
