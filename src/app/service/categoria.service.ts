import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Categoria, NewCategoria } from '../model/categoria';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/category';

  constructor(private http: HttpClient) {}

  //   private categoriaSubject = new Subject<Categoria[]>();

  //   categorie$ = this.categoriaSubject.asObservable();

  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
  getCategoria(id: string) {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`, {});
  }

  addCategorie(newC: NewCategoria) {
    return this.http.post(this.apiUrl, newC);
  }

  deleteCategoria(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  putCategoria(id: string, oldData: NewCategoria, __v: number) {
    const newData: Categoria = {
      ...oldData,
      id: id,
      __v,
    };
    return this.http.put(`${this.apiUrl}/${id}`, newData);
  }
}
