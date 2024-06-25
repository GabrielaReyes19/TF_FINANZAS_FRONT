import { Component, AfterViewInit } from '@angular/core';
import introJs from 'intro.js';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Verifica si el tutorial ya se ha mostrado
    const userData = localStorage.getItem('userData');
    const tutorialShown = localStorage.getItem('intro_tutorial_bienvenida_shown');
    if (userData && !tutorialShown) {
      setTimeout(() => this.startIntro(), 500); // Agrega un pequeño retraso para asegurar que los elementos estén cargados
    }
  }

  startIntro() {
    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          intro: "¡Bienvenido a RedVelvet Bakery! Aquí puedes gestionar tu panadería."
        },
        {
          element: '#inventario-link',
          intro: "Accede y gestiona el inventario de productos de la panadería."
        },
        {
          element: '#finanzas-link',
          intro: "Revisa y analiza los datos financieros."
        },
        {
          element: '#ventas-link',
          intro: "Administra las ventas y el rendimiento del equipo de ventas."
        },
        {
          element: '#clientes-link',
          intro: "Gestiona la información de tus clientes."
        },
        {
          element: '#credits-link',
          intro: "Supervisa los créditos otorgados a los clientes."
        },
        {
          element: '#cuenta-corriente-link',
          intro: "Administra y revisa la cuenta corriente."
        }
      ]
    });

    intro.oncomplete(() => {
      // Marca el tutorial como mostrado en localStorage
      localStorage.setItem('intro_tutorial_bienvenida_shown', 'true');
    });

    intro.onexit(() => {
      // Marca el tutorial como mostrado en localStorage si el usuario lo cierra
      localStorage.setItem('intro_tutorial_bienvenida_shown', 'true');
    });

    intro.start();
  }
}
