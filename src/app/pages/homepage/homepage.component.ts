import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectParams } from 'src/app/model/selection';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  showHomePage: boolean = true;
  showListaGames: boolean = false;
  showListaCategories: boolean = false;
  showListaNews: boolean = false;
  showListaReviews: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const listaSelect: SelectParams = params['cat_name'];

      switch (listaSelect) {
        case 'games':
          this.showHomePage = false;
          this.showListaGames = true;
          this.showListaCategories = false;
          this.showListaReviews = false;
          this.showListaNews = false;
          break;
        case 'categories':
          this.showHomePage = false;
          this.showListaGames = false;
          this.showListaCategories = true;
          this.showListaReviews = false;
          this.showListaNews = false;
          break;
        case 'reviews':
          this.showHomePage = false;
          this.showListaGames = false;
          this.showListaCategories = false;
          this.showListaReviews = true;
          this.showListaNews = false;
          break;
        case 'news':
          this.showHomePage = false;
          this.showListaGames = false;
          this.showListaReviews = false;
          this.showListaCategories = false;
          this.showListaNews = true;
          break;
        default:
          this.showHomePage = true;
          this.showListaGames = false;
          this.showListaCategories = false;
          this.showListaReviews = false;
          this.showListaNews = false;
      }
    });
  }

  ngOnDestroy() {
    this.showHomePage = true;
    this.showListaGames = false;
    this.showListaCategories = false;
    this.showListaReviews = false;
    this.showListaNews = false;
  }
}
