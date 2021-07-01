import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario, UsuarioCompleto } from '../../interfaces/usuario';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private servicio: UsuarioService) {}

  private user: Usuario;

  getUsuario() {
    if (localStorage.getItem('correo') !== null && localStorage.getItem('correo') !== '') {
      const correo = localStorage.getItem('correo');
      console.log('Perfil:' + correo);
      this.servicio.getUsuario(correo).subscribe((data: any) => {
        console.log(data);
        this.user = {
          alias: data.alias,
          correo: data.nombre,
          descripcion: data.descripcion,
        };
      });
    } else {
      this.user = null;
    }
  }

  logout() {
    localStorage.setItem('correo', '');
    console.log('Perfil Cerrado:' + localStorage.getItem('correo'));
  }
  updateUsuario() {
    const usuario: UsuarioCompleto = {
      alias: 'Revilla2202',
      correo: 'josejimenez@gmail.com',
      contrasenia: 'samuel0403',
      descripcion: 'Alguien probando un app movil',
    };
    this.servicio.updateUsuario('josejimenez@gmail.com', usuario).subscribe((datos) => {
      console.log(datos);
    });
  }

  deleteUsuario() {
    this.servicio.deleteUsuario('josejr@gmail.com').subscribe((datos) => {
      console.log(datos);
    });
  }

  ngOnInit() {
    this.user = {
      alias: '',
      correo: '',
      descripcion: '',
    };

    this.getUsuario();
  }
}
