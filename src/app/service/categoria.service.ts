import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Categoria, NewCategoria } from '../model/categoria';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl =
    'https://project-works-rest-api.onrender.com/api/v1/GROUP-I/category';

  constructor(private http: HttpClient) {}

  //   private categoriaSubject = new Subject<Categoria[]>();

  //   categorie$ = this.categoriaSubject.asObservable();

  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  addCategorie(newC: NewCategoria) {
    return this.http.post(this.apiUrl, newC);
  }

  deleteCategoria(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
