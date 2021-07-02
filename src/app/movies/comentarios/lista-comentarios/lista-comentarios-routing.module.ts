import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComentariosPage } from './lista-comentarios.page';

const routes: Routes = [
  {
    path: '',
    component: ListaComentariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaComentariosPageRoutingModule {}
