export type Post = {
    id?: string,
    postedBy: string,
    postedAt: number, //Moment,
    content: string,
    optimistic?: string,
}
