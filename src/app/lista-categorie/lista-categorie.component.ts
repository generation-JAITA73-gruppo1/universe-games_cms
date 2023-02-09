import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-lista-categorie',
  templateUrl: './lista-categorie.component.html',
  styleUrls: ['./lista-categorie.component.css']
})
export class ListaCategorieComponent implements OnInit{
  categoria!: Categoria[];
  categoria$!: Observable<Categoria[]>;
  categorieSubscription!: Subscription;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoria$ = this.categoriaService.getCategorie();
  }
}
