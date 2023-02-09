import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Videogioco } from './model/videogioco';
import { videogiocoService } from './service/videogioco.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //implements OnInit
  title = 'universe-games_csm';
  /*
  videogiochi!: Videogioco[];
  videogiochi$!: Observable<Videogioco[]>;
  videogiochiSubscription!: Subscription;

  constructor(private videogiocoService: videogiocoService) {}

  ngOnInit(): void {
    this.videogiochi$ = this.videogiocoService.getVideogiochi();
  }
  */
}
