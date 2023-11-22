// 'use server'

import moment from 'moment';
import { Post } from "@/types/Post";
import { Game, Question } from "@/types/Trivia";
import { samplePosts } from './samples';

let inMemoryPosts = samplePosts;
let inMemoryTriviaGames = [] as Game[];
let inMemoryTriviaQuestions = [] as Question[];


//
// Trivia 
//

export async function getTriviaGames(): Promise<Game[]> {
    console.log('>> services.stores.memory.getTriviaGames()');

    return inMemoryTriviaGames;
}

export async function getTriviaGame(id: string): Promise<Game | null> {
    console.log(`>> services.stores.memory.getTriviaGame(${id})`, { inMemoryTriviaGames });

    return inMemoryTriviaGames.filter((g) => g.id === id)[0];
}

export async function addTriviaGame(game: Game): Promise<Game> {
    console.log(">> services.stores.memory.addTriviaGame", { game });

    inMemoryTriviaGames.push(game);
    return game;
}

export async function deleteTriviaGame(id: string): Promise<void> {
    console.log(">> services.stores.memory.deleteTriviaGame", { id });

    if (!id) {
        throw `Cannot delete trivia game with null id`;
    }
    
    const games = inMemoryTriviaGames.filter((game: Game) => game.id != id);
    inMemoryTriviaGames = games;
}

export async function getTriviaQuestions(): Promise<Question[]> {
    console.log('>> services.stores.memory.getTriviaQuestions()', { inMemoryTriviaQuestions });

    return inMemoryTriviaQuestions;
}

export async function addTriviaQuestions(questions: Question[]): Promise<Question[]> {
    console.log(">> services.stores.memory.addTriviaQuestions", { questions });

    inMemoryTriviaQuestions = inMemoryTriviaQuestions.concat(questions);
    return questions;
}


//
// Posts
//

export async function getPosts(): Promise<Post[]> {
    console.log('>> services.stores.memory.getPosts()');

    // console.log('>> services.stores.memory.getPosts(): waiting...');
    // await new Promise((resolve) => setTimeout(() => resolve(42), 500));
    // console.log('>> services.stores.memory.getPosts(): done waiting!');

    return inMemoryPosts;
}

export async function getPost(id: string): Promise<Post | null> {
    console.log(`>> services.stores.memory.getPost(${id})`);

    // console.log('>> services.stores.memory.getPost(): waiting...');
    // await new Promise((resolve) => setTimeout(() => resolve(42), 1000));
    // console.log('>> services.stores.memory.getPost(): done waiting!');

    return inMemoryPosts.filter((p) => p.id == id)[0];
}

export async function addPost(content: string, postedBy: string, postedByUID?: string, position?: number): Promise<Post> {
    console.log(">> services.stores.memory.addPost content:", { content, postedBy });

    const post = {
        id: crypto.randomUUID(),
        position,
        postedBy,
        postedByUID,
        postedAt: moment().valueOf(),
        content
    };

    // console.log('>> services.stores.memory.addPost(): waiting...');
    // await new Promise((resolve) => setTimeout(() => resolve(42), 1000));
    // console.log('>> services.stores.memory.getPost(): done waiting!');

    inMemoryPosts.push(post);
    return post;
}

export async function editPost(post: Post): Promise<Post> {
    console.log(">> services.stores.memory.editPost post:", post);

    if (!post.id) {
        throw `Cannot delete post with null id`;
    } 

    const posts = inMemoryPosts.filter((p: Post) => p.id != post.id);
    posts.push(post);
    inMemoryPosts = posts;
    return post;
}

export async function deletePost(id: string): Promise<void> {
    console.log(">> services.stores.memory.deletePost id:", id);

    if (!id) {
        throw `Cannot delete post with null id`;
    }
    
    const posts = inMemoryPosts.filter((p: Post) => p.id != id);
    inMemoryPosts = posts;
}
