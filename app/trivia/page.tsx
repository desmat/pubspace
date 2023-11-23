'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import useTrivia from "@/app/_hooks/trivia";
import Link from "@/app/_components/Link"
import { SampleCategories } from "@/types/Trivia"
import Loading from "./loading";
import { User } from 'firebase/auth';
import useUser from '../_hooks/user';

function GameEntry({ id, name, status, questions }: any) {
  const [deleteGame] = useTrivia((state: any) => [state.deleteGame]);
  const categories = Array.from(new Set(questions.map((question: any) => question.category))).filter(Boolean);
  const isReady = ["created"].includes(status);

  return (
    <p className="text-left p-4 group">
      <span className="m-0">
        {name}
        {isReady &&
          <>
            {` (${questions.length} questions`}
            {categories && categories.length > 0 &&
              <>
                {" "}in the {categories.length > 1 ? "" : "category of "}<span className="capitalize">{categories.sort().join(", ")}</span>{categories.length > 1 ? " categories" : ""}
              </>
            })
            <Link style="light" className="group-hover:opacity-100 ml-2" href={`/trivia/${id}`}>View</Link>
            <Link style="light warning" className="group-hover:opacity-100" onClick={() => deleteGame(id)}>Delete</Link>
          </>
        }
        {!isReady &&
          <>
            {` (${status})`}
          </>
        }
      </span>
    </p>
  );
}

async function handleCreateGame(createGameFn: any, router: any, user: User | undefined, categories: string[] | undefined) {
  // console.log("*** handleCreateGame", { user, name: user.displayName?.split(/\s+/) });
  const userName = (user && !user.isAnonymous && user.displayName)
    ? `${user.displayName.split(/\s+/)[0]}'s`
    : "A";

  const content = "2" // window.prompt("How many questions?", "10");

  if (content) {
    const num = Number(content);

    if (num > 0) {
      const name = "TEST" // window.prompt("Name?", `${userName} trivia game with ${num} questions`);

      if (name) {
        const requestedCategories = "birds" // window.prompt("Categories? (Comma-separated or leave empty)", SampleCategories?.join(", "));
        const id = await createGameFn(user?.uid, num, name, requestedCategories);

        if (id) {
          router.push(`/trivia/${id}`);
          return true
        }
      }
    }
  }

  console.warn("Unable to create game with num questions", content);
  return false;
}

export default function Page() {
  console.log('>> app.trivia.page.render()');
  const router = useRouter();
  const { user } = useUser();
  const [games, categories, loadGames, loaded, createGame] = useTrivia((state: any) => [state.games, state.categories, state.loadGames, state.loaded, state.createGame]);

  useEffect(() => {
    loadGames();
  }, []);

  const links = (
    <div className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center mt-2 mb-4">
      <Link onClick={() => handleCreateGame(createGame, router, user, categories)} >Create New Game</Link>
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
