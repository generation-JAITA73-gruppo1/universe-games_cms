import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NewVideogioco, Videogioco } from '../model/videogioco';

@Injectable({ providedIn: 'root' })
export class VideogiocoService {
  private apiUrl = 'http://localhost:3000/videogame';

  constructor(private http: HttpClient) {}

  private giocoSubject = new Subject<Videogioco[]>();

  giochi$ = this.giocoSubject.asObservable();

  getVideogiochi(): Observable<Videogioco[]> {
    return this.http.get<Videogioco[]>(this.apiUrl);
  }

  getVideogioco(id: string) {
    return this.http.get<Videogioco>(`${this.apiUrl}/${id}`, {});
  }

  addVideogioco(nuovoGioco: NewVideogioco) {
    return this.http.post(this.apiUrl, nuovoGioco);
  }

  deleteVideogioco(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  putVideogioco(id: string, oldData: NewVideogioco, __v: number) {
    const newData: Videogioco = {
      ...oldData,
      id: id,
      __v,
    };
    return this.http.put(`${this.apiUrl}/${id}`, newData);
  }
}
