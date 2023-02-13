import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { News } from '../model/news';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-lista-news',
  templateUrl: './lista-news.component.html',
  styleUrls: ['./lista-news.component.css'],
})
export class ListaNewsComponent implements OnInit {
  news!: News[];
  news$!: Observable<News[]>;
  newsSubscription!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.news$ = this.newsService.getNews();
  }

  onClickDelete(id: string) {
    this.newsService.deleteNews(id).subscribe(() => {
      this.news$ = this.newsService.getNews();
      alert('Elemento eliminato');
    });
  }
}
