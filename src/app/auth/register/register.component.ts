import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private router: Router,private http: HttpClient,private fb: FormBuilder) {
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
      const userData = {
        usuario: this.registerForm.value.empresa,
        contrasena: this.registerForm.value.contrasena,
        correo: this.registerForm.value.correo,
        telefono: this.registerForm.value.telefono
      };
      this.http.post(environment.apiUrl+'/usuarios/', userData)
      .subscribe(
        (response: any) => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/inicio']);
          // Aquí puedes manejar la respuesta de la API
        },
        (error) => {
          console.error('Error al registrar:', error);
          // Aquí puedes manejar el error de la API
        }
      );
    }


    
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }
}
