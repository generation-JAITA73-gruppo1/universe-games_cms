export interface Categoria {
  _id: string;
  name: string;
  v: number;
}

export type NewCategoria = Omit<Categoria, '_id' | 'v'>;
