import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioCompleto } from '../../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private servicio: UsuarioService) {}

  private correo: string;
  private contrasenia: string;
  loginUsuario(email, pass) {
    this.correo = email.value;
    this.contrasenia = pass.value;

    const usuario: UsuarioCompleto = {
      correo: this.correo,
      contrasenia: this.contrasenia,
    };
    console.log(usuario);
    this.servicio.login(usuario).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {}
}
