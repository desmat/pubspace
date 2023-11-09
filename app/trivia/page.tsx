'use client'

import moment from "moment";
import Link from "next/link";
import { useEffect } from "react";
import useTrivia from "@/app/_hooks/trivia";
// import { Post } from "@/types/Post" // TODO trivia game and question types
import Loading from "./loading";

function QuestionEntry({ id, text, answers, category }: any) {
  return (
    <p className="text-left pb-4">
      <span className="">
        <span className="capitalize">[{category}]</span> {text}
      </span>
      <br />
      {answers && answers.length > 0 &&
        answers.map((answer: any) => <span key={`${id}-${answer.letter}`} className="ml-4">{answer.letter}) {answer.text}{answer.isCorrect ? " (Correct Answer)" : ""}<br /></span>)
      }
    </p>
  );
}

function GameEntry({ id, name, status, questions }: any) {
  const [deleteGame] = useTrivia((state: any) => [state.deleteGame]);
  const categories = Array.from(new Set(questions.map((question: any) => question.category)))

  return (
    <p className="text-left pb-4">
      <span className="">
        {name} [<span className="capitalize">{categories.sort().join(", ")}</span>]
        <Link className="text-dark-2 opacity-60 hover:opacity-100 px-1 ml-1" href={`/trivia/${id}`}>Edit</Link>
        <Link className="text-dark-2 opacity-60 hover:opacity-100 hover:text-light-2 px-1" href={`#`} onClick={(e) => { e.preventDefault(); deleteGame(id); }}>Delete</Link>
      </span>
      {questions && questions.length > 0 &&
        <div>
          {
            questions
              // .sort((a: Post, b: Post) => b.postedAt.valueOf() - a.postedAt.valueOf())
              .map((question: any) => <div className="ml-4" key={question.id}><QuestionEntry {...question} /></div>)
          }
        </div>
      }
    </p>
  );
}

function handleCreateGame(e: any, createGameFn: any) {
  e.preventDefault();
  const content = window.prompt("How many questions?", "10");
  if (content) {
    const num = Number(content);
    if (num > 0) {
      createGameFn(num);
      return true;
    }
  }

  console.warn("Unable to create game with num questions", content);
  return false;

}

export default function Page() {
  console.log('>> app.trivia.page.render()');
  const [games, loadGames, loaded, createGame] = useTrivia((state: any) => [state.games, state.loadGames, state.loaded, state.createGame]);

  useEffect(() => {
    loadGames();
  }, []);

  if (!loaded) {
    return <Loading />
  }

  return (
    <main className="flex flex-col">
      <h1 className="text-center">Trivia</h1>
      <p className='italic text-center'>
        Create and host trivia games powered by ChatGPT
      </p>

      <div className="flex flex-col lg:flex-row lg:space-x-4 items-center justify-center mt-2 mb-4">
        <Link className="text-dark-2" href="#" onClick={(e) => handleCreateGame(e, createGame)} >Create New Game</Link>
        <Link className="text-dark-2" href="#" onClick={(e) => e.preventDefault()} >View Leaderboard</Link>
      </div>
      {games && games.length > 0 &&
        <>
          {
            games
              // .sort((a: Post, b: Post) => b.postedAt.valueOf() - a.postedAt.valueOf())
              .map((game: any) => <div key={game.id}><GameEntry {...game} /></div>)
          }
        </>
      }
      {(!games || games.length == 0) &&
        <p className='italic text-center'>No trivia games yet :(</p>
      }
    </main>
  )
}
