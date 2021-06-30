import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioCompleto } from '../../interfaces/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private servicio:UsuarioService) { }

  
  registro(){
    const usuario:UsuarioCompleto={
      alias:'Jimenez202',
      correo:'josejimenez@gmail.com',
      contrasenia:'samuel0403',
      descripcion:'aaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    };
    this.servicio.registro(usuario)
    .subscribe((data)=>{
      console.log(data)
    })
  }
  
  ngOnInit() {
  }

}
