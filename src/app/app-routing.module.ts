import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { InserimentoComponent } from './pages/inserimento/inserimento.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'lista/:cat_name',
    component: HomepageComponent,
  },
  // siccome usiamo il componente di inserimento sia per videogiochi che per recensione che per etc.
  // dobbiamo trovare un modo per far capire al sito che cosa vogliamo inserire (una recensione? un videogioco? una categoria?)
  // Per farglielo capire, gli dobbiamo passare un informazione: il modo migliore per farlo è passargli il tipo di dato che
  // vogliamo modificare come parametro (indicato con i due punti) nell'url.

  // il parametro glielo diamo quando chiamiamo un routerlink. Ad esempio routerLink = "/nuovo/videogioco".
  // Il link ci rimanda al componente Inserimento, che recupererà l'informazione dal parametro "cat_name" e in base a quello mi farà comparire il tipo di forma desiderato
  {
    path: 'nuovo/:cat_name',
    component: InserimentoComponent,
  },
  {
    path: 'modifica/:cat_name/:id',
    component: InserimentoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
