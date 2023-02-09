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

export type NewNews = Omit<News, '_id' | '__v'>;
