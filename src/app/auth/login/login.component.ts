import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
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
      this.http.post(environment.apiUrl + '/usuarios/login', {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Login Exitoso',
            text: '¡Bienvenido de nuevo!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            localStorage.setItem('userData', JSON.stringify(response));
            this.router.navigate(['/bienvenida']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Correo o contraseña incorrectos. Por favor, inténtelo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } else {
      // Mostrar mensajes de error específicos
      this.showFormErrors();
    }
  }

  showFormErrors(): void {
    if (this.email?.invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese un correo electrónico válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (this.password?.invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese una contraseña válida.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
