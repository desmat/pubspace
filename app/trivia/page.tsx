'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from "react";
import useTrivia from "@/app/_hooks/trivia";
import Link from "@/app/_components/Link"
import { Game, SampleCategories } from "@/types/Trivia"
import Loading from "./loading";
import { User } from 'firebase/auth';
import useUser from '../_hooks/user';

function GameEntry({ game, user }: any) {
  const router = useRouter();
  const categories = Array.from(new Set(game.questions.map((question: any) => question.category))).filter(Boolean);
  const isReady = ["created"].includes(game.status);
  console.log('>> app.trivia.page.GameEntry.render()', { game, user });

  return (
    <p className="text-left py-2.5 group hover:cursor-pointer" onClick={() => router.push(`/trivia/${game.id}`)}>
      <span className="m-0">
        {game.name}
        {isReady &&
          <>
            {` (${game.questions.length} questions`}
            {categories && categories.length > 0 &&
              <>
                {" "}in the {categories.length > 1 ? "" : "category of "}<span className="capitalize">{categories.sort().join(", ")}</span>{categories.length > 1 ? " categories" : ""}
              </>
            })
            <Link style="light" className="group-hover:opacity-100 group-hover:underline ml-2" href={`/trivia/${game.id}`}>View</Link>
          </>
        }
        {!isReady &&
          <>
            {` (${game.status})`}
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

  const content = window.prompt("How many questions?", "10");

  if (content) {
    const num = Number(content);

    if (num > 0) {
      const name = window.prompt("Name?", `${userName} trivia game with ${num} questions`);

      if (name) {
        const requestedCategories = window.prompt("Categories? (Comma-separated or leave empty)", SampleCategories?.join(", "));
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
  const [user] = useUser((state: any) => [state.user]);
  const [games, categories, loadGames, loaded, createGame] = useTrivia((state: any) => [state.games, state.categories, state.loadGames, state.loaded, state.createGame]);
  const params = useSearchParams();
  const uidFilter = params.get("uid");
  const filteredGames = uidFilter ? games.filter((game: Game) => game.createdBy == uidFilter) : games;

  useEffect(() => {
    loadGames();
  }, []);

  const links = (
    <div className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center mt-2 mb-4">
      <div title={user ? "" : "Login to create new game"}>
        <Link className={user ? "" : "cursor-not-allowed"} onClick={() => /* user && */ handleCreateGame(createGame, router, user, categories)}>
          Create New Game
        </Link>
      </div>
      {/* <Link>View Leaderboard</Link> */}
    </div>
  );

  if (!loaded) {
    return <Loading />
  }

  return (
    <>
      {uidFilter &&
        <Link href="/trivia" style="warning" className="absolute top-2 right-2 cursor-zoom-out">
          Filtered by user: {uidFilter}
        </Link>
      }

      <main className="flex flex-col items-left lg:max-w-4xl lg:mx-auto px-4">
        <h1 className="text-center">Trivia</h1>

        <p className='italic text-center'>
          Create trivia games with the help of ChatGPT. Coming soon: play interactively with your friends!
        </p>
        {links}
        {filteredGames && filteredGames.length > 0 &&
          <>
            {
              filteredGames
                // .filter(...)
                .sort((game: Game) => game.createdAt)
                .map((game: any) => <div key={game.id}><GameEntry game={game} user={user} /></div>)
            }
          </>
        }
        {(!filteredGames || filteredGames.length == 0) &&
          <p className='italic text-center'>No trivia games yet :(</p>
        }
        {filteredGames && filteredGames.length > 4 && links}
      </main>
    </>
  )
}
