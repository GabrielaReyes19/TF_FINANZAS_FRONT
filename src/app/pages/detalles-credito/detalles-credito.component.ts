import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import 'moment/locale/es';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-detalles-credito',
  templateUrl: './detalles-credito.component.html',
  styleUrls: ['./detalles-credito.component.scss']
})
export class DetallesCreditoComponent implements OnInit {
  credito: any;
  cuotasFiltradas: any[] = [];
  
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
        this.cuotasFiltradas = this.credito.cuotas;
        this.credito.cuotas = this.credito.cuotas.map((cuota: any) => {
          cuota.mesFormateado = moment(new Date(cuota.mes)).locale('es').format('MMMM YYYY');
          cuota.fechaFormateada = moment(new Date(cuota.mes)).locale('es').format('LL');
          return cuota;
        });
      },
      error => {
        console.error('Error fetching credit details', error);
      }
    );
  }

  formatFecha(fecha: string): string {
    return moment(new Date(fecha)).locale('es').format('LL');
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

  imprimir(): void {
    const doc = new jsPDF();
    const columns = [
      { title: 'Número de Cuota', dataKey: 'numeroCuota' },
      { title: 'Fecha', dataKey: 'fechaFormateada' },
      { title: 'Monto', dataKey: 'monto' },
      { title: 'Interés', dataKey: 'interes' },
      { title: 'Amortización', dataKey: 'amortizacion' },
      { title: 'Estado', dataKey: 'estado' },
      { title: 'Días de Mora', dataKey: 'diasMora' },
      { title: 'Saldo', dataKey: 'saldo' }
    ];

    const rows = this.cuotasFiltradas.map(cuota => ({
      numeroCuota: cuota.numeroCuota,
      fechaFormateada: cuota.fechaFormateada,
      monto: cuota.monto === 0 ? 'Plazo de Gracia' : `$${cuota.monto}`,
      interes: cuota.interes,
      amortizacion: cuota.amortizacion,
      estado: cuota.estado ? 'Pendiente a Pago' : 'Pago Exitoso',
      diasMora: cuota.diasMora,
      saldo: cuota.saldo
    }));

    (doc as any).autoTable({
      head: [columns.map(col => col.title)],
      body: rows.map(row => Object.values(row)),
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      styles: {
        font: 'helvetica',
        fontSize: 10,
        textColor: [0, 0, 0]
      },
      margin: { top: 10 }
    });

    doc.save('detalle_credito.pdf');
  }
}
