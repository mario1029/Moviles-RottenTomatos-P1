import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioCompleto } from '../../interfaces/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(private servicio: UsuarioService) {}

  registro(alias, contrasenia, correo, descripcion) {
    const usuario: UsuarioCompleto = {
      alias: alias.value,
      correo: correo.value,
      contrasenia: contrasenia.value,
      descripcion: descripcion.value,
    };
    console.log(usuario);
    this.servicio.registro(usuario).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {}
}
