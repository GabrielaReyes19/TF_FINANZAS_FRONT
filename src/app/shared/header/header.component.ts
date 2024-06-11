import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { 
    // Redirigir si no está logueado

  }

  ngOnInit(): void { }

  isLoggedIn(): boolean {
    return localStorage.getItem('userData') !== null;
  }

  logout(): void {
    localStorage.removeItem('userData');
    this.router.navigate(['/inicio']);
  }
}
