import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesPage } from './movies.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesPage
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'lista-comentarios/:id',
    loadChildren: () => import('./comentarios/lista-comentarios/lista-comentarios.module').then( m => m.ListaComentariosPageModule)
  },
  {
    path: 'comentario/:id',
    loadChildren: () => import('./comentarios/comentario/comentario.module').then( m => m.ComentarioPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesPageRoutingModule {}
