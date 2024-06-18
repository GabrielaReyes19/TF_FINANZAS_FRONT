import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clienteForm: FormGroup;
  clientes: any[] = [];
  filteredClientes: any[] = [];
  searchDNI: string = '';

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.clienteForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      tasaMoratoria: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      limiteCredito: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      fechaPagoMensual: ['', Validators.required]
    });

    if (!this.isLoggedIn()) {
      this.router.navigate(['/inicio']);
    }
  }

  ngOnInit(): void {
    this.getClientes();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userData') !== null;
  }

  getClientes(): void {
    this.http.get<any[]>(environment.apiUrl + '/clientes').subscribe(
      data => {
        this.clientes = data;
        this.filteredClientes = data; // Initialize filteredClientes with all clients
      },
      error => {
        console.error('Error fetching clientes', error);
      }
    );
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      this.http.post(environment.apiUrl + '/clientes', this.clienteForm.value).subscribe(
        response => {
          console.log('Cliente registrado con éxito', response);
          this.getClientes(); // Refresh the list after a new client is added
        },
        error => {
          console.error('Error registrando cliente', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
  formatFechaPago(fechaPago: string): string {
    const dia = fechaPago.substring(8, 10); // Extraer los caracteres del día
    return `Los ${dia} de cada mes`;
  }
  
  onSearch() {
    if (this.searchDNI.trim() !== '') {
      this.filteredClientes = this.clientes.filter(cliente =>
        cliente.dni.toString().toLowerCase().startsWith(this.searchDNI.toLowerCase())
      );
    } else {
      this.filteredClientes = [...this.clientes]; // Si la búsqueda está vacía, mostrar todos los clientes
    }
  }
}
