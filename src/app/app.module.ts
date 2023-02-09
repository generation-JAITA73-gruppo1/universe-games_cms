import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { InserimentoComponent } from './pages/inserimento/inserimento.component';
import { SharedModule } from './shared/shared.module';
import { FormCategorieComponent } from './form-categorie/form-categorie.component';
import { ListaCategorieComponent } from './lista-categorie/lista-categorie.component';
import { FormVideogiochiComponent } from './form-videogiochi/form-videogiochi.component';
import { ListaVideogiochiComponent } from './lista-videogiochi/lista-videogiochi.component';
import { FormNewsComponent } from './form-news/form-news.component';
import { ListaNewsComponent } from './lista-news/lista-news.component';
import { ListaRecensioniComponent } from './lista-recensioni/lista-recensioni.component';
import { FormRecensioniComponent } from './form-recensioni/form-recensioni.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    InserimentoComponent,
    FormCategorieComponent,
    ListaCategorieComponent,
    FormVideogiochiComponent,
    ListaVideogiochiComponent,
    FormNewsComponent,
    ListaNewsComponent,
    ListaRecensioniComponent,
    FormRecensioniComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, SharedModule],
})
export class AppModule {}
