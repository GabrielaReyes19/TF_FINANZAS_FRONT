import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2'; // Importar SweetAlert para la confirmación
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventaForm: FormGroup;
  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  productosDisponibles: any[] = [];
  listaProductos: any[] = [];
  totalPagar = 0;
  currentDate: string;
  numeroBoleta: number;
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.ventaForm = this.fb.group({
      Cliente_id: ['', Validators.required],
      formaPago: ['efectivo', Validators.required],
      productoId: [''],
      cantidad: ['']
    });

    const fecha = new Date();
    this.currentDate = fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    this.numeroBoleta = this.generarNumeroBoleta();
  }

  ngOnInit() {
    this.obtenerClientes();
    this.obtenerProductos();

    // Subscribirse al observable para manejar la búsqueda de clientes
    this.searchSubject.pipe(
      debounceTime(300),  // Espera 300ms después de que el usuario deje de escribir
      distinctUntilChanged(),  // Ignorar si el nuevo valor es igual al anterior
      map(dni => dni.trim().toLowerCase())  // Normalizar el valor
    ).subscribe(dni => {
      this.filtrarClientes(dni);
    });
  }

  obtenerClientes() {
    this.http.get<any[]>(environment.apiUrl + '/clientes').subscribe(data => {
      this.clientes = data;
      this.clientesFiltrados = data;
    }, error => {
      console.error('Error al obtener clientes', error);
    });
  }

  obtenerProductos() {
    this.http.get<any[]>(environment.apiUrl + '/productos').subscribe(data => {
      this.productosDisponibles = data;
    }, error => {
      console.error('Error al obtener productos', error);
    });
  }

  // Método para manejar la entrada del usuario en el campo de búsqueda de DNI
  onDniInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchSubject.next(inputElement.value);
  }

  filtrarClientes(dni: string) {
    if (!dni) {
      this.clientesFiltrados = this.clientes;
    } else {
      this.clientesFiltrados = this.clientes.filter(cliente =>
        cliente.dni.toString().toLowerCase().includes(dni)
      );
    }

    // Si hay exactamente un cliente coincidente, seleccionarlo automáticamente
    if (this.clientesFiltrados.length === 1) {
      this.ventaForm.patchValue({
        Cliente_id: this.clientesFiltrados[0]._id
      });
    } else {
      this.ventaForm.patchValue({
        Cliente_id: ''
      });
    }
  }

  generarNumeroBoleta(): number {
    return Math.floor(Math.random() * 100000000000);
  }

  addProducto() {
    const productoId = this.ventaForm.get('productoId')?.value;
    const cantidad = this.ventaForm.get('cantidad')?.value;

    if (productoId && cantidad) {
      const producto = this.productosDisponibles.find(p => p._id === productoId);
      if (producto) {
        const productoConCantidad = {
          nombre: producto.nombre,
          cantidad: cantidad,
          precio: producto.precio * cantidad
        };
        this.listaProductos.push(productoConCantidad);
        this.actualizarTotal();
      }
    }
  }

  removeProducto(index: number) {
    this.listaProductos.splice(index, 1);
    this.actualizarTotal();
  }

  actualizarTotal() {
    this.totalPagar = this.listaProductos.reduce((sum, producto) => sum + producto.precio, 0);
  }

  cancelarVenta() {
    this.ventaForm.reset({ formaPago: 'efectivo' });
    this.listaProductos = [];
    this.totalPagar = 0;
    this.numeroBoleta = this.generarNumeroBoleta();  // Regenerar el número de boleta al cancelar
  }

  confirmarVenta(): void {
    if (this.ventaForm.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'El formulario es inválido. Por favor, revise los campos y complete todos los datos requeridos.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    // Construir el resumen de la venta
    let productosResumen = '';
    this.listaProductos.forEach(producto => {
      productosResumen += `${producto.nombre} - ${producto.cantidad} unidades - $${producto.precio.toFixed(2)}\n`;
    });

    Swal.fire({
      title: 'Confirmar Venta',
      html: `<p><strong>Total a Pagar:</strong> $${this.totalPagar.toFixed(2)}</p>
             <pre>${productosResumen}</pre>
             <p><strong>Cliente:</strong> ${this.clientes.find(cliente => cliente._id === this.ventaForm.value.Cliente_id)?.nombres}</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vender',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generarBoleta();
      }
    });
  }

  generarBoleta() {
    const clienteId = this.ventaForm.get('Cliente_id')?.value;
    const formaPago = this.ventaForm.get('formaPago')?.value;

    if (!clienteId) {
      Swal.fire({
        title: 'Error',
        text: 'Debe seleccionar un cliente válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const ventaData = {
      Cliente_id: clienteId,
      fechaVenta: new Date(),
      montoTotal: this.totalPagar,
      numeroBoleta: this.numeroBoleta,
      formaPago: formaPago,
      productos: this.listaProductos
    };

    this.http.post(environment.apiUrl + '/ventas', ventaData).subscribe(response => {
      console.log('Venta creada', response);
      this.cancelarVenta();
    }, error => {
      console.error('Error al crear venta', error);
    });
  }

  onSubmit() {
    this.confirmarVenta();
  }
}
