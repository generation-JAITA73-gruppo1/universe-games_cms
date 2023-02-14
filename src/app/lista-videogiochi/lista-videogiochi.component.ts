import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { Videogioco } from '../model/videogioco';
import { VideogiocoService } from '../service/videogioco.service';

@Component({
  selector: 'app-lista-videogiochi',
  templateUrl: './lista-videogiochi.component.html',
  styleUrls: ['./lista-videogiochi.component.css'],
})
export class ListaVideogiochiComponent implements OnInit {
  videogiochi!: Videogioco[];
  videogiochiSlice!: Videogioco[];
  videogiochi$!: Observable<Videogioco[]>;
  videogiochiSubscription!: Subscription;

  constructor(private videogiocoService: VideogiocoService) {}

  ngOnInit(): void {
    this.videogiocoService.getVideogiochi().subscribe((list) => {
      this.videogiochi = list;
      this.videogiochiSlice = this.videogiochi.slice(0, 5);
    });
  }

  onClickDelete(id: string) {
    this.videogiocoService.deleteVideogioco(id).subscribe(() => {
      this.videogiocoService.getVideogiochi().subscribe((list) => {
        this.videogiochi = list;
        this.videogiochiSlice = this.videogiochi.slice(0, 5);
      });
      alert('Elemento eliminato');
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > event.length) {
      endIndex = event.length;
    }
    this.videogiochiSlice = this.videogiochi.slice(startIndex, endIndex);
  }
}
