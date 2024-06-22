import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import 'moment/locale/es';
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
        this.credito.cuotas = this.credito.cuotas.map((cuota: any) => {
          cuota.mesFormateado = moment(cuota.mes).locale('es').format('MMMM YYYY');
          cuota.fechaFormateada = moment(cuota.mes).locale('es').format('LL');
          return cuota;
        });
      },
      error => {
        console.error('Error fetching credit details', error);
      }
    );
  }

  formatFecha(fecha: string): string {
    return moment(fecha).locale('es').format('LL');
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

  filtroPorMes(): void {
    const mes = prompt('Ingrese el mes (en formato MMMM YYYY, por ejemplo "junio 2024"):');
    if (mes) {
      this.cuotasFiltradas = this.credito.cuotas.filter((cuota: any) => cuota.mesFormateado === mes.toLowerCase());
    }
  }

  filtroCuotasMontoCero(): void {
    this.cuotasFiltradas = this.credito.cuotas.filter((cuota: any) => cuota.monto === 0);
  }
}
