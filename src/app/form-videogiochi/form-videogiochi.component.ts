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

  isEditMode: boolean = false;
  idModifiable: string = '';
  noModifiable = false;
  __vModifiable = 0;

  // lista delle categorie/console che servirà nel slect del template per scegliere la console giusta
  categoryList: string[] = [];

  constructor(
    private videogiochiService: VideogiocoService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  reset() {
    this.form.reset();
    this.isEditMode = false;
    this.noModifiable = false;
    this.idModifiable = '';
    this.__vModifiable = 0;
  }

  ngOnInit(): void {
    this.categoriaService.getCategorie().subscribe((list) => {
      this.categoryList = list.map((obj) => obj.name as string);
    });

    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id !== undefined) {
        //console.log('id check passed');
        this.isEditMode = true;
        this.idModifiable = id;
        this.videogiochiService.getVideogioco(id).subscribe({
          next: (gameData) => {
            const datoGioco = gameData;
            this.__vModifiable = datoGioco.__v;
            this.form = new FormGroup({
              title: new FormControl(datoGioco.title, [Validators.required]),
              category: new FormControl(datoGioco.category, [
                Validators.required,
              ]),
              releaseDate: new FormControl(datoGioco.releaseDate, [
                Validators.required,
              ]),
              genre: new FormControl(datoGioco.genre, [Validators.required]),
              softwareHouse: new FormControl(datoGioco.softwareHouse, [
                Validators.required,
              ]),
              publisher: new FormControl(datoGioco.publisher, [
                Validators.required,
              ]),
              numberOfPlayers: new FormControl(datoGioco.numberOfPlayers, [
                Validators.required,
              ]),
              languages: new FormGroup({
                voice: new FormArray(
                  datoGioco.languages.voice.map(
                    (l) =>
                      new FormControl(l, [
                        Validators.required,
                        Validators.maxLength(3),
                      ])
                  )
                ),

                text: new FormArray(
                  datoGioco.languages.text.map(
                    (t) =>
                      new FormControl(t, [
                        Validators.required,
                        Validators.maxLength(3),
                      ])
                  )
                ),
              }),
              coverImage: new FormControl(datoGioco.coverImage, [
                Validators.required,
              ]),
            });
          },
          error: (error) => {
            console.log(error);
            this.noModifiable = true;
          },
        });
      }
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

    if (this.isEditMode) {
      console.log('AGGIORNAMENTO RECORD');
      const modGioco = this.form.getRawValue();

      this.videogiochiService
        .putVideogioco(this.idModifiable, modGioco, this.__vModifiable)
        .subscribe(() => {
          this.reset();
          this.router.navigateByUrl('lista/games');
          alert('record aggiornato');
        });
    } else {
      console.log('AGGIUNTA RECORD');

      const newG: NewVideogioco = this.form.getRawValue();

      this.videogiochiService.addVideogioco(newG).subscribe(() => {
        this.reset();
        this.router.navigateByUrl('/lista/games');
        alert('nuovo record aggiunto');
      });
    }
  }
}
