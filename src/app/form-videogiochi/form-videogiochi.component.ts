import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewVideogioco } from '../model/videogioco';
import { CategoriaService } from '../service/categoria.service';
import { VideogiocoService } from '../service/videogioco.service';

@Component({
  selector: 'app-form-videogiochi',
  templateUrl: './form-videogiochi.component.html',
  styleUrls: ['./form-videogiochi.component.css'],
})
export class FormVideogiochiComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    releaseDate: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    softwareHouse: new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
    numberOfPlayers: new FormControl('', [Validators.required]),
    languages: new FormGroup({
      voice: new FormArray([
        new FormControl('', [Validators.required, Validators.maxLength(3)]),
      ]),
      text: new FormArray([
        new FormControl('', [Validators.required, Validators.maxLength(3)]),
      ]),
    }),
    coverImage: new FormControl('', [Validators.required]),
  });

  categoryList: string[] = [];

  constructor(
    private videogiochiService: VideogiocoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaService.getCategorie().subscribe((list) => {
      this.categoryList = list.map((obj) => obj.name as string);
    });
  }

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
      alert('Compila tutti i campi in modo corretto.');
      return;
    }

    const newG: NewVideogioco = this.form.getRawValue();

    this.videogiochiService.addVideogioco(newG).subscribe(() => {
      console.log('success');
      this.router.navigateByUrl('/lista/games');
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
