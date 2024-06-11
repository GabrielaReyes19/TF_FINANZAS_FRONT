import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPass: ['', [Validators.required, Validators.minLength(1)]],
      repPass: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit() {

    if (this.resetPasswordForm.valid) {
      console.log('hola');
      const { email, newPass, repPass } = this.resetPasswordForm.value;

      // Verificar que las contraseñas coincidan
      if (newPass !== repPass) {
        console.log('Las contraseñas no coinciden');
        return;
      }

      // Realizar la solicitud HTTP POST al servidor
      this.http.post(environment.apiUrl+'/usuarios/reset-password', {
        email: email,
        newPass: newPass
      }).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          // Manejar la respuesta del servidor aquí
          this.router.navigate(['/inicio']);
        },
        (error) => {
          console.error('Error al enviar la solicitud:', error);
          // Manejar el error aquí
        }
      );
    }
  }
}
