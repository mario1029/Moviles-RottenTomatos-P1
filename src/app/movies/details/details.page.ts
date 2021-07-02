import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { pelicula,peliculaDetallada } from '../../interfaces/pelicula';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  correo:string=localStorage.getItem('correo');
  Pelicula:peliculaDetallada;
  ID=this.parametro.snapshot.paramMap.get('id');
  imagen: string="assets/resources/tomate_mayor_5.png";
  imagen2: string="assets/resources/tomate_menor_5.png";

  constructor(private servicio:PeliculasService, private parametro:ActivatedRoute ) { }

  ngOnInit() {
    this.getDetailsMovie();
  }

  getDetailsMovie(){
    let datos;
    this.servicio.getDetailsMovie(this.ID)
    .subscribe((data)=>{
      datos=data;
      if(datos.status==200){
        this.Pelicula=datos.peliculas;
      }
      console.log(this.Pelicula)
    })
  }
}
