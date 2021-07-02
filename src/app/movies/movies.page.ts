import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { pelicula } from '../interfaces/pelicula';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  terminoBusqueda:string='';
  Peliculas:pelicula[]=[];
  constructor(private servicio:PeliculasService) { }

  ngOnInit() {
  }

  getMovie(){
    const cuerpo={
      anio:2019,
      page:2
    }
    const titulo:string=this.terminoBusqueda;
    let datos;
    this.servicio.getMovie(titulo,cuerpo)
    .subscribe(data=>{
      datos=data;
      if(datos.status==200){
        this.Peliculas=datos.peliculas;
      }
      console.log(this.Peliculas)
    })
  }

  searchGener(){
    const genero:string='Action';
    this.servicio.searchGener(genero)
    .subscribe((data)=>{
      console.log(data)
    })
  }
}
