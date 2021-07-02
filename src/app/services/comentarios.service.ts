import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {comentario} from '../interfaces/comentario'

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private path='http://rotten-tomatoes-server.herokuapp.com';

  constructor(private http:HttpClient) { }

  getComentario(pelicula:string){
    return this.http.get(`${this.path}/peliculas/comments/${pelicula}`)
  }

  insertComentario(pelicula:string, body:comentario){
    return this.http.post(`${this.path}/peliculas/comments/${pelicula}`,body)
  }
}
