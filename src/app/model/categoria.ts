export interface Categoria {
  _id: string;
  name: string;
  __v: number;
}

export type NewCategoria = Omit<Categoria, '_id' | '__v'>;
