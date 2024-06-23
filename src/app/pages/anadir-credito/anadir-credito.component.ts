import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment-timezone';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-anadir-credito',
  templateUrl: './anadir-credito.component.html',
  styleUrls: ['./anadir-credito.component.scss']
})
export class AnadirCreditoComponent implements OnInit {
  creditoForm: FormGroup;
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  tiposCredito: any[] = [];
  tiposInteres: any[] = [];
  productosDisponibles: any[] = [];
  listaProductos: any[] = [];
  mostrarCuotas = true;
  mostrarPlazoGracia = true;
  totalPagar = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.creditoForm = this.fb.group({
      monto: ['', Validators.required],
      TipoCredito_id: ['', Validators.required],
      FechaCredito: ['', Validators.required],
      numeroCuotas: ['', Validators.required],
      TipoInteres_id: ['', Validators.required],
      tasaInteres: ['', Validators.required],
      Cliente_id: ['', Validators.required],
      plazoGracia: ['', Validators.required],
      productos: this.fb.array([]),
      productoId: [''],
      cantidad: ['']
    });
  }

  ngOnInit() {
    this.obtenerClientes();
    this.obtenerTiposCredito();
    this.obtenerTiposInteres();
    this.obtenerProductos();
  }

  obtenerClientes() {
    this.http.get<any[]>(environment.apiUrl + '/clientes').subscribe(data => {
      this.clientes = data;
      this.clientesFiltrados = data; // Initialize filtered clients
    }, error => {
      console.error('Error al obtener clientes', error);
    });
  }

  obtenerTiposCredito() {
    this.http.get<any[]>(environment.apiUrl + '/tiposcredito').subscribe(data => {
      this.tiposCredito = data;
    }, error => {
      console.error('Error al obtener tipos de crédito', error);
    });
  }

  obtenerTiposInteres() {
    this.http.get<any[]>(environment.apiUrl + '/tiposinteres').subscribe(data => {
      this.tiposInteres = data;
    }, error => {
      console.error('Error al obtener tipos de interés', error);
    });
  }

  obtenerProductos() {
    this.http.get<any[]>(environment.apiUrl + '/productos').subscribe(data => {
      this.productosDisponibles = data;
    }, error => {
      console.error('Error al obtener productos', error);
    });
  }

  filtrarClientes(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const dni = inputElement.value;
    
    if (!dni) {
      this.clientesFiltrados = this.clientes;
    } else {
      this.clientesFiltrados = this.clientes.filter(cliente => cliente.dni.toString().includes(dni));
    }
  }

  onTipoCreditoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const tipoCreditoSeleccionado = selectElement.options[selectElement.selectedIndex].text;

    if (tipoCreditoSeleccionado === 'Crédito a término corto') {
      this.creditoForm.patchValue({
        numeroCuotas: 1,
        plazoGracia: 0
      });
      this.mostrarCuotas = false;
      this.mostrarPlazoGracia = false;
    } else {
      this.mostrarCuotas = true;
      this.mostrarPlazoGracia = true;
    }
  }

  get productos(): FormArray {
    return this.creditoForm.get('productos') as FormArray;
  }

  addProducto() {
    const productoId = this.creditoForm.get('productoId')?.value;
    const cantidad = this.creditoForm.get('cantidad')?.value;

    if (productoId && cantidad) {
      const producto = this.productosDisponibles.find(p => p._id === productoId);
      if (producto) {
        const productoConCantidad = {
          nombre: producto.nombre,
          cantidad: cantidad,
          precio: producto.precio * cantidad
        };
        this.listaProductos.push(productoConCantidad);
        this.productos.push(this.fb.group({
          productoId: [{ value: productoId, disabled: true }, Validators.required],
          cantidad: [{ value: cantidad, disabled: true }, Validators.required]
        }));
        this.actualizarTotal();
        this.creditoForm.get('productoId')?.reset();
        this.creditoForm.get('cantidad')?.reset();
      }
    }
  }

  removeProducto(index: number) {
    this.listaProductos.splice(index, 1);
    this.productos.removeAt(index);
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.totalPagar = this.listaProductos.reduce((sum, producto) => sum + producto.precio, 0);
    this.creditoForm.patchValue({ monto: this.totalPagar });
  }

  onSubmit() {
    if (this.creditoForm.valid) {
      const formValue = this.creditoForm.getRawValue(); // Get raw value to include the 'monto' field
      formValue.FechaCredito = moment(formValue.FechaCredito).tz('America/Lima').toDate();
      this.http.post(environment.apiUrl + '/creditos', formValue).subscribe(response => {
        console.log('Crédito creado', response);
      }, error => {
        console.error('Error al crear crédito', error);
      });
    } else {
      alert('Formulario inválido. Por favor, revise los campos y complete todos los datos requeridos.');
    }
  }
}
