import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioCompleto } from '../../interfaces/usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  constructor(private servicio:UsuarioService) { }

  getUsuario(){
    this.servicio.getUsuario("josejimenez@gmail.com")
    .subscribe((data)=>{
      console.log(data)
    })
  }

  updateUsuario(){
    const usuario:UsuarioCompleto={
      alias:'Revilla2202',
      correo:'josejimenez@gmail.com',
      contrasenia:'samuel0403',
      descripcion:'Alguien probando un app movil'
    };
    this.servicio.updateUsuario('josejimenez@gmail.com',usuario)
    .subscribe((datos)=>{
      console.log(datos)
    })
  }

  deleteUsuario(){
    this.servicio.deleteUsuario("josejr@gmail.com")
    .subscribe((datos)=>{
      console.log(datos)
    })
  }

  ngOnInit() {
  }

}
