import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../model/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://project-works-rest-api.onrender.com/api/v1/GROUP-I/news'

  constructor(private http: HttpClient) {}

  getNews() {
    return this.http.get<News[]>(this.apiUrl)
  }
  
  postNews(newNews: Omit<News, 'id'>) {
    return this.http.post(this.apiUrl, newNews)
  }

  //manca il metodo put 

  deleteNews(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
