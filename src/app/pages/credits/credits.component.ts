import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { Router } from '@angular/router'; // Importa el Router

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {
  creditos: any[] = [];
  filteredCreditos: any[] = [];
  searchCliente: string = '';
  searchFechaDesde: string = '';
  searchFechaHasta: string = '';
  searchEstado: string = '';
  searchTipoCredito: string = '';
  searchTipoInteres: string = '';
  searchTasaInteres: string = '';
  searchMonto: string = '';
  searchCuotas: string = '';
  searchPlazoGracia: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCreditos();
  }

  obtenerCreditos(): void {
    this.http.get<any[]>(environment.apiUrl + '/creditos').subscribe(
      data => {
        this.creditos = data;
        this.filteredCreditos = data; // Initialize filteredCreditos with all credits
      },
      error => {
        console.error('Error fetching credits', error);
      }
    );
  }

  formatFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString();
  }

  navigateToCredito(id: string): void {
    this.router.navigate(['/detalles-credito', id]);
  }

  onSearch(): void {
    let filtered = this.creditos;

    if (this.searchCliente.trim() !== '') {
      filtered = filtered.filter(credito =>
        credito.Cliente_id.dni.toString().includes(this.searchCliente.trim())
      );
    }

    if (this.searchFechaDesde) {
      const fechaDesde = new Date(this.searchFechaDesde).setHours(0, 0, 0, 0);
      filtered = filtered.filter(credito =>
        new Date(credito.FechaCredito).getTime() >= fechaDesde
      );
    }

    if (this.searchFechaHasta) {
      const fechaHasta = new Date(this.searchFechaHasta).setHours(23, 59, 59, 999);
      filtered = filtered.filter(credito =>
        new Date(credito.FechaCredito).getTime() <= fechaHasta
      );
    }

    if (this.searchEstado.trim() !== '') {
      filtered = filtered.filter(credito =>
        (credito.estado ? 'Activo' : 'Inactivo').toLowerCase().includes(this.searchEstado.toLowerCase())
      );
    }

    if (this.searchTipoCredito.trim() !== '') {
      filtered = filtered.filter(credito =>
        credito.TipoCredito_id.nombre.toLowerCase().includes(this.searchTipoCredito.toLowerCase())
      );
    }

    if (this.searchTipoInteres.trim() !== '') {
      filtered = filtered.filter(credito =>
        credito.TipoInteres_id.nombre.toLowerCase().includes(this.searchTipoInteres.toLowerCase())
      );
    }

    if (this.searchTasaInteres.trim() !== '') {
      filtered = filtered.filter(credito =>
        credito.tasaInteres.toString().toLowerCase().includes(this.searchTasaInteres.toLowerCase())
      );
    }

    if (this.searchMonto.trim() !== '') {
      filtered = filtered.filter(credito =>
        credito.monto.toString().toLowerCase().includes(this.searchMonto.toLowerCase())
      );
    }

    if (this.searchCuotas.trim() !== '') {
      filtered = filtered.filter(credito =>
        credito.numeroCuotas.toString().toLowerCase().includes(this.searchCuotas.toLowerCase())
      );
    }

    if (this.searchPlazoGracia.trim() !== '') {
      filtered = filtered.filter(credito =>
        credito.plazoGracia.toString().toLowerCase().includes(this.searchPlazoGracia.toLowerCase())
      );
    }

    this.filteredCreditos = filtered;
  }
}
