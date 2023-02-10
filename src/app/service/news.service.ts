import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewNews, News } from '../model/news';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://project-works-rest-api.onrender.com/api/v1/GROUP-I/news'

  constructor(private http: HttpClient) {}

  private newsSubject = new Subject<News[]>();

  news$ = this.newsSubject.asObservable();

  getNews() {
    return this.http.get<News[]>(this.apiUrl)
  }
  
  postNews(newNews: Omit<News, 'id'>) {
    return this.http.post(this.apiUrl, newNews)
  }

  // putNews(id: string, oldData: NewNews) {
  //   const newData: News = {
  //       id,
  //       ...oldData
  //   }
  //   return this.http.put(`${this.apiUrl}/${id}`, newData);
  // }

  deleteNews(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
