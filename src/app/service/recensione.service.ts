import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NewRecensione, Recensione } from '../model/recensione';

@Injectable({ providedIn: 'root' })
export class RecensioneService {
  private apiUrl = 'http://localhost:3000/review';

  constructor(private http: HttpClient) {}

  private recensioneSubject = new Subject<Recensione[]>();

  private recensione: Recensione[] = [];

  recenzione$ = this.recensioneSubject.asObservable();

  getRecensioni(): Observable<Recensione[]> {
    return this.http.get<Recensione[]>(this.apiUrl);
  }
  getRecensione(id: string) {
    return this.http.get<Recensione>(`${this.apiUrl}/${id}`, {});
  }
  addRecensione(nuovaRecensione: Observable<Recensione[]>) {
    return this.http.post<Recensione[]>(this.apiUrl, nuovaRecensione);
  }
  postRecensione(newNews: Omit<Recensione, 'id'>) {
    return this.http.post(this.apiUrl, newNews);
  }

  //manca il metodo put

  deleteRecensione(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  putRecensione(id: string, oldData: NewRecensione, __v: number) {
    const newData: Recensione = {
      ...oldData,
      id: id,
      __v,
    };
    return this.http.put(`${this.apiUrl}/${id}`, newData);
  }
}
