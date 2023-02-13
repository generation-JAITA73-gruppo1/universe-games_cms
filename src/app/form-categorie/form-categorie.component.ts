import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-form-categorie',
  templateUrl: './form-categorie.component.html',
  styleUrls: ['./form-categorie.component.css'],
})
export class FormCategorieComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
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
    this.service.addCategorie(this.form.getRawValue()).subscribe(() => {
      alert('Nuova categoria aggiunta');
      this.form.reset(), this.router.navigateByUrl('/lista/categories');
    });
  }
}
