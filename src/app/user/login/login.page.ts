import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioCompleto } from '../../interfaces/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private servicio:UsuarioService) { }

  loginUsuario(){
    const usuario:UsuarioCompleto={
      correo:'josejimenez@gmail.com',
      contrasenia:'samuel0403'
    };
    this.servicio.login(usuario) .subscribe((data)=>{
      console.log(data)
    })
  }

  ngOnInit() {
  }

}
