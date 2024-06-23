import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
      const { email, newPass, repPass } = this.resetPasswordForm.value;

      if (newPass !== repPass) {
        Swal.fire({
          title: 'Error',
          text: 'Las contraseñas no coinciden.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      this.http.post(environment.apiUrl + '/usuarios/reset-password', {
        email: email,
        newPass: newPass
      }).subscribe(
        (response) => {
          Swal.fire({
            title: 'Contraseña Restablecida',
            text: 'Su contraseña ha sido restablecida exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/inicio']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al restablecer su contraseña. Por favor, inténtelo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    } else {
      this.showFormErrors();
    }
  }

  showFormErrors(): void {
    if (this.resetPasswordForm.get('email')?.invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese un correo electrónico válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (this.resetPasswordForm.get('newPass')?.invalid || this.resetPasswordForm.get('repPass')?.invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese una contraseña válida y asegúrese de que ambas contraseñas coincidan.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
