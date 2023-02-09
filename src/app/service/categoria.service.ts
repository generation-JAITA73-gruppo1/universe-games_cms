import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({ providedIn: 'root' })
export class categoriaService {
  private apiUrl =
    'https://project-works-rest-api.onrender.com/api/v1/GROUP-I/category';

  constructor(private http: HttpClient) {}

  private categoriaSubject = new Subject<Categoria[]>();

  categorie$ = this.categoriaSubject.asObservable();

  getCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}
