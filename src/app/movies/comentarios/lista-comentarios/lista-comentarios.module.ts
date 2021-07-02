import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaComentariosPageRoutingModule } from './lista-comentarios-routing.module';

import { ListaComentariosPage } from './lista-comentarios.page';

import { HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaComentariosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ListaComentariosPage]
})
export class ListaComentariosPageModule {}
