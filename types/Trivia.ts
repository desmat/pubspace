// TODO

export type Game = {
  id?: string,
  createdBy?: string,
  createdAt?: number,
  status: string,
  name: string,
  questions: Question[],
};

export type Question = {
  letter: string,
  text: string,
  isCorrect?: boolean,
}

export type RawQuestion = {
  category: string,
  prompt: string,
  text: string,
};
