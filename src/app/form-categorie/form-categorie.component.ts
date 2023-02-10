import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private service: CategoriaService, private router: Router) {}
  onSubmit() {
    this.service.addCategorie(this.form.getRawValue()).subscribe(() => {
      alert('Nuova categoria aggiunta');
      this.form.reset(), this.router.navigateByUrl('/lista/categories');
    });
  }
}
