// 'use server'

import { User } from 'firebase/auth';
import moment from 'moment';
import OpenAI from 'openai';
import { Menu, MenuItem } from "@/types/Menus";
import shuffleArray from '@/utils/shuffleArray';

// let store: any;
// import(`@/services/stores/${process.env.STORE_TYPE}`).then((importedStore) => {
//   store = importedStore;
// });

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });


const SAMPLE_MENU = { "menu": [{ "name": "Spaghetti Carbonara", "description": "Classic pasta dish featuring a creamy sauce made from eggs, cheese, pancetta, and black pepper", "ingredients": ["200 grams Spaghetti", "100 grams Pancetta", "50 grams Pecorino cheese", "50 grams Parmigiano Reggiano cheese", "2 Large Eggs", "Salt", "Black Pepper"], "preparation": "Bring a pot of salted water to a boil. Cook spaghetti until al dente. In a separate pan, cook guanciale or pancetta until crispy. In a bowl, whisk together the eggs and cheese, then mix in a small amount of the pasta water to create a creamy sauce. Combine the cooked pasta with the cooked guanciale or pancetta, then stir in the egg and cheese mixture. Season with salt and black pepper." }, { "name": "Fettuccine Alfredo", "description": "Simple yet decadent pasta dish consisting of fettuccine tossed with Parmesan cheese and butter", "ingredients": ["fettuccine", "butter", "Parmesan cheese", "salt", "black pepper"], "preparation": "Cook the fettuccine until al dente, reserve some pasta water. In a separate pan melt butter, add half of the Parmesan cheese and pasta water, stir until a sauce forms. Add the cooked pasta, top with the remaining cheese, and toss until the pasta is fully coated. Season with salt and pepper." }, { "name": "Penne alla Vodka", "description": "Delicious pasta dish featuring a creamy tomato sauce with a touch of vodka", "ingredients": ["penne", "olive oil", "garlic", "red pepper flakes", "canned crushed tomatoes", "vodka", "heavy cream", "Parmesan cheese", "salt", "black pepper"], "preparation": "Cook penne until al dente. In a separate pan, saute garlic and red pepper flakes in olive oil, add the tomatoes and vodka, and let it simmer to cook off the alcohol. Stir in heavy cream, and let it simmer until the sauce thickens. Mix in the cooked penne and grated Parmesan cheese. Season with salt and pepper." }, { "name": "Lasagna", "description": "Layered pasta dish made with lasagna sheets, ragù (meat sauce), Béchamel (white sauce) and Parmesan cheese.", "ingredients": ["lasagna sheets", "ground beef or pork", "carrot", "celery", "onion", "canned crushed tomatoes", "flour", "milk", "Parmesan cheese", "butter", "salt", "black pepper"], "preparation": "Make the ragù by sautéing the carrot, celery, and onion, add the ground meat, and once browned, add the tomatoes and let it simmer. Make the Béchamel sauce by melting butter in a pan, add flour and slowly whisk in milk until smooth and creamy. Cook lasagna sheets. Layer the lasagna starting with a layer of ragù, then lasagna sheets, Béchamel sauce, and a sprinkling of Parmesan cheese, repeat the layers. Bake until browned and bubbling." }, { "name": "Pesto Pasta", "description": "Classic Genovese dish featuring pasta tossed with basil pesto sauce", "ingredients": ["pasta of your choice", "fresh basil leaves", "pine nuts", "Parmesan cheese", "garlic", "extra-virgin olive oil", "salt"], "preparation": "Cook your pasta of choice until al dente. Make the pesto by blending together the basil, pine nuts, Parmesan, garlic, and oil. Combine the cooked pasta with the pesto sauce and toss until well coated. Season with salt." }] };

const store = [
  {
    id: "1",
    // createdBy: user.uid,
    createdAt: moment().valueOf(),
    name: "NAME A",
    // prompt,
    description: "DESCRIPTION A",
    items: SAMPLE_MENU.menu
  },
  {
    id: "2",
    // createdBy: user.uid,
    createdAt: moment().valueOf(),
    name: "NAME B",
    // prompt,
    description: "DESCRIPTION B",
    items: SAMPLE_MENU.menu
  },
  
] as any[];


async function generateMenu(type: string, numItems: number): Promise<any> {
  // TODO
  return new Promise((resolve, reject) => resolve({ prompt: "THE PROMPT", items: SAMPLE_MENU.menu as MenuItem[] }));
}

export async function getMenus(user?: User) /* : Promise<Menu[]> */ {

  return new Promise((resolve, reject) => resolve(store));
}

export async function getMenu(id: string) /* : Promise<Menu> */ {
   return new Promise((resolve, reject) => resolve(store.filter((menu: any) => menu.id == id)[0]));
}

export async function createMenu(user: User, name: string, type: string, numItems: number) /* : Promise<Menu> */ {
  const { prompt, items } = await generateMenu(type, numItems);
  const menu = {
    id: crypto.randomUUID(),
    createdBy: user.uid,
    createdAt: moment().valueOf(),
    name,
    prompt,
    items
  }

  // TODO save

  return new Promise((resolve, reject) => resolve(menu));
}

export async function deleteMenu(user: User, id: string) /* : Promise<void> */ {

}
