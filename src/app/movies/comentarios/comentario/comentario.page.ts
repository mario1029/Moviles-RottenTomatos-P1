import { Component, OnInit } from '@angular/core';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { comentario } from '../../../interfaces/comentario';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss'],
})
export class ComentarioPage implements OnInit {

  critica: string;
  calificacion: number;

  constructor(private servicio:ComentariosService,private parametro:ActivatedRoute ) { }

  ngOnInit() {
  }

  insertComentario(){
    console.log(localStorage.getItem('correo'))
    const comentario:comentario={
      usuario:localStorage.getItem('correo'),
      contenido:this.critica,
      puntuacion:this.calificacion,
      fecha:Date()
    }
    console.log(comentario)
    this.servicio.insertComentario(this.parametro.snapshot.paramMap.get('id'),comentario)
    .subscribe((data:any)=>{
      if(data.status=200){
        alert("Critica finalizada");
      }else{
        console.log(data.error)
      }
    })
  }
}
