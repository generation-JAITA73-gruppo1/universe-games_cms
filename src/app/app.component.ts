import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recensione } from './model/recensione';
import { RecensioneService } from './service/recensione.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'universe-games_csm';
  lista$!: Observable<Recensione[]>;

  constructor(private service: RecensioneService) {}

  ngOnInit(): void {
    this.lista$ = this.service.getRecensioni();
  }
}
