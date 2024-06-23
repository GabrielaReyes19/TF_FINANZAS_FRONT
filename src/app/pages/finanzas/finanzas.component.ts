import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Color, ScaleType, LegendPosition } from '@swimlane/ngx-charts';
import { environment } from 'src/enviroments/enviroment';


@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.scss']
})
export class FinanzasComponent implements OnInit {
  // Data for the charts
  topClientes: any[] = [];
  ventasPorCliente: any[] = [];
  creditosPorCliente: any[] = [];

  // Chart options
  view: [number, number] = [1000, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Clientes';
  showYAxisLabel = true;
  yAxisLabel = 'Total';
  animations: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Below;

  // Color scheme
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTopClientes();
    this.getVentasPorCliente();
    this.getCreditosPorCliente();
  }

  getTopClientes() {
    this.http.get<any[]>(`${environment.apiUrl}/grafico/clientes/top`).subscribe(
      data => {
        this.topClientes = this.formatChartData(data, 'nombres', 'totalCreditos');
      },
      error => {
        console.error('Error al obtener los clientes', error);
        this.topClientes = []; // Ensure it's not undefined
      }
    );
  }

  getVentasPorCliente() {
    this.http.get<any[]>(`${environment.apiUrl}/grafico/ventas/por-cliente`).subscribe(
      data => {
        this.ventasPorCliente = this.formatChartData(data, 'cliente', 'totalVentas');
      },
      error => {
        console.error('Error al obtener las ventas', error);
        this.ventasPorCliente = []; // Ensure it's not undefined
      }
    );
  }

  getCreditosPorCliente() {
    this.http.get<any[]>(`${environment.apiUrl}/grafico/creditos/por-cliente`).subscribe(
      data => {
        this.creditosPorCliente = this.formatChartData(data, 'cliente', 'totalCreditos');
      },
      error => {
        console.error('Error al obtener los créditos', error);
        this.creditosPorCliente = []; // Ensure it's not undefined
      }
    );
  }

  private formatChartData(data: any[], nameKey: string, valueKey: string): any[] {
    return data.map(item => ({
      name: item[nameKey] || 'Desconocido',
      value: item[valueKey] !== undefined ? item[valueKey] : 0
    }));
  }
}
