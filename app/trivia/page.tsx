'use client'

import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import useTrivia from "@/app/_hooks/trivia";
// import { Post } from "@/types/Post" // TODO trivia game and question types
import Loading from "./loading";

function GameEntry({ id, name, status, questions }: any) {
  const [deleteGame] = useTrivia((state: any) => [state.deleteGame]);
  const categories = Array.from(new Set(questions.map((question: any) => question.category)))

  return (
    <p className="text-left p-4">
      <span className="m-0">
        {name} ({questions.length} questions in the {categories.length > 1 ? "" : "category of "}<span className="capitalize">{categories.join(", ")}</span> {categories.length > 1 ? "categories" : ""})
        <Link className="text-dark-2 opacity-60 hover:opacity-100 px-1 ml-1" href={`/trivia/${id}`}>View</Link>
        <Link className="text-dark-2 opacity-60 hover:opacity-100 hover:text-light-2 px-1" href={`#`} onClick={(e) => { e.preventDefault(); deleteGame(id); }}>Delete</Link>
      </span>
    </p>
  );
}

async function handleCreateGame(e: any, createGameFn: any, router: any) {
  e.preventDefault();
  const content = window.prompt("How many questions?", "10");
  if (content) {
    const num = Number(content);
    if (num > 0) {
      const id = await createGameFn(num);
      if (id) {
        router.push(`/trivia/${id}`);
        return true
      }
    }
  }

  console.warn("Unable to create game with num questions", content);
  return false;

}

export default function Page() {
  console.log('>> app.trivia.page.render()');
  const router = useRouter();
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

      <div className="flex flex-col lg:flex-row lg:gap-4 items-center justify-center mt-2 mb-4">
        <Link className="text-dark-2" href="#" onClick={(e) => handleCreateGame(e, createGame, router)} >Create New Game</Link>
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
