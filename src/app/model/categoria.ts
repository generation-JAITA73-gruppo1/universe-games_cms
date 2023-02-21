export interface Categoria {
  id: string;
  name: string;
  __v: number;
}

export type NewCategoria = Omit<Categoria, 'id' | '__v'>;
