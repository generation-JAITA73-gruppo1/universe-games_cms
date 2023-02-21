export interface Videogioco {
  id: string;
  title: string;
  category: string;
  releaseDate: Date;
  genre: string;
  softwareHouse: string;
  publisher: string;
  numberOfPlayers: number;
  languages: Lingua;
  __v: number;
  coverImage: string;
}

export type NewVideogioco = Omit<Videogioco, 'id' | '__v'>;
export type VideogiocoSkimmed = Omit<
  Videogioco,
  | '__v'
  | 'category'
  | 'releaseDate'
  | 'genre'
  | 'softwareHouse'
  | 'publisher'
  | 'numberOfPlayers'
  | 'languages'
  | 'coverImage'
>;

export interface Lingua {
  voice: string[];
  text: string[];
}
