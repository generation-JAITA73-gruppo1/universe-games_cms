export interface News {
    id: string,
    title: string,
    category: string,
    imageUrl: string,
    content: string,
    publicationDate: Date,
    authorName: string,
    tags: string[],
    __v: number
}