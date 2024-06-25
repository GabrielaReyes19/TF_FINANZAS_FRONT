import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import introJs from 'intro.js';
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit(): void {
    const userData = localStorage.getItem('userData');
    const tutorialShown = localStorage.getItem('intro_tutorial_shown');
    if (userData) {
    if (!tutorialShown) {
      setTimeout(() => this.startIntro(), 500); // Agrega un pequeño retraso para asegurar que los elementos estén cargados
    }
    }

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

  startIntro() {
    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          intro: "Bienvenido a la sección de créditos. Aquí puedes ver todos los créditos registrados."
        },
        {
          element: '#buscar-cliente',
          intro: "Puedes buscar créditos específicos por el DNI del cliente."
        },
        {
          element: '#buscar-fecha-desde',
          intro: "Puedes filtrar los créditos desde una fecha específica."
        },
        {
          element: '#buscar-fecha-hasta',
          intro: "Puedes filtrar los créditos hasta una fecha específica."
        },
        {
          element: '#buscar-estado',
          intro: "Puedes buscar créditos por estado (Activo/Inactivo)."
        },
        {
          element: '#buscar-tipo-credito',
          intro: "Puedes buscar créditos por tipo de crédito."
        },
        {
          element: '#buscar-tipo-interes',
          intro: "Puedes buscar créditos por tipo de interés."
        },
        {
          element: '#buscar-tasa-interes',
          intro: "Puedes buscar créditos por tasa de interés."
        },
        {
          element: '#buscar-monto',
          intro: "Puedes buscar créditos por monto."
        },
        {
          element: '#buscar-cuotas',
          intro: "Puedes buscar créditos por número de cuotas."
        },
        {
          element: '#buscar-plazo-gracia',
          intro: "Puedes buscar créditos por plazo de gracia."
        },
        {
          element: '#tabla-creditos',
          intro: "Haz clic en cualquier fila para ver más detalles sobre el crédito.",
          position: 'top'
        }
      ]
    });

    intro.oncomplete(() => {
      // Marca el tutorial como mostrado en localStorage
      localStorage.setItem('intro_tutorial_shown', 'true');
    });

    intro.onexit(() => {
      // Marca el tutorial como mostrado en localStorage si el usuario lo cierra
      localStorage.setItem('intro_tutorial_shown', 'true');
    });

    intro.start();
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
