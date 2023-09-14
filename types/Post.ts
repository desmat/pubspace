export type Post = {
    id?: string,
    position?: number,
    postedBy: string,
    postedByUID?: string,
    postedAt: number, //Moment,
    content: string,
    optimistic?: string,
    deletedAt?: number,
}
