'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import useTrivia from "@/app/_hooks/trivia";
import Link from "@/app/_components/Link"
// import { Post } from "@/types/Post" // TODO trivia game and question types
import Loading from "./loading";

function GameEntry({ id, name, status, questions }: any) {
  const [deleteGame] = useTrivia((state: any) => [state.deleteGame]);
  const categories = Array.from(new Set(questions.map((question: any) => question.category)))

  return (
    <p className="text-left p-4">
      <span className="m-0">
        {name} ({questions.length} questions in the {categories.length > 1 ? "" : "category of "}<span className="capitalize">{categories.sort().join(", ")}</span> {categories.length > 1 ? "categories" : ""})
        <Link style="light" className="ml-2" href={`/trivia/${id}`}>View</Link>
        <Link style="light warning" onClick={() => deleteGame(id)}>Delete</Link>
      </span>
    </p>
  );
}

async function handleCreateGame(createGameFn: any, router: any) {
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

  const links = (
    <div className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center mt-2 mb-4">
      <Link onClick={() => handleCreateGame(createGame, router)} >Create New Game</Link>
      {/* <Link>View Leaderboard</Link> */}
    </div>
  );

  if (!loaded) {
    return <Loading />
  }

  return (
    <main className="flex flex-col">
      <h1 className="text-center">Trivia</h1>
      <p className='italic text-center'>
        Create and host trivia games powered by ChatGPT
      </p>
      {links}
      {games && games.length > 0 &&
        <>
          {
            games
              // .filter(...)
              // .sort(...)
              .map((game: any) => <div key={game.id}><GameEntry {...game} /></div>)
          }
        </>
      }
      {(!games || games.length == 0) &&
        <p className='italic text-center'>No trivia games yet :(</p>
      }
      {games && games.length > 4 && links}
    </main>
  )
}
