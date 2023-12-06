'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import Link from "@/app/_components/Link"
import useMenus from "@/app/_hooks/menus";
import useUser from "@/app/_hooks/user";
import Loading from "./loading";

function stripIngredientQuantity(ingredient: string) {
  const regex = /^(?:\w+\s+of\s+)?(?:\d+\s*\w+\s+of\s+)?(?:\d+\s*\w+\s+)?(?:\d+\s+)?(.+)$/i;
  const match = ingredient.match(regex);
  if (match && match.length > 1) {
    return match[1];
  }

  return ingredient;
}

function MenuItem({ name, description, ingredients, preparation, showDetails }: any) {
  const [showDetail, setshowDetail] = useState(false);
  const maxShortIngredients = 4;
  const shortIngredients = ingredients.length > maxShortIngredients
    ? ingredients.map(stripIngredientQuantity).slice(0, maxShortIngredients).join(", ")
    : ingredients.map(stripIngredientQuantity).join(", ");

  // console.log('>> app.menus[id].page.render()', { name, shortIngredients, ingredients });

  useEffect(() => {
    if (showDetails) {
      setshowDetail(false);
    }
  }, [showDetails]);

  return (
    <p className={"text-left flex flex-col gap-2 pb-6" + (showDetails ? "" : " group hover:cursor-pointer")} onClick={() => !showDetails && setshowDetail(!showDetail)}>
      <div className="">
        <span className="capitalize font-semibold">{name}</span>: {description}
        {!showDetails &&
          <>
            <Link style="light" className="opacity-40 group-hover:opacity-100 group-hover:underline group-active:text-light-1 group- ml-2">{showDetail ? "Hide details" : "Show details"}</Link>
          </>
        }
      </div>
      {!showDetail && !showDetails &&
        <div className="capitalize italic text-dark-3 -mt-1">{shortIngredients}</div>
      }
      {/* {ingredients.length > maxShortIngredients &&
        <span className="italic">
          {` (and ${ingredients.length - maxShortIngredients} more)`}
        </span>
      } */}
      {(showDetails || showDetail) &&
        <div>
          <div className="font-semibold">Ingredients:</div>
          <ul className="ml-4">
            {
              ingredients.map((ingredient: string, offset: number) => <li key={offset} className="capitalize">{ingredient}</li>)
            }
          </ul>
        </div>
      }
      {(showDetails || showDetail) &&
        <div className="mb-2">
          <div className="font-semibold">Preparation:</div>
          <div>{preparation}</div>
        </div>
      }
    </p>
  );
}

function Menu({ id, prompt, items, showDetails }: any) {
  return (
    <p className="text-left pb-4">
      {items && items.length > 0 &&
        <div>
          {
            items
              // .sort((a: Post, b: Post) => b.postedAt.valueOf() - a.postedAt.valueOf())
              .map((item: any, offset: number) => <div className="ml-2 flex" key={offset}><MenuItem {...{ ...item, offset, showDetails }} /></div>)
          }
        </div>
      }
    </p>
  );
}

async function handleDeleteMenu(id: string, deleteFn: any, router: any) {
  const response = confirm("Delete menu?");
  if (response) {
    deleteFn(id);
    router.back();
  }
}

export default function Page({ params }: { params: { id: string } }) {
  // console.log('>> app.trivia[id].page.render()', { id: params.id });
  const router = useRouter();
  const [showDetails, setshowDetails] = useState(false);
  const [menus, loaded, load, deleteMenu] = useMenus((state: any) => [state.menus, state.loaded, state.load, state.deleteMenu]);
  const [user] = useUser((state: any) => [state.user]);
  const menu = menus.filter((menu: any) => menu.id == params.id)[0];

  console.log('>> app.menus[id].page.render()', { id: params.id, menu });

  useEffect(() => {
    load(params.id);
  }, [params.id]);

  if (!loaded) {
    return <Loading />
  }

  const links = (
    <div className="flex flex-col lg:flex-row lg:gap-2 items-center justify-center mt-2 mb-4">
      <Link href="/menus">Back</Link>
      {menu && <Link onClick={() => setshowDetails(!showDetails)}>{showDetails ? "Hide details" : "Show details"}</Link>}
      {/* {game && <Link onClick={() => handlePlayGame(params.id, startGame, router)}>Play</Link>} */}
      {menu && user && (user.uid == menu.createdBy || user.admin) && <Link style="warning" onClick={() => handleDeleteMenu(params.id, deleteMenu, router)}>Delete</Link>}
    </div>
  );

  if (!menu) {
    return (
      <main className="flex flex-col">
        <h1 className="text-center">Menu {params.id} not found</h1>
        {links}
      </main>
    )
  }

  return (
    <main className="flex flex-col items-left lg:max-w-4xl lg:mx-auto px-4">
      <h1 className="text-center capitalize">{menu.name}</h1>
      {/* <p className='italic text-center'>
        something something something
      </p> */}
      {links}
      {menu && menu.items && (menu.items.length as number) > 0 &&
        <div className="md:self-center">
          <Menu {...{ ...menu, showDetails }} />
        </div>
      }
      {links}
    </main>
  )
}
