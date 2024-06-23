import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-cuenta-corriente',
  templateUrl: './cuenta-corriente.component.html',
  styleUrls: ['./cuenta-corriente.component.scss']
})
export class CuentaCorrienteComponent implements OnInit {
  cuentaCorriente: any; // Variable para almacenar los datos de la cuenta corriente
  transaccionesFiltradas: any[] = [];
  saldoFiltrado: number = 0; // Variable para almacenar el saldo según los filtros
  filtersApplied: boolean = false; // Variable para rastrear si se han aplicado filtros
  months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 }
  ];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerCuentaCorriente();
  }

  getYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 2000; year--) {
      years.push(year);
    }
    return years;
  }

  obtenerCuentaCorriente() {
    this.http.get<any>(environment.apiUrl + '/cuenta-corriente/general').subscribe(
      response => {
        this.cuentaCorriente = response;
        this.transaccionesFiltradas = response.transacciones;
        this.actualizarSaldoFiltrado();
      },
      error => {
        console.error('Error al obtener la cuenta corriente:', error);
      }
    );
  }

  actualizarDatos() {
    this.obtenerCuentaCorriente();
  }

  filtrarTransacciones() {
    const month = (document.getElementById('month') as HTMLSelectElement).value;
    const year = (document.getElementById('year') as HTMLSelectElement).value;
    const descripcion = (document.getElementById('descripcion') as HTMLInputElement).value.toLowerCase();

    this.transaccionesFiltradas = this.cuentaCorriente.transacciones.filter((transaccion: any) => {
      const transaccionDate = new Date(transaccion.fecha);
      const transaccionMonth = transaccionDate.getMonth() + 1;
      const transaccionYear = transaccionDate.getFullYear();
      const transaccionDescripcion = transaccion.descripcion.toLowerCase();

      const matchMonth = month === 'all' || transaccionMonth === +month;
      const matchYear = year === 'all' || transaccionYear === +year;
      const matchDescripcion = transaccionDescripcion.includes(descripcion);

      return matchMonth && matchYear && matchDescripcion;
    });

    this.filtersApplied = month !== 'all' || year !== 'all' || descripcion !== '';
    this.actualizarSaldoFiltrado();
  }

  actualizarSaldoFiltrado() {
    this.saldoFiltrado = this.transaccionesFiltradas.reduce((total, transaccion) => {
      return total + (transaccion.tipo === 'Entrada' ? transaccion.monto : -transaccion.monto);
    }, 0);
  }

  imprimirTransacciones() {
    const printArea = document.querySelector('.print-area');
    if (!printArea) return;

    const printContents = printArea.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Recargar la página para restaurar el contenido original
    }
  }
}
