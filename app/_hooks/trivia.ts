import moment from 'moment';
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
// import { Post } from "@/types/Post"
import { triviaQuestions } from '@/services/stores/samples';
import shuffleArray from '@/utils/shuffleArray'
import { User } from 'firebase/auth';

// TODO: move behind API

function createGame(numQuestions: number, categories?: string[], name?: string) {
  const parseQuestions = /(^\d+\.\s*.*$(?:\n^\s+.*$){4})+/gm;
  const parseQuestion = /^(\d+)\.\s*(.*[\?\:]\n)(?:^\s*(\w+\).*\s*$)\n)(?:^\s*(\w+\).*\s*$)\n)(?:^\s*(\w+\).*\s*$)\n)(?:^\s*(\w+\).*\s*$))/m;
  const parseAnswer = /(\w+)\)\s*(.+)/;
  const parseCorrectAnswer = /(\w+)\)\s*(.+)\s*\(Correct Answer\)/;

  // ^(\d+)\.\s*(.*\n)(?:^\s*(\w+\).*\s*$)\n)(?:^\s*(\w+\).*\s*$)\n)(?:^\s*(\w+\).*\s*$)\n)(?:^\s*(\w+\).*\s*$)\n)

  const parsedQuestions: any[] = [];

  triviaQuestions.forEach((triviaQuestion: any) => {
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

  if (parsedQuestions && parsedQuestions.length > 0) {
    ;
  }

  const game = {
    id: crypto.randomUUID(),
    name: name || `Game with ${numQuestions} questions`,
    status: "created",
    questions: shuffleArray(parsedQuestions).slice(0, numQuestions),
  }

  return game;
}

const useTrivia: any = create(devtools((set: any, get: any) => ({
  games: [],
  loaded: false,

  loadGames: async () => {
    console.log("*** hooks.trivia.loadGames", {});

    set({ games: [createGame(2), createGame(2)], loaded: true });;
  },

  createGame: async (numQuestions: number, categories?: string[]) => {
    console.log("*** hooks.trivia.createGame", { categories });

    set({ games: [...get().games, createGame(numQuestions)] });
  },

  loadGame: async (id: string) => {
    console.log("*** hooks.trivia.loadGame", {});
  },

  editGame: async (id: string) => {
    console.log("*** hooks.trivia.editGame", {});
  },

  deleteGame: async (id: string) => {
    console.log("*** hooks.trivia.deleteGame", { id });

    const filteredGames = get().games.filter((game: any) => game.id != id);

    set({ games: filteredGames });
  },

  // TODO type
  saveGame: async (gane: any) => {
    console.log("*** hooks.trivia.saveGame", {});
  },

  startGame: async (id: string) => {
    console.log("*** hooks.trivia.startGame", {});
  },

  finishGame: async (id: string) => {
    console.log("*** hooks.trivia.finishGame", {});
  },

  // TODO type
  saveAnswer: async (user: User, answer: any) => {
    console.log("*** hooks.trivia.saveAnswer", {});
  },

})));

export default useTrivia;
