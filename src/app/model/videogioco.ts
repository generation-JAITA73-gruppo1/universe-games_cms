export interface Videogioco {
  _id: string;
  title: string;
  category: string;
  releaseDate: Date;
  genre: string;
  softwareHouse: string;
  publisher: string;
  numberOfPlayers: number;
  languages: Lingua;
  _v: number;
  coverImage: string;
}

export type NewRecensione = Omit<Videogioco, '_id' | '__v'>;

export interface Lingua {
  voice: string[];
  text: string[];
}
