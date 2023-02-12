import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { VideogiocoSkimmed } from '../model/videogioco';
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

  //  ListaGiochi mi serve a immagazzinare la lista di tutti i giochi registrati nel server,
  //  i cui valori vengono salvati in maniera ridotta (aka contenedo solo id).
  // Questi poi mi servono per fare il select che associa un gioco ad ogni recensione (legato al FormControl "reviewedGame")
  listaGiochiSkimmed: Array<VideogiocoSkimmed> = [];

  // reviewedGAmeIdChange. Questa variabile controlla la sottoscrizione al cambiamento del valore inserito nel form.
  //   Si chiude da sola una volta distrutto il componente
  reviewedGameIdChangeSubscription?: Subscription;

  constructor(
    private recensioneService: RecensioneService,
    private videogiocoService: VideogiocoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit() {
    this.recensioneService
      .addRecensione(this.form.getRawValue())
      .subscribe(() => {
        this.router.navigateByUrl('/lista/reviews');
      });
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
    // Questa sottoscrizione mi permette di recuperare i dati dei giochi in forma ridotta, grazie al pipe contenuto in vidoegiochi service
    this.videogiocoService.getVideogiochi().subscribe((gamesData) => {
      this.listaGiochiSkimmed = gamesData.map((a) => ({
        _id: a._id,
        title: a.title,
      }));
      console.log(this.listaGiochiSkimmed);
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
