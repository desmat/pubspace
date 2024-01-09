// 'use server'

import moment from 'moment';
import { kv } from "@vercel/kv";
import { Menu, MenuItem } from "@/types/Menus";
import { Post } from "@/types/Post";
import { Game, Question } from "@/types/Trivia";
import { uuid } from '@/utils/misc';
import { samplePosts } from './samples';

const menusKey = "menus";
const postsKey = "posts";
const triviaGamesKey = "trivia-games";
const triviaQuestionsKey = "trivia-questions";
const jsonGetNotDeleted = "$[?((@.deletedAt > 0) == false)]";
const jsonGetById = (id: string) => `$[?(@.id=='${id}')]`;

/*
    Some useful commands

    keys *
    json.get posts $
    json.get posts '$[?((@.deletedAt > 0) == false)]'
    json.get posts '$[?((@.deletedAt > 0) == true)]'
    json.get posts '$[?(@.postedBy=="Mathieu Desjarlais")]'
    json.get posts '$[?(@.content ~= "(?i)lorem")]'
    del posts
*/



//
// Menus 
//

export async function getMenus(): Promise<Menu[]> {
    console.log('>> services.stores.redis.getMenus()');

    let response = await kv.json.get(menusKey, jsonGetNotDeleted);
    console.log("REDIS response", JSON.stringify(response));

    if (!response || !response.length) {
        console.log('>> services.stores.redis.getMenus(): empty redis key, creating empty list');
        await kv.json.set(menusKey, "$", "[]");
        response = await kv.json.get(menusKey, jsonGetNotDeleted);
    }

    return response as Menu[];
}

export async function getMenu(id: string): Promise<Menu | null> {
    console.log(`>> services.stores.redis.getMenu(${id})`, { id });

    const response = await kv.json.get(menusKey, jsonGetById(id));

    let menu: Menu | null = null;
    if (response) {
        menu = response[0] as Menu;
    }

    return menu;
}

export async function addMenu(menu: Menu): Promise<Menu> {
    console.log(">> services.stores.redis.addMenu", { menu });

    const response = await kv.json.arrappend(menusKey, "$", menu);
    console.log("REDIS response", response);

    return new Promise((resolve) => resolve(menu));
}

export async function deleteMenu(id: string): Promise<void> {
    console.log(">> services.stores.redis.deleteMenu", { id });

    if (!id) {
        throw `Cannot delete trivia menu with null id`;
    }

    // const response = await kv.json.set(menusKey, `${jsonGetById(id)}.deletedAt`, moment().valueOf());
    const response = await kv.json.del(menusKey, `${jsonGetById(id)}`);
    console.log("REDIS response", response);
}


//
// Trivia 
//

export async function getTriviaGames(): Promise<Game[]> {
    console.log('>> services.stores.redis.getTriviaGames()');

    let response = await kv.json.get(triviaGamesKey, jsonGetNotDeleted);
    console.log("REDIS response", JSON.stringify(response));

    if (!response || !response.length) {
        console.log('>> services.stores.redis.getTriviaGames(): empty redis key, creating empty list');
        await kv.json.set(triviaGamesKey, "$", "[]");
        response = await kv.json.get(triviaGamesKey, jsonGetNotDeleted);
    }

    return response as Game[];
}

export async function getTriviaGame(id: string): Promise<Game | null> {
    console.log(`>> services.stores.redis.getTriviaGame(${id})`, { id });

    const response = await kv.json.get(triviaGamesKey, jsonGetById(id));

    let game: Game | null = null;
    if (response) {
        game = response[0] as Game;
    }

    return game;
}

export async function addTriviaGame(game: Game): Promise<Game> {
    console.log(">> services.stores.redis.addTriviaGame", { game });

    const response = await kv.json.arrappend(triviaGamesKey, "$", game);
    console.log("REDIS response", response);

    return game;
}

export async function deleteTriviaGame(id: string): Promise<void> {
    console.log(">> services.stores.redis.deleteTriviaGame", { id });

    if (!id) {
        throw `Cannot delete trivia game with null id`;
    }

    // const response = await kv.json.set(triviaGamesKey, `${jsonGetById(id)}.deletedAt`, moment().valueOf());
    const response = await kv.json.del(triviaGamesKey, `${jsonGetById(id)}`);
    console.log("REDIS response", response);
}

export async function getTriviaQuestions(): Promise<Question[]> {
    console.log('>> services.stores.redis.getTriviaQuestions()', {});

    let response = await kv.json.get(triviaQuestionsKey, jsonGetNotDeleted);
    console.log("REDIS response", JSON.stringify(response));

    if (!response || !response.length) {
        console.log('>> services.stores.redis.getTriviaQuestions(): empty redis key, creating empty list');
        await kv.json.set(triviaQuestionsKey, "$", "[]");
        response = await kv.json.get(triviaQuestionsKey, jsonGetNotDeleted);
    }

    return response as Question[];
}

export async function addTriviaQuestions(questions: Question[]): Promise<Question[]> {
    console.log(">> services.stores.redis.addTriviaQuestions", { questions });

    const response = await kv.json.arrappend(triviaQuestionsKey, "$", ...questions);
    console.log("REDIS response", response);

    return questions;
}


//
// Posts
//

export async function getPosts(): Promise<Post[]> {
    console.log('>> services.stores.redis.getPosts()');

    let response = await kv.json.get(postsKey, jsonGetNotDeleted);
    console.log("REDIS response", JSON.stringify(response));

    if (!response || !response.length) {
        console.log('>> services.stores.redis.getPosts(): empty redis key, uploading samples');
        await kv.json.set(postsKey, "$", "[]");
        samplePosts.forEach(async (post: Post) => await kv.json.arrappend(postsKey, `$`, post));
        response = await kv.json.get(postsKey, jsonGetNotDeleted);
    }

    return response as Post[];
}

export async function getPost(id: string): Promise<Post | null> {
    console.log(`>> services.stores.redis.getPost(${id})`);

    const response = await kv.json.get(postsKey, jsonGetById(id));

    let post: Post | null = null;
    if (response) {
        post = response[0] as Post;
    }

    return post;
}

export async function addPost(content: string, postedBy: string, postedByUID?: string, position?: number): Promise<Post> {
    console.log(">> services.stores.redis.addPost content:", { content, postedBy });

    const post = {
        id: uuid(),
        position,
        postedBy,
        postedByUID,
        postedAt: moment().valueOf(),
        content
    };

    const response = await kv.json.arrappend(postsKey, "$", post);
    console.log("REDIS response", response);

    return post;
}

export async function editPost(post: Post): Promise<Post> {
    console.log(">> services.stores.redis.editPost post:", post);

    if (!post.id) {
        throw `Cannot delete post with null id`;
    } 

    const response = await kv.json.set(postsKey, jsonGetById(post.id), post);
    console.log("REDIS response", response);
    
    return post
}

export async function deletePost(id: string): Promise<void> {
    console.log(">> services.stores.redis.deletePost id:", id);

    if (!id) {
        throw `Cannot delete post with null id`;
    }


    // const response = await kv.json.set(postsKey, `${jsonGetById(id)}.deletedAt`, moment().valueOf());
    const response = await kv.json.del(postsKey, `${jsonGetById(id)}`);
    console.log("REDIS response", response);
}
