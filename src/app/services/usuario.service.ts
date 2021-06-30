import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {Usuario,UsuarioCompleto} from '../interfaces/usuario'

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private path='https://rotten-tomatoes-server.herokuapp.com';
  constructor( private http:HttpClient) { }

  login(usuario:Usuario){
    return this.http.post(`${this.path}/session/user`,usuario)
  }

  registro(usuario:UsuarioCompleto){
    return this.http.post(`${this.path}/session/signup`,usuario);
  }

  getUsuario(correo:string){
    return this.http.get(`${this.path}/users/${correo}`);
  }

  updateUsuario(correo:string, usuario:Usuario){
    return this.http.put(`${this.path}/users/${correo}`,usuario);
  }

  deleteUsuario(correo:string){
    return this.http.delete(`${this.path}/users/${correo}`);
  }

  logout(){
    return this.http.get(`${this.path}/users/logout`);
  }

}
