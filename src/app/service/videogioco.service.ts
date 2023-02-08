import { Injectable } from '@angular/core';
import { Videogioco } from '../model/videogioco';

@Injectable({ providedIn: 'root' })
export class videogiocoService {
  private videogiochi!: Videogioco[];

  getVideogiochi() {
    return this.videogiochi.slice();
    console.log(this.videogiochi);
  }
}
