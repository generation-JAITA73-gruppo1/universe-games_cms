import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Recensione } from '../model/recensione';

@Injectable({ providedIn: 'root' })
export class RecensioneService {
  private apiUrl =
    'https://project-works-rest-api.onrender.com/api/v1/GROUP-I/review';

  constructor(private http: HttpClient) {}

  private recensioneSubject = new Subject<Recensione[]>();

  private recensione: Recensione[] = [];

  recenzione$ = this.recensioneSubject.asObservable();

  getRecensioni(): Observable<Recensione[]> {
    return this.http.get<Recensione[]>(this.apiUrl);
  }
  addRecensione(nuovaRecensione: Observable<Recensione[]>) {
    return this.http.post<Recensione[]>(this.apiUrl, nuovaRecensione);
  }
  postRecensione(newNews: Omit<Recensione, 'id'>) {
    return this.http.post(this.apiUrl, newNews)
  }

  //manca il metodo put 

  deleteRecensione(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
