import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      empresa: ['', Validators.required],
      ruc: ['', Validators.required],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      if (this.registerForm.value.contrasena !== this.registerForm.value.confirmarContrasena) {
        Swal.fire({
          title: 'Error',
          text: 'Las contraseñas no coinciden.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        return;
      }

      const userData = {
        usuario: this.registerForm.value.empresa,
        contrasena: this.registerForm.value.contrasena,
        correo: this.registerForm.value.correo,
        telefono: this.registerForm.value.telefono
      };

      this.http.post(environment.apiUrl + '/usuarios/', userData).subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Registro Exitoso',
            text: '¡Bienvenido!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigate(['/inicio']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al registrar. Inténtelo de nuevo.',
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
    const controls = this.registerForm.controls;
    if (controls['empresa'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese el nombre de la empresa.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (controls['ruc'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese el RUC.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (controls['departamento'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese el departamento.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (controls['provincia'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese la provincia.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (controls['distrito'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese el distrito.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (controls['apellidos'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese los apellidos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (controls['nombres'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese los nombres.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (controls['telefono'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese un número de teléfono válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (controls['correo'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese un correo electrónico válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (controls['contrasena'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, ingrese una contraseña.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (controls['confirmarContrasena'].invalid) {
      Swal.fire({
        title: 'Error en el formulario',
        text: 'Por favor, confirme la contraseña.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  }
}
