import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { NewRecensione } from '../model/recensione';
import { VideogiocoSkimmed } from '../model/videogioco';
import { CategoriaService } from '../service/categoria.service';
import { RecensioneService } from '../service/recensione.service';
import { VideogiocoService } from '../service/videogioco.service';

@Component({
  selector: 'app-form-recensioni',
  templateUrl: './form-recensioni.component.html',
  styleUrls: ['./form-recensioni.component.css'],
})
export class FormRecensioniComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    publicationDate: new FormControl(''),
    content: new FormControl(''),
    score: new FormControl(0),
    reviewerName: new FormControl(''),
    imageUrls: new FormArray([new FormControl('')]),
    reviewedGame: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
  });

  isEditMode: boolean = false;
  idModifiable: string = '';
  noModifiable = false;
  __vModifiable = 0;

  //  ListaGiochi mi serve a immagazzinare la lista di tutti i giochi registrati nel server,
  //  i cui valori vengono salvati in maniera ridotta (aka contenedo solo id).
  // Questi poi mi servono per fare il select che associa un gioco ad ogni recensione (legato al FormControl "reviewedGame")
  listaGiochiSkimmed: Array<VideogiocoSkimmed> = [];

  // reviewedGAmeIdChange. Questa variabile controlla la sottoscrizione al cambiamento del valore inserito nel form.
  //   Si chiude da sola una volta distrutto il componente
  reviewedGameIdChangeSubscription?: Subscription;

  constructor(
    private recensioneService: RecensioneService,
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

  categoryList: string[] = [];

  onSubmit() {
    if (this.form.invalid) {
      alert('Compila tutti i campi in modo corretto.');
      return;
    }
    if (this.isEditMode) {
      console.log('AGGIORNAMENTO RECORD');
      const modGioco = this.form.getRawValue();

      this.recensioneService
        .putRecensione(this.idModifiable, modGioco, this.__vModifiable)
        .subscribe(() => {
          this.reset();
          this.router.navigateByUrl('lista/reviews');
          alert('record aggiornato');
        });
    } else {
      console.log('AGGIUNTA RECORD')
    
    this.recensioneService
      .addRecensione(this.form.getRawValue())
      .subscribe(() => {
        this.router.navigateByUrl('/lista/reviews');
      });
    }
  }

  get imageFormArray() {
    return this.form.get('imageUrls') as FormArray;
  }

  onClickAddTags() {
    this.imageFormArray.push(new FormControl('', [Validators.required]));
  }

  onRemoveTags(index: number): void {
    this.imageFormArray.removeAt(index);
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
        this.recensioneService.getRecensione(id).subscribe({
          next: (reviewData) => {
            const datoRecensione = reviewData;
            this.__vModifiable = datoRecensione.__v;
            this.form = new FormGroup({
              title: new FormControl(datoRecensione.title, [Validators.required]),
              publicationDate: new FormControl(datoRecensione.publicationDate, [
                Validators.required,
              ]),
              content: new FormControl(datoRecensione.content, [
                Validators.required,
              ]),
              score: new FormControl(datoRecensione.score, [
                Validators.required,
              ]),
              reviewerName: new FormControl(datoRecensione.reviewerName, [
                Validators.required,
              ]),
              imageUrls: new FormArray(
                  datoRecensione.imageUrls.map(
                    (t) =>
                      new FormControl(t, [Validators.required])
                  )
                ),
              reviewedGame: new FormGroup({
                id: new FormControl(datoRecensione.reviewedGame.id, [
                  Validators.required,
                ]),
                name: new FormControl(datoRecensione.reviewedGame.name, [
                  Validators.required,
                ]),
              })
            });
          },
          error: (error) => {
            console.log(error);
            this.noModifiable = true;
          },
        });
      }
    });

    // Qui sto facendo una subscribe che mi avvisa ogni volta che l'id del reviewdGame selezionato cambia
    // in questo modo posso cercare nella lista di giochi un gioco con quell'id e associarne il nome al form control reviewedGame
    this.reviewedGameIdChangeSubscription = this.form
      .get('reviewedGame.id')
      ?.valueChanges.subscribe((gameID) => {
        const reviewedGameName = this.listaGiochiSkimmed.find(
          (obj) => obj._id === gameID
        )!.title;
        this.form.get('reviewedGame.name')?.setValue(reviewedGameName);
        console.log(reviewedGameName);
      });
  }

  ngOnDestroy(): void {
    //Per stare sicuri, chiudo la subscription alla modifica del form control alla distruzione del componente
    this.reviewedGameIdChangeSubscription?.unsubscribe();
  }
}
