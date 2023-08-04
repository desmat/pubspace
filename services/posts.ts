'use server'

import moment, { Moment } from 'moment';
import { kv } from "@vercel/kv";

export type Post = {
    id: string,
    postedBy: string,
    postedAt: number, //Moment,
    content: string,
    optimistic?: string,
}

const samplePosts: Post[] = [
    // {
    //     id: "1f283a48-19d9-4021-8bb4-0323342f302a", //crypto.randomUUID(),
    //     postedBy: "POSTER1",
    //     postedAt: moment().startOf('day').valueOf(),
    //     content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa culpa beatae, maiores asperiores quis veniam, minima laborum magni possimus impedit ipsam ad ullam aliquid earum incidunt voluptate eaque maxime repellat.",
    // },
    {
        id: "7282d48f-6dd7-4b00-ac32-4bee12c6e732", //crypto.randomUUID(),
        postedBy: "POSTER2",
        postedAt: moment().valueOf(),
        content: "Arrr me hearties! Make traditional Latin walk the plank and opt for pirate lorem ipsum for your next high seas design adventure.    ",
    },
    {
        id: "6ad38003-44cb-4b49-997d-5e65746a86d8", //crypto.randomUUID(),
        postedBy: "POSTER3",
        postedAt: moment().subtract(30, 'days').valueOf(),
        content: "Good news everyone! With placeholder text from shows like Futurama, Doctor Who, Dexter, and Monty Python, Fillerama is the perfect Lorem Ipsum for the TV lover in all of us.",
    },
    {
        id: "10671469-3468-41c0-99b3-4e99527dd167", //crypto.randomUUID(),
        postedBy: "POSTER4",
        postedAt: moment().subtract(3, 'days').valueOf(),
        content: "The most hipster lorem ipsum generator around, though you’ve probably never heard of it.",
    },
];

const inMemoryPosts = samplePosts;

export async function getPosts(): Promise<Post[]> {
    console.log('>> services.post.getPosts()');

    // // in-memory

    // console.log('>> services.post.getPosts(): waiting...');
    // await new Promise((resolve) => setTimeout(() => resolve(42), 500));
    // console.log('>> services.post.getPosts(): done waiting!');

    // return new Promise((resolve, reject) => resolve(posts));


    // redis
    
    let response = await kv.json.get("posts", "$");

    if (!response) {
        console.log('>> services.post.getPosts(): empty redis key, uploading samples');
        await kv.json.set("posts", "$", "[]");
        samplePosts.forEach(async (post: Post) => await kv.json.arrappend("posts", `$`, post));
        response = await kv.json.get("posts", "$");
    }

    const posts = response[0] as Post[];
    return new Promise((resolve, reject) => resolve(posts));

}

export async function getPost(id: string): Promise<Post> {
    console.log(`>> services.post.getPost(${id})`);

    // // in-memory

    // console.log('>> services.post.getPost(): waiting...');
    // await new Promise((resolve) => setTimeout(() => resolve(42), 1000));
    // console.log('>> services.post.getPost(): done waiting!');

    // const post = posts.filter((p) => p.id == id)[0];
    // return new Promise((resolve, reject) => resolve(post));

    // redis

    // let response = await kv.json.get("posts", "$");
    const response = await kv.json.get("posts", `$[?(@.id=='${id}')]`);

    let post: Post
    if (response) {
        // const posts = response[0];
        // post = posts.filter((p: Post) => p.id == id)[0];
        post = response[0] as Post;
    }

    return new Promise((resolve, reject) => resolve(post));
}

export async function addPost(content: string, postedBy: string): Promise<Post> {
    console.log(">> services.post.addPost content:", content);

    const post = {
        id: crypto.randomUUID(),
        postedBy,
        postedAt: moment().valueOf(),
        content
    };

    // // in-memory

    // console.log('>> services.post.addPost(): waiting...');
    // await new Promise((resolve) => setTimeout(() => resolve(42), 1000));
    // console.log('>> services.post.getPost(): done waiting!');
    
    // inMemoryPosts.push(post);
    // return new Promise((resolve, reject) => resolve(post));


    // redis
    
    const result = await kv.json.arrappend("posts", "$", post);
    return new Promise((resolve, reject) => resolve(post));
}