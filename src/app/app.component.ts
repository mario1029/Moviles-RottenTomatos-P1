import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Peliculas', url: '/movies', icon: 'film' },
    { title: 'Inicio Sesion', url: '/login', icon: 'person' },
    { title: 'Registro', url: '/register', icon: 'cloud-upload-outline' },
    { title: 'Perfil', url: '/profile', icon: 'person-circle-outline' },
  ];
  private isLogged;
  constructor() {}

  ngOnInit() {
    this.logged();
  }

  logged() {
    if (localStorage.getItem('correo') != '') {
      this.isLogged = true;
      this.appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        { title: 'Peliculas', url: '/movies', icon: 'film' },
        { title: 'Perfil', url: '/profile', icon: 'person-circle-outline' },
      ];
    } else {
      this.isLogged = false;
      this.appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        { title: 'Peliculas', url: '/movies', icon: 'film' },
        { title: 'Inicio Sesion', url: '/login', icon: 'person' },
        { title: 'Registro', url: '/register', icon: 'cloud-upload-outline' },
      ];
    }
  }
}
