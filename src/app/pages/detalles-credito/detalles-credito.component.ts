import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-detalles-credito',
  templateUrl: './detalles-credito.component.html',
  styleUrls: ['./detalles-credito.component.scss']
})
export class DetallesCreditoComponent implements OnInit {
  credito: any;
  cuotasFiltradas: any[] = [];  // Inicializamos aquí

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.obtenerCredito(id);
  }

  obtenerCredito(id: string | null): void {
    if (!id) {
      console.error('ID is null or undefined');
      return;
    }

    this.http.get<any>(`${environment.apiUrl}/creditos/${id}`).subscribe(
      data => {
        this.credito = data;
        this.cuotasFiltradas = this.credito.cuotas; // Inicialmente mostrar todas las cuotas
      },
      error => {
        console.error('Error fetching credit details', error);
      }
    );
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString();
  }

  filtroCuotas(estado: string): void {
    if (estado === 'all') {
      this.cuotasFiltradas = this.credito.cuotas;
    } else if (estado === 'activo') {
      this.cuotasFiltradas = this.credito.cuotas.filter((cuota: any) => cuota.estado);
    } else if (estado === 'inactivo') {
      this.cuotasFiltradas = this.credito.cuotas.filter((cuota: any) => !cuota.estado);
    }
  }
}
