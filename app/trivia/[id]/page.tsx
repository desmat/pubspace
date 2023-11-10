'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import useTrivia from "@/app/_hooks/trivia";
// import { Post } from "@/types/Post" // TODO trivia game and question types
import Loading from "./loading";

function QuestionEntry({ i, id, text, answers, category, showAnswers }: any) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <p className="text-left pb-4">
      <span className="">
        {i + 1}. <span className="capitalize">[{category}]</span> {text}
        {!showAnswers &&
          <Link className="text-dark-2 opacity-60 hover:opacity-100 px-1 ml-1" href="#" onClick={(e) => { e.preventDefault(); setShowAnswer(!showAnswer); }}>{showAnswer ? "Hide Correct Answer" : "Show Correct Answer"}</Link>
        }
      </span>
      <br />
      {answers && answers.length > 0 &&
        answers.map((answer: any) => <span key={`${id}-${answer.letter}`} className="ml-4">{answer.letter}) {answer.text}{(showAnswer || showAnswers) && answer.isCorrect ? " (Correct Answer)" : ""}<br /></span>)
      }
    </p>
  );
}

function GameEntry({ id, name, status, questions, showAnswers }: any) {
  return (
    <p className="text-left pb-4">
      {questions && questions.length > 0 &&
        <div>
          {
            questions
              // .sort((a: Post, b: Post) => b.postedAt.valueOf() - a.postedAt.valueOf())
              .map((question: any, i: number) => <div className="ml-2 flex" key={question.id}><QuestionEntry {...{ ...question, i, showAnswers }} /></div>)
          }
        </div>
      }
    </p>
  );
}

async function handleDeleteGame(e: any, id: string, deleteGameFn: any, router: any) {
  e.preventDefault();
  await deleteGameFn(id);
  router.push("/trivia");
}

async function handlePlayGame(e: any, id: string, startGameFn: any, router: any) {
  e.preventDefault();
  await startGameFn(id);
  // router.push("/trivia");
}

export default function Page({ params }: { params: { id: string } }) {
  // console.log('>> app.trivia[id].page.render()', { id: params.id });
  const router = useRouter();
  const [showAnswers, setShowAnswers] = useState(false);
  const [games, loadGames, loaded, deleteGame, startGame] = useTrivia((state: any) => [state.games, state.loadGames, state.loaded, state.deleteGame, state.startGame]);
  const game = games.filter((game: any) => game.id == params.id)[0];
  const categories = game && Array.from(new Set(game.questions.map((question: any) => question.category)));

  console.log('>> app.trivia[id].page.render()', { id: params.id, game });

  useEffect(() => {
    loadGames();
  }, []);

  if (!loaded) {
    return <Loading />
  }

  if (!game) {
    return (
      <main className="flex flex-col">
        <h1 className="text-center">Game {params.id} not found</h1>
        <div className="flex flex-col lg:flex-row lg:gap-4 items-center justify-center mt-2 mb-4">
          <Link className="text-dark-2" href="/trivia">Back</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col">
      <h1 className="text-center">{game.name}</h1>

      <p className='italic text-center'>
        Trivia game with {game.questions.length} questions in the {categories.length > 1 ? "" : "category of "}<span className="capitalize">{categories.join(", ")}</span> {categories.length > 1 ? "categories" : ""}
      </p>

      <div className="flex flex-col lg:flex-row lg:gap-4 items-center justify-center mt-2 mb-4">
        <Link className="text-dark-2" href="/trivia">Back</Link>
        <Link className="text-dark-2" href="#" onClick={(e) => { e.preventDefault(); setShowAnswers(!showAnswers); }} >{showAnswers ? "Hide Correct Answers" : "Show Correct Answers"}</Link>
        <Link className="text-dark-2" href="#" onClick={(e) => handlePlayGame(e, params.id, startGame, router)} >Play</Link>
        <Link className="text-dark-2 hover:text-light-2" href="#" onClick={(e) => handleDeleteGame(e, params.id, deleteGame, router)} >Delete</Link>
      </div>

      {game && game.questions && (game?.questions?.length as number) > 0 &&
        <GameEntry {...{ ...game, showAnswers }} />
      }
    </main>
  )
}
