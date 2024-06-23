import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulario válido', this.loginForm.value);
      
      // Enviar solicitud HTTP POST
      this.http.post(environment.apiUrl + '/usuarios/login', {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);
          // Guardar la data en localStorage
          localStorage.setItem('userData', JSON.stringify(response));
          // Redirigir a la página de inicio
          this.router.navigate(['/bienvenida']);
        },
        (error) => {
          console.error('Error al enviar la solicitud:', error);
          // Manejar el error aquí
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}