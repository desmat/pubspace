// 'use server'

import { User } from 'firebase/auth';
import moment from 'moment';
import OpenAI from 'openai';
import { Menu } from "@/types/Menus";
import { uuid } from '@/utils/misc';

let store: any;
import(`@/services/stores/${process.env.STORE_TYPE}`).then((importedStore) => {
    store = importedStore;
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SAMPLE_MENU = { "menu": [{ "name": "Spaghetti Carbonara", "description": "Classic pasta dish featuring a creamy sauce made from eggs, cheese, pancetta, and black pepper", "ingredients": ["200 grams Spaghetti", "100 grams Pancetta", "50 grams Pecorino cheese", "50 grams Parmigiano Reggiano cheese", "2 Large Eggs", "Salt", "Black Pepper"], "preparation": "Bring a pot of salted water to a boil. Cook spaghetti until al dente. In a separate pan, cook guanciale or pancetta until crispy. In a bowl, whisk together the eggs and cheese, then mix in a small amount of the pasta water to create a creamy sauce. Combine the cooked pasta with the cooked guanciale or pancetta, then stir in the egg and cheese mixture. Season with salt and black pepper." }, { "name": "Fettuccine Alfredo", "description": "Simple yet decadent pasta dish consisting of fettuccine tossed with Parmesan cheese and butter", "ingredients": ["fettuccine", "butter", "Parmesan cheese", "salt", "black pepper"], "preparation": "Cook the fettuccine until al dente, reserve some pasta water. In a separate pan melt butter, add half of the Parmesan cheese and pasta water, stir until a sauce forms. Add the cooked pasta, top with the remaining cheese, and toss until the pasta is fully coated. Season with salt and pepper." }, { "name": "Penne alla Vodka", "description": "Delicious pasta dish featuring a creamy tomato sauce with a touch of vodka", "ingredients": ["penne", "olive oil", "garlic", "red pepper flakes", "canned crushed tomatoes", "vodka", "heavy cream", "Parmesan cheese", "salt", "black pepper"], "preparation": "Cook penne until al dente. In a separate pan, saute garlic and red pepper flakes in olive oil, add the tomatoes and vodka, and let it simmer to cook off the alcohol. Stir in heavy cream, and let it simmer until the sauce thickens. Mix in the cooked penne and grated Parmesan cheese. Season with salt and pepper." }, { "name": "Lasagna", "description": "Layered pasta dish made with lasagna sheets, ragù (meat sauce), Béchamel (white sauce) and Parmesan cheese.", "ingredients": ["lasagna sheets", "ground beef or pork", "carrot", "celery", "onion", "canned crushed tomatoes", "flour", "milk", "Parmesan cheese", "butter", "salt", "black pepper"], "preparation": "Make the ragù by sautéing the carrot, celery, and onion, add the ground meat, and once browned, add the tomatoes and let it simmer. Make the Béchamel sauce by melting butter in a pan, add flour and slowly whisk in milk until smooth and creamy. Cook lasagna sheets. Layer the lasagna starting with a layer of ragù, then lasagna sheets, Béchamel sauce, and a sprinkling of Parmesan cheese, repeat the layers. Bake until browned and bubbling." }, { "name": "Pesto Pasta", "description": "Classic Genovese dish featuring pasta tossed with basil pesto sauce", "ingredients": ["pasta of your choice", "fresh basil leaves", "pine nuts", "Parmesan cheese", "garlic", "extra-virgin olive oil", "salt"], "preparation": "Cook your pasta of choice until al dente. Make the pesto by blending together the basil, pine nuts, Parmesan, garlic, and oil. Combine the cooked pasta with the pesto sauce and toss until well coated. Season with salt." }] };


async function generateMenu(type: string, numItems: number): Promise<any> {
  console.log(`>> services.trivia.generateMenu`, { type, numItems });

  // // for testing
  // return new Promise((resolve, reject) => resolve({ prompt: "THE PROMPT", items: SAMPLE_MENU.menu as MenuItem[] }));

  const prompt = `Generate a menu with ${numItems} ${type} items.`;
  const completion = await openai.chat.completions.create({
    // model: 'gpt-3.5-turbo',
    model: 'gpt-4',
    // model: "gpt-3.5-turbo-1106",
    // response_format: { type: "json_object" },    
    messages: [
      {
        role: 'system',
        content: `You are an assistant that receives a request to create a menu with a given style. 
Please respond ONLY with JSON data containing name, a short description, ingredients (please include quantities or volumes) and preparation instructions with only the following keys: "name", "description", "ingredients", "preparation" with root key "menu".
The "ingredients" key should only contain an array of strings.`
      },
      {
        role: 'user',
        content: prompt,
      }
    ],
  });

  try {
    console.log("*** RESULTS FROM API", completion);
    console.log("*** RESULTS FROM API (as json)", JSON.stringify(JSON.parse(completion.choices[0].message.content || "{}")));
    return { type, prompt, response: JSON.parse(completion.choices[0]?.message?.content || "{}")};
  } catch (error) {
    console.error("Error reading results", { completion, error });
  }  
}

export async function getMenus(user?: User): Promise<Menu[]> {
  const menus = await store.getMenus();
  // const menus = [
  //   {id: "1", name: "NAME 1", status: "created", items: SAMPLE_MENU.menu},
  //   {id: "2", name: "NAME 2", status: "created", items: SAMPLE_MENU.menu},
  //   {id: "3", name: "NAME 3247973432842", status: "created", items: SAMPLE_MENU.menu},
  //   {id: "3", status: "created", name: "Italian Pasta", items: SAMPLE_MENU.menu},
  //   {id: "3", status: "generating", name: "New brunch menu", items: SAMPLE_MENU.menu},
  // ];
  return new Promise((resolve, reject) => resolve(menus));
}

export async function getMenu(id: string): Promise<Menu> {
  console.log(`>> services.trivia.getMenu`, { id });

  const menu = await store.getMenu(id);
  console.log(`>> services.trivia.getMenu`, { id, menu });
  return new Promise((resolve, reject) => resolve(menu));
}

export async function createMenu(user: User, name: string, type: string, numItems: number): Promise<Menu> {
  const res = await generateMenu(type, numItems);
  
  if (!res.response.menu || !res.response) {
    console.error("No menu items generated", res.response);
    throw `No menu items generated`
  }

  const menu = {
    id: uuid(),
    createdBy: user.uid,
    createdAt: moment().valueOf(),
    status: "created",
    prompt: res.prompt,
    name,
    items: res.response.menu || res.response,
  }

  return store.addMenu(menu);
}

export async function deleteMenu(user: any, id: string): Promise<void> {
  console.log(">> services.trivia.deleteMenu", { id, user });

  if (!id) {
    throw `Cannot delete menu with null id`;
  }

  const menu = await getMenu(id);
  if (!menu) {
    throw `Menu not found: ${id}`;
  }

  if (!(menu.createdBy == user.uid || user.customClaims?.admin)) {
    throw `Unauthorized`;
  }

  store.deleteMenu(id);
  return new Promise((resolve, reject) => resolve());
}
