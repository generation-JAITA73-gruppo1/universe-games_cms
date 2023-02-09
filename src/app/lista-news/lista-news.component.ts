import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { News } from '../model/news';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-lista-news',
  templateUrl: './lista-news.component.html',
  styleUrls: ['./lista-news.component.css']
})
export class ListaNewsComponent implements OnInit{
  news!: News[];
  news$!: Observable<News[]>;
  newsSubscription!: Subscription;

  constructor(private videogiocoService: NewsService) {}

  ngOnInit(): void {
    this.news$ = this.videogiocoService.getNews();
  }
}
