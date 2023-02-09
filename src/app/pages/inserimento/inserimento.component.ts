import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectParams } from 'src/app/model/selection';

@Component({
  selector: 'app-inserimento',
  templateUrl: './inserimento.component.html',
  styleUrls: ['./inserimento.component.css'],
})
export class InserimentoComponent implements OnInit, OnDestroy {
  showFormGames: boolean = false;
  showFormCategories: boolean = false;
  showFormNews: boolean = false;
  showFormReviews: boolean = false;

  //fa vedere un messaggio di errore se per caso non c'è nessuna categoria selezionata
  showErrorMessage: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const formSelect: SelectParams = params['cat_name'];

      switch (formSelect) {
        case 'games':
          this.showFormGames = true;
          this.showFormCategories = false;
          this.showFormReviews = false;
          this.showFormNews = false;
          break;
        case 'categories':
          this.showFormGames = false;
          this.showFormCategories = true;
          this.showFormReviews = false;
          this.showFormNews = false;
          break;
        case 'reviews':
          this.showFormGames = false;
          this.showFormCategories = false;
          this.showFormReviews = true;
          this.showFormNews = false;
          break;
        case 'news':
          this.showFormGames = false;
          this.showFormReviews = false;
          this.showFormCategories = false;
          this.showFormNews = true;
          break;
        default:
          this.showErrorMessage = true;
          this.showFormCategories = false;
          this.showFormReviews = false;
          this.showFormNews = false;
      }
    });
  }

  ngOnDestroy() {
    this.showErrorMessage = true;
    this.showFormGames = false;
    this.showFormCategories = false;
    this.showFormReviews = false;
    this.showFormNews = false;
  }
}
