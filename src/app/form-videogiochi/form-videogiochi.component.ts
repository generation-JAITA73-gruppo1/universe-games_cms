import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewVideogioco } from '../model/videogioco';
import { VideogiocoService } from '../service/videogioco.service';

@Component({
  selector: 'app-form-videogiochi',
  templateUrl: './form-videogiochi.component.html',
  styleUrls: ['./form-videogiochi.component.css'],
})
export class FormVideogiochiComponent {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    releaseDate: new FormControl(),
    genre: new FormControl(''),
    softwareHouse: new FormControl(''),
    publisher: new FormControl(''),
    numberOfPlayers: new FormControl(0),
    languages: new FormGroup({
      voice: new FormArray([new FormControl('')]),
      text: new FormArray([new FormControl('')]),
    }),
  });

  constructor(
    private videogiochiService: VideogiocoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  //   onRemoveAbilita(index: number): void {
  //     this.abilitaFormArray.removeAt(index);
  //   }

  get voiceFormArray() {
    return this.form.get('languages.voice') as FormArray;
  }

  onClickAddVoice() {
    this.voiceFormArray.push(new FormControl());
  }

  onClickRemoveVoice(index: number) {
    this.voiceFormArray.removeAt(index);
  }

  get textFormArray() {
    return this.form.get('languages.text') as FormArray;
  }

  onClickAddText() {
    this.textFormArray.push(new FormControl());
  }

  onClickRemoveText(index: number) {
    this.textFormArray.removeAt(index);
  }

  onSubmit() {
    if (
      this.form.get('languages.voice')?.hasError('maxlength') ||
      this.form.get('languages.text')?.hasError('maxlength')
    ) {
      alert('Inserisci le lingue in codici da 3 lettere');
      return;
    }
    if (this.form.invalid) {
      alert('Compila tutti i campi.');
      return;
    }

    const newG: NewVideogioco = this.form.getRawValue();

    this.videogiochiService.addVideogioco(newG).subscribe(() => {
      console.log('success');
      //   error: (error: any) => {
      //     console.log(error);
      //   };
    });
  }

  //   newGame: NewVideogioco = {
  //     title: 'Fire Emblem Engage',
  //     category: 'Nintendo Switch',
  //     releaseDate: new Date('2023-01-20'),
  //     genre: 'Tactical RPG',
  //     softwareHouse: 'TK',
  //     publisher: 'Nintendo',
  //     numberOfPlayers: 1,
  //     languages: {
  //       voice: ['eng', 'jap', 'ch'],
  //       text: ['eng', 'fr', 'de', 'sp', 'ita', 'jap'],
  //     },
  //     coverImage:
  //       'https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/2x1_NSwitch_FireEmblemEngage_EU.jpg',
  //   };
}
