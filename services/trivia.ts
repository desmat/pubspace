// 'use server'

import moment from 'moment';
import { User } from "firebase/auth";
import * as store from "./stores/firestore";
// import * as store from "./stores/redis";
// import * as store from "./stores/memory";
import { Game, Question, RawQuestion } from "@/types/Trivia";
import { triviaQuestions as tampleTriviaQuestions } from '@/services/stores/samples';
import shuffleArray from '@/utils/shuffleArray'

// TODO: move behind API

function getQuestions() {
  // TODO move to ChatGPT api
  return tampleTriviaQuestions;
}

function parseQuestions(triviaQuestions: RawQuestion[]): Question[] {
  const parseQuestions = /(^\d+\.\s*.*$(?:\n^\s+.*$){4})+/gm;
  const parseQuestion = /^(\d+)\.\s*(.*[\?\:]\n)(?:^\s*(\w+\).*\s*$)\n)(?:^\s*(\w+\).*\s*$)\n)(?:^\s*(\w+\).*\s*$)\n)(?:^\s*(\w+\).*\s*$))/m;
  const parseAnswer = /(\w+)\)\s*(.+)/;
  const parseCorrectAnswer = /(\w+)\)\s*(.+)\s*\(Correct Answer\)/;

  const parsedQuestions: Question[] = [];

  triviaQuestions.forEach((triviaQuestion: RawQuestion) => {
    // console.log("*** triviaQuestion", { triviaQuestion });

    const questions = triviaQuestion.text.match(parseQuestions);

    // console.log("*** Matches", { questions, len: questions.length });

    if (questions && questions.length > 0) {
      questions.forEach((question: any) => {
        // console.log("*** Match", { question })
        const questionAndAnswers = question.match(parseQuestion);

        if (questionAndAnswers && questionAndAnswers.length > 2) {
          const parsedQuestion: any = {
            id: crypto.randomUUID(),
            category: triviaQuestion.category,
            number: questionAndAnswers[1],
            text: questionAndAnswers[2].trim(),
            answers: [],
          }

          for (var i = 3; i < questionAndAnswers.length; i++) {
            const answer = questionAndAnswers[i].match(parseAnswer);
            const correctAnswer = questionAndAnswers[i].match(parseCorrectAnswer);
            // console.log("*** Match", { questionAndAnswer: questionAndAnswers[i], answer, correctAnswer });

            if (correctAnswer && correctAnswer.length > 2) {
              parsedQuestion.answers.push({ letter: correctAnswer[1], text: correctAnswer[2], isCorrect: true });
            } else if (answer && answer.length > 2) {
              parsedQuestion.answers.push({ letter: answer[1], text: answer[2] });
            } else {
              console.warn("Unable to parse answer text", questionAndAnswers[i]);
            }
          }

          parsedQuestions.push(parsedQuestion);
        } else {
          console.warn("Unable to parse question and answer text", question);
        }

        // console.log("Parsed questions", parsedQuestions)
      });
    } else {
      console.warn("Unable to parse questions text", triviaQuestion);
    }
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

export async function createGame(createdBy: string, numQuestions: number, name?: string, categories?: string[]): Promise<Game> {
  console.log(">> services.trivia.createGame", { createdBy, numQuestions, name, categories });

  const rawQuestions = getQuestions();
  const parsedQuestions = parseQuestions(rawQuestions);
  const game = {
    id: crypto.randomUUID(),
    status: "created",
    createdBy,
    createdAt: moment().valueOf(),
    name: name || `Game with ${numQuestions} questions`,
    questions: shuffleArray(parsedQuestions).slice(0, numQuestions),
  };

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
