import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-form-categorie',
  templateUrl: './form-categorie.component.html',
  styleUrls: ['./form-categorie.component.css'],
})
export class FormCategorieComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  isEditMode: boolean = false;
  idModifiable: string = '';
  noModifiable = false;
  __vModifiable = 0;

  constructor(
    private service: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private categorieService: CategoriaService
  ) {}
  reset() {
    this.form.reset();
    this.isEditMode = false;
    this.noModifiable = false;
    this.idModifiable = '';
    this.__vModifiable = 0;
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Compila tutti i campi in modo corretto.');
      return;
    }

    if (this.isEditMode) {
      console.log('AGGIORNAMENTO RECORD');
      const modGioco = this.form.getRawValue();

      this.categorieService
        .putCategoria(this.idModifiable, modGioco, this.__vModifiable)
        .subscribe(() => {
          this.reset();
          this.router.navigateByUrl('/lista/categories');
          alert('record aggiornato');
        });
    } else {
      this.categorieService
        .addCategorie(this.form.getRawValue())
        .subscribe(() => {
          this.router.navigateByUrl('/lista/categories');
          alert('record aggiunto');
        });
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id !== undefined) {
        //console.log('id check passed');
        this.isEditMode = true;
        this.idModifiable = id;
        this.categorieService.getCategoria(id).subscribe({
          next: (categoriaData) => {
            const datoCategoria = categoriaData;
            this.__vModifiable = datoCategoria.__v;
            this.form = new FormGroup({
              name: new FormControl(datoCategoria.name, [Validators.required]),
            });
          },
        });
      }
    });
  }
}
