// 'use server'

import moment from 'moment';
import * as store from "./stores/firestore";
// import * as store from "./stores/redis";
// import * as store from "./stores/memory";
import { Game, Question } from "@/types/Trivia";
import shuffleArray from '@/utils/shuffleArray';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

 async function generateQuestions(category: string) {
  // for testing

  // console.log('>> generateQuestions: waiting...');
  // await new Promise((resolve) => setTimeout(() => resolve(42), 5000));
  // console.log('>> generateQuestions: done waiting!');

  // return {category, "questions":[{"question":`TESTING: category '${category}': What is the national animal of Canada?`,"choices":["Beaver","b) Moose","c) Polar bear","d) Canada goose"],"correct_choice":0},{"question":"Which Canadian city is known as the 'City of Festivals'?","choices":["a) Montreal","b) Toronto","c) Vancouver","d) Ottawa"],"correct_choice":0}]};

  const completion = await openai.chat.completions.create({
    // model: 'gpt-3.5-turbo',
    model: 'gpt-4',
    // model: "gpt-3.5-turbo-1106",
    // response_format: { type: "json_object" },    
    messages: [
      {
        role: 'system',
        content: `You are a bot that receives a topic and returns trivia questions with multiple choice answers, with the correct one indicated via its offset.
        Please respond only with JSON data with keys "questions", "question", "choices" and "correct_choice".`
      },
      {
        role: 'user',
        content: `Please generate 10 trivia questions on the topic of ${category}.`
      }
    ],
  });

  try {
    // console.log("*** RESULTS FROM API", JSON.stringify(JSON.parse(completion.choices[0].message.content || "{}")));
    return { category, ...JSON.parse(completion.choices[0].message.content || "{}")};
  } catch (error) {
    console.error("Error reading results", { completion, error });
  }
}

function parseQuestions(category: string, questions: any): Question[] {
  // console.log(">> parseQuestions", { category, questions });

  const parsedQuestions = questions.map((q: any, questionOffset: number) => {
    // console.log(">> parseQuestions mapped questions", { q });
    
    const stripPrefix = ((answerText: string) => {
      const parseAnswer = /(\w+)\)\s*(.+)/;
      const answer = answerText.match(parseAnswer);
      if (answer && answer.length > 2) {
        return answer[2];
      } else {
        return answerText;
      }
    });

    const answers = q.choices.map((c: string, choiceOffset: number) => {
      return {
        text: stripPrefix(c),
        // letter: String.fromCharCode(97 + choiceOffset),
        isCorrect: choiceOffset == Number(q.correct_choice),
      };
    });

    return {
      id: crypto.randomUUID(),
      category,
      number: questionOffset,
      text: q.question,
      answers,
    };
  });

  return parsedQuestions;
}

export async function getGames(): Promise<Game[]> {
  console.log('>> services.trivia.getGames()');

  const games = await store.getTriviaGames();
  return new Promise((resolve, reject) => resolve(games));
}

export async function getGame(id: string): Promise<Game | null> {
  console.log(`>> services.trivia.getGame`, { id });

  const game = await store.getTriviaGame(id);
  console.log(`>> services.trivia.getGame`, { id, game });
  return new Promise((resolve, reject) => resolve(game));
}

export async function getQuestionCategories(): Promise<string[]> {
  console.log('>> services.trivia.getQuestionCategories()');

  const questions = await store.getTriviaQuestions();
  const categories = Array.from(new Set(questions.map((q: Question) => q.category)));
  return new Promise((resolve, reject) => resolve(categories));
}

export async function createGame(createdBy: string, numQuestions: number, name?: string, categories?: string[], statusUpdateCallback?: (status: string) => void): Promise<Game> {
  console.log(">> services.trivia.createGame", { createdBy, numQuestions, name, categories });

  statusUpdateCallback && statusUpdateCallback("retrieving saved questions");

  const triviaQuestions = await store.getTriviaQuestions();
  const triviaQuestionsCategories = Array.from(new Set(triviaQuestions.map((q: Question) => q.category.toLowerCase())));
  const cleanedCategories = categories && categories.length > 0 
    ? categories.map((c: string) => c.toLowerCase())
    : triviaQuestionsCategories;
  const existingCategories = cleanedCategories.filter((c: string) => triviaQuestionsCategories.includes(c));
  const missingCategories = cleanedCategories.filter((c: string) => !triviaQuestionsCategories.includes(c));

  const savedQuestions = triviaQuestions.filter((q: Question) => existingCategories.includes(q.category)) as Question[];

  missingCategories.length == 1 && statusUpdateCallback && statusUpdateCallback(`generating questions for category ${missingCategories[0]}`);
  missingCategories.length > 1 && statusUpdateCallback && statusUpdateCallback(`generating questions for categories ${missingCategories.join(', ')}`);
  let generatedQuestions = await Promise.all(missingCategories.map((c: string) => generateQuestions(c)));
  generatedQuestions = generatedQuestions.map((q: any) => parseQuestions(q.category, q.questions)).flat();

  // save to db for quicker ux next time
  // generatedQuestions.length > 0 && statusUpdateCallback && statusUpdateCallback("saving generated questions");
  // store.addTriviaQuestions(generatedQuestions);

  // console.log("*** services.trivia.createGame", { triviaQuestions, triviaQuestionsCategories, cleanedCategories, existingCategories, missingCategories, savedQuestions, generatedQuestions });

  const game = {
    id: crypto.randomUUID(),
    status: "created",
    createdBy,
    createdAt: moment().valueOf(),
    name: name || `Game with ${numQuestions} questions`,
    questions: shuffleArray(savedQuestions.concat(generatedQuestions)).slice(0, numQuestions),
  };

  generatedQuestions.length > 0 && statusUpdateCallback && statusUpdateCallback("saving game");
  return store.addTriviaGame(game);
}

export async function deleteGame(id: string): Promise<void> {
  console.log(">> services.trivia.deleteGame", { id });

  if (!id) {
    throw `Cannot delete game with null id`;
  }

  store.deleteTriviaGame(id);
  return new Promise((resolve, reject) => resolve());
}
