import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { categoriaService } from '../service/categoria.service';
import { RecensioneService } from '../service/recensione.service';

@Component({
  selector: 'app-form-recensioni',
  templateUrl: './form-recensioni.component.html',
  styleUrls: ['./form-recensioni.component.css']
})
export class FormRecensioniComponent {

  dati$!: Observable<categoriaService[]>;
  form: FormGroup = new FormGroup ({
    title : new FormControl(''),
    publicationDate : new FormControl(''),
    content : new FormControl(''),
    score : new FormControl(0),
    reviewerName : new FormControl(''),
    imageUrls : new FormArray ([
      new FormControl('')
    ]),
    reviewedGame : new FormGroup ({
      id : new FormControl(''),
      name : new FormControl('')
    })
  });
  constructor(private recensioneService: RecensioneService,
    private route : ActivatedRoute,
    private router : Router
    ) {}
    
    onSubmit() {
      this.recensioneService
        .addRecensione(this.form.getRawValue())
        .subscribe(() => {
          this.router.navigateByUrl('/lista/games');
        });
    }
    
    get imageFormArray() {
      return this.form.get('imageUrls') as FormArray
    }

    onClickAddTags() {
      this.imageFormArray.push(new FormControl('', [Validators.required]))
    }

    onRemoveTags(index: number ): void {
      this.imageFormArray.removeAt(index)
    }
}
