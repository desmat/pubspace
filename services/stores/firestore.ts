// 'use server'

import * as firestore from "firebase/firestore"
import moment from 'moment';
import * as firebase from '@/services/firebase'
import { Post } from "@/types/Post"
import { Game, Question } from "@/types/Trivia";
import { samplePosts } from './samples';
import * as memoryStore from "./memory"


//
// Trivia 
//

export async function getTriviaGames(): Promise<Game[]> {
    console.log('>> services.stores.firestore.getTriviaGames()');

    const c = firestore.collection(firebase.db, "trivia-games")
    const q = firestore.query(c);
    let snapshot = await firestore.getDocs(q);
    // console.log("*** snapshot: ", { snapshot });

    const games: Game[] = [];
    snapshot.forEach((result: any) => games.push({ ...result.data() as Game, id: result.id }));
    // console.log("*** firestore games", JSON.stringify(posts));
   return games;
}

export async function getTriviaGame(id: string): Promise<Game | null> {
    console.log(`>> services.stores.firestore.getTriviaGame(${id})`, { id });

    const ref = firestore.doc(firebase.db, "trivia-games", id);
    let snapshot = await firestore.getDoc(ref);
    // console.log("*** snapshot: ", { snapshot });

    if (!snapshot.exists()) {
        console.warn('>> services.stores.firestore.getTriviaGame(): trivia game not found', id);
        return null;
    }

    const game = { ...snapshot.data() as Game, id: snapshot.id };
    return game;
}

export async function addTriviaGame(game: Game): Promise<Game> {
    console.log(">> services.stores.firestore.addTriviaGame", { game });

    // TODO set createdAt

    const c = firestore.collection(firebase.db, "trivia-games")
    const ref = await firestore.addDoc(c, game);
    const result = await firestore.getDoc(ref);
    const newGame = { ...result.data() as Game, id: result.id };
    // console.log("*** firestore new game", { id: result.id, post: JSON.stringify(newGame) });
    return newGame;
}

export async function deleteTriviaGame(id: string): Promise<void> {
    console.log(">> services.stores.firestore.deleteTriviaGame", { id });

    if (!id) {
        throw `Cannot delete trivia game with null id`;
    }

    const ref = firestore.doc(firebase.db, "trivia-games", id);
    await firestore.deleteDoc(ref);
}

export async function getTriviaQuestions(): Promise<Question[]> {
    console.log('>> services.stores.firestore.getTriviaQuestions()');

    const c = firestore.collection(firebase.db, "trivia-questions")
    const q = firestore.query(c);
    let snapshot = await firestore.getDocs(q);
    // console.log("*** snapshot: ", { snapshot });

    const questions: Question[] = [];
    snapshot.forEach((result: any) => questions.push({ ...result.data() as Question, id: result.id }));
    // console.log("*** firestore questions", JSON.stringify(questions));
   return questions;
}

export async function addTriviaQuestions(questions: Question[]): Promise<Question[]> {
    console.log(">> services.stores.firestore.addTriviaQuestions", { questions });

    // TODO set createdAt

    const c = firestore.collection(firebase.db, "trivia-questions");

    const refs = await Promise.all(questions.map((q: Question) => firestore.addDoc(c, q)));
    console.log("*** firestore new questions", { refs });

    return questions;
}


//
// Posts
//

export async function getPosts(): Promise<Post[]> {
    console.log('>> services.stores.firestore.getPosts()');

    const c = firestore.collection(firebase.db, "posts")
    const q = firestore.query(c); //, firestore.where("capital", "==", true));
    let snapshot = await firestore.getDocs(q);
    // console.log("*** snapshot: ", { snapshot });

    if (snapshot.empty) {
        console.log('>> services.stores.firestore.getPosts(): empty snapshot, uploading samples');
        // await kv.json.set("posts", "$", "[]");
        samplePosts.forEach(async (post: Post) => await firestore.addDoc(c, post));
        snapshot = await firestore.getDocs(q);
    }

    const posts: Post[] = [];
    snapshot.forEach((result: any) => posts.push({ ...result.data() as Post, id: result.id }));
    // console.log("*** firestore posts", JSON.stringify(posts));
   return posts;
}

export async function getPost(id: string): Promise<Post | null> {
    console.log(`>> services.stores.firestore.getPost(${id})`);

    const ref = firestore.doc(firebase.db, "posts", id);
    let snapshot = await firestore.getDoc(ref);
    // console.log("*** snapshot: ", { snapshot });

    if (!snapshot.exists()) {
        console.warn('>> services.stores.firestore.getPost(): post not found', id);
        return null;
    }

    const post = { ...snapshot.data() as Post, id: snapshot.id }
    return post;
}

export async function addPost(content: string, postedBy: string, postedByUID?: string, position?: number): Promise<Post> {
    console.log(">> services.stores.firestore.addPost content:", { content, postedBy });

    const post = {
        id: crypto.randomUUID(),
        position,
        postedBy,
        postedByUID,
        postedAt: moment().valueOf(),
        content
    };

    const c = firestore.collection(firebase.db, "posts")
    const ref = await firestore.addDoc(c, post);
    const result = await firestore.getDoc(ref);
    const newPost = { ...result.data() as Post, id: result.id };
    // console.log("*** firestore new post", { id: result.id, post: JSON.stringify(newPost) });
    return newPost;
}

export async function editPost(post: Post): Promise<Post> {
    console.log(">> services.stores.firestore.editPost post:", post);

    if (!post.id) {
        throw `Cannot delete post with null id`;
    } 

    const ref = firestore.doc(firebase.db, "posts", post.id);
    await firestore.updateDoc(ref, post);
    const doc = await firestore.getDoc(ref);

    return doc.data() as Post;
}

export async function deletePost(id: string): Promise<void> {
    console.log(">> services.stores.firestore.deletePost id:", id);

    if (!id) {
        throw `Cannot delete post with null id`;
    }

    const ref = firestore.doc(firebase.db, "posts", id);
    await firestore.deleteDoc(ref);
}
