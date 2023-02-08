import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { InserimentoComponent } from './pages/inserimento/inserimento.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomepageComponent, InserimentoComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, SharedModule],
})
export class AppModule {}
