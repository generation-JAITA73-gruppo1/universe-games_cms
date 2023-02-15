import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  recensioniSlice!: Recensione[];
  recensioni$!: Observable<Recensione[]>;
  recensioniSubscription!: Subscription;

  constructor(private recensioneService: RecensioneService) {}

  ngOnInit(): void {
    this.recensioneService.getRecensioni().subscribe((list) => {
      this.recensioni = list;
      this.recensioniSlice = this.recensioni.slice(
        this.startIndex,
        this.endIndex
      );
    });
  }
  onClickDelete(id: string) {
    this.recensioneService.deleteRecensione(id).subscribe(() => {
      this.recensioneService.getRecensioni().subscribe((list) => {
        this.recensioni = list;
        this.recensioniSlice = this.recensioni.slice(
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
    this.recensioniSlice = this.recensioni.slice(
      this.startIndex,
      this.endIndex
    );
  }
}
