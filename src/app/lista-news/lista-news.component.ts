import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  newsSlice!: News[];
  news$!: Observable<News[]>;
  newsSubscription!: Subscription;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe((list) => {
      this.news = list;
      this.newsSlice = this.news.slice(
        this.startIndex,
        this.endIndex
      );
    });
  }

  onClickDelete(id: string) {
    this.newsService.deleteNews(id).subscribe(() => {
      this.newsService.getNews().subscribe((list) => {
        this.news = list;
        this.newsSlice = this.news.slice(
          this.startIndex,
          this.endIndex
        );
      });
      alert('Elemento eliminato');
    });
  }


  startIndex = 0;
  endIndex = 5;

  onPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if (this.endIndex > event.length) {
      this.endIndex = event.length;
    }
    this.newsSlice = this.news.slice(
      this.startIndex,
      this.endIndex
    );
  }
}
