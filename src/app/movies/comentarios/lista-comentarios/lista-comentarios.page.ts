import { Component, OnInit } from '@angular/core';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { comentario } from '../../../interfaces/comentario';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-lista-comentarios',
  templateUrl: './lista-comentarios.page.html',
  styleUrls: ['./lista-comentarios.page.scss'],
})
export class ListaComentariosPage implements OnInit {

  imagen: string="assets/resources/tomate_mayor_5.png";  
  imagen2: string="assets/resources/tomate_menor_5.png";
  comentarios: comentario[]=[];

  constructor(private servicio:ComentariosService, private parametro:ActivatedRoute) { }

  ngOnInit() {
    this.getComent();
  }

  getComent(){
    const titulo:string=this.parametro.snapshot.paramMap.get('id');
    let datos;
    this.servicio.getComentario(titulo)
    .subscribe((data)=>{
      datos=data;
      if(datos.status==200){
        this.comentarios=datos.peliculas;
      }
      console.log(datos)
    })
  }

}
