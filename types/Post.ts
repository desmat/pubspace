export type Post = {
    id?: string,
    postedBy: string,
    postedByUID?: string,
    postedAt: number, //Moment,
    content: string,
    optimistic?: string,
}
