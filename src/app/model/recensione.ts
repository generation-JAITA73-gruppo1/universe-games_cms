export interface Recensione {
  id: string;
  title: string;
  publicationDate: Date;
  content: string;
  score: number;
  reviewerName: string;
  imageUrls: string[];
  reviewedGame: ReviewedGame;
  __v: number;
}

export interface ReviewedGame {
  id: string;
  name: string;
}

export type NewRecensione = Omit<Recensione, 'id' | '__v'>;
