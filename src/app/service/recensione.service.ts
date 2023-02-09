import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recensione } from '../model/recensione';

@Injectable({
  providedIn: 'root',
})
export class RecensioneService {
  private apiUrl =
    'https://project-works-rest-api.onrender.com/api/v1/GROUP-I/review';

  constructor(private http: HttpClient) {}

  getRecensioni(): Observable<Recensione[]> {
    return this.http.get<Recensione[]>(this.apiUrl);
  }
}
