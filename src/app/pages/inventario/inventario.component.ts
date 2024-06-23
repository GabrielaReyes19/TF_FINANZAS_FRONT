import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.http.get<any[]>(`${environment.apiUrl}/productos`).subscribe(data => {
      this.productos = data;
    }, error => {
      console.error('Error al obtener productos', error);
    });
  }

  async crearProducto() {
    const { value: formValues } = await Swal.fire({
      title: 'Crear Producto',
      html:
        '<input id="nombre" class="swal2-input" placeholder="Nombre">' +
        '<input id="precio" type="number" class="swal2-input" placeholder="Precio">' +
        '<input id="descripcion" class="swal2-input" placeholder="Descripción">' +
        '<input id="tipoProducto" class="swal2-input" placeholder="Tipo de Producto">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          nombre: (document.getElementById('nombre') as HTMLInputElement).value,
          precio: parseFloat((document.getElementById('precio') as HTMLInputElement).value).toFixed(2),
          descripcion: (document.getElementById('descripcion') as HTMLInputElement).value,
          tipoProducto: (document.getElementById('tipoProducto') as HTMLInputElement).value
        };
      }
    });

    if (formValues) {
      this.http.post(`${environment.apiUrl}/productos`, formValues).subscribe(response => {
        Swal.fire('¡Producto creado!', '', 'success');
        this.obtenerProductos();
      }, error => {
        Swal.fire('Error al crear el producto', error.message, 'error');
      });
    }
  }

  async editarProducto(producto: any) { // Especifica el tipo 'any' para el parámetro
    const { value: formValues } = await Swal.fire({
      title: 'Editar Producto',
      html:
        `<input id="nombre" class="swal2-input" placeholder="Nombre" value="${producto.nombre}">` +
        `<input id="precio" type="number" class="swal2-input" placeholder="Precio" value="${producto.precio}">` +
        `<input id="descripcion" class="swal2-input" placeholder="Descripción" value="${producto.descripcion}">` +
        `<input id="tipoProducto" class="swal2-input" placeholder="Tipo de Producto" value="${producto.tipoProducto}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          nombre: (document.getElementById('nombre') as HTMLInputElement).value,
          precio: parseFloat((document.getElementById('precio') as HTMLInputElement).value).toFixed(2),
          descripcion: (document.getElementById('descripcion') as HTMLInputElement).value,
          tipoProducto: (document.getElementById('tipoProducto') as HTMLInputElement).value
        };
      }
    });

    if (formValues) {
      this.http.put(`${environment.apiUrl}/productos/${producto._id}`, formValues).subscribe(response => {
        Swal.fire('¡Producto actualizado!', '', 'success');
        this.obtenerProductos();
      }, error => {
        Swal.fire('Error al actualizar el producto', error.message, 'error');
      });
    }
  }

  eliminarProducto(producto: any) { // Especifica el tipo 'any' para el parámetro
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está a punto de eliminar el producto: ${producto.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${environment.apiUrl}/productos/${producto._id}`).subscribe(response => {
          Swal.fire('¡Producto eliminado!', '', 'success');
          this.obtenerProductos();
        }, error => {
          Swal.fire('Error al eliminar el producto', error.message, 'error');
        });
      }
    });
  }
}
