import { Component, OnInit } from '@angular/core';
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
  videogiochi$!: Observable<Videogioco[]>;
  videogiochiSubscription!: Subscription;

  constructor(private videogiocoService: VideogiocoService) {}

  ngOnInit(): void {
    this.videogiochi$ = this.videogiocoService.getVideogiochi();
  }

  onClickDelete(id: string) {
    this.videogiocoService.deleteVideogioco(id).subscribe(() => {
      this.videogiochi$ = this.videogiocoService.getVideogiochi();
    });
  }
}
