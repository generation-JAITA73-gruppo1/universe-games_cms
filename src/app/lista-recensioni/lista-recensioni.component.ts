import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Recensione } from '../model/recensione';
import { RecensioneService } from '../service/recensione.service';

@Component({
  selector: 'app-lista-recensioni',
  templateUrl: './lista-recensioni.component.html',
  styleUrls: ['./lista-recensioni.component.css'],
})
export class ListaRecensioniComponent implements OnInit {
  recensioni!: Recensione[];
  recensioni$!: Observable<Recensione[]>;
  recensioniSubscription!: Subscription;

  constructor(private recensioneService: RecensioneService) {}

  ngOnInit(): void {
    this.recensioni$ = this.recensioneService.getRecensioni();
  }
  onClickDelete(id: string) {
    this.recensioneService.deleteRecensione(id).subscribe(() => {
      this.recensioni$ = this.recensioneService.getRecensioni();
      alert('Elemento eliminato');
    });
  }
}
