import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private path='http://rotten-tomatoes-server.herokuapp.com';
  constructor(private http:HttpClient) { }

  getMovie(cadena:string,cuerpo){
    return this.http.get(`${this.path}/peliculas/search/${cadena}`,cuerpo)
  }

  getDetailsMovie(titulo:string){
    return this.http.get(`${this.path}/peliculas/movie/${titulo}`)
  }

  searchGener(cadena:string){
    return this.http.get(`${this.path}/peliculas/search/gener/${cadena}`)
  }

}