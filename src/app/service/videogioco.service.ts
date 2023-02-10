import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NewVideogioco, Videogioco } from '../model/videogioco';

@Injectable({ providedIn: 'root' })
export class VideogiocoService {
  private apiUrl =
    'https://project-works-rest-api.onrender.com/api/v1/GROUP-I/videogame';

  constructor(private http: HttpClient) {}

  private giocoSubject = new Subject<Videogioco[]>();

  giochi$ = this.giocoSubject.asObservable();

  getVideogiochi(): Observable<Videogioco[]> {
    return this.http.get<Videogioco[]>(this.apiUrl);
  }

  addVideogioco(nuovoGioco: NewVideogioco) {
    return this.http.post(this.apiUrl, nuovoGioco);
  }
  
  deleteVideogioco(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
