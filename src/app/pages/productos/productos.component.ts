import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productoForm: FormGroup;
  tipoProductoForm: FormGroup;
  productos: any[] = [];
  tiposProducto: any[] = [];
  filteredProductos: any[] = [];
  searchNombre: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      descripcion: ['', Validators.required],
      stock: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      tipoProducto_id: ['', Validators.required]
    });

    this.tipoProductoForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProductos();
    this.getTiposProducto();
  }

  getProductos(): void {
    this.http.get<any[]>(`${environment.apiUrl}/productos`).subscribe(
      data => {
        this.productos = data;
        this.filteredProductos = data;
      },
      error => {
        console.error('Error fetching productos', error);
      }
    );
  }

  getTiposProducto(): void {
    this.http.get<any[]>(`${environment.apiUrl}/tiposproducto`).subscribe(
      data => {
        this.tiposProducto = data;
      },
      error => {
        console.error('Error fetching tipos de producto', error);
      }
    );
  }

  onSubmitProducto() {
    if (this.productoForm.valid) {
      this.http.post(`${environment.apiUrl}/productos`, this.productoForm.value).subscribe(
        response => {
          console.log('Producto registrado con éxito', response);
          this.getProductos();
        },
        error => {
          console.error('Error registrando producto', error);
        }
      );
    } else {
      console.log('Formulario de producto inválido');
    }
  }

  onSubmitTipoProducto() {
    if (this.tipoProductoForm.valid) {
      this.http.post(`${environment.apiUrl}/tiposproducto`, this.tipoProductoForm.value).subscribe(
        response => {
          console.log('Tipo de producto registrado con éxito', response);
          this.getTiposProducto();
        },
        error => {
          console.error('Error registrando tipo de producto', error);
        }
      );
    } else {
      console.log('Formulario de tipo de producto inválido');
    }
  }

  onSearch() {
    if (this.searchNombre.trim() !== '') {
      this.filteredProductos = this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(this.searchNombre.toLowerCase())
      );
    } else {
      this.filteredProductos = [...this.productos];
    }
  }
}
