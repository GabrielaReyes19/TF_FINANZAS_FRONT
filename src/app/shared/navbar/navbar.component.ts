import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  logout(): void {
    localStorage.removeItem('userData'); // Elimina los datos de usuario del almacenamiento local
    localStorage.removeItem('intro_tutorial_shown'); // Elimina el indicador del tutorial mostrado
    localStorage.removeItem('intro_tutorial_bienvenida_shown');
    this.router.navigate(['/inicio']); // Redirige a la página de inicio de sesión
  }

  private checkLoginStatus(): void {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      this.router.navigate(['/inicio']); // Redirige a la página de inicio de sesión si no está logueado
    }
  }
}
