import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2'; // Importar SweetAlert para la confirmación
import { environment } from 'src/enviroments/enviroment';

@Component({
  selector: 'app-cuota-detalle',
  templateUrl: './cuota-detalle.component.html',
  styleUrls: ['./cuota-detalle.component.scss']
})
export class CuotaDetalleComponent implements OnInit {
  cuota: any;
  pago: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.obtenerCuota(id);
  }

  obtenerCuota(id: string | null): void {
    if (!id) {
      console.error('ID is null or undefined');
      return;
    }

    this.http.get<any>(`${environment.apiUrl}/cuotas/${id}`).subscribe(
      data => {
        this.cuota = data.cuota;
        this.pago = data.pago;
        this.cuota.fechaFormateada = moment(this.cuota.mes).locale('es').format('LL');
        if (this.pago) {
          this.pago.fechaPagoFormateada = moment(this.pago.fechaPago).locale('es').format('LL');
        }
        this.cuota.clienteNombre = data.cuota.clienteNombre || 'Nombre del Cliente'; 
      },
      error => {
        console.error('Error fetching cuota details', error);
      }
    );
  }

  printFactura(): void {
    const printContents = document.getElementById('factura')?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();  // Recarga la página para restaurar el contenido original
    }
  }

  confirmarPago(): void {
    const montoTotal = this.cuota.monto + (this.cuota.montoMora > 0 ? this.cuota.montoMora : 0);
    Swal.fire({
      title: 'Confirmar Pago',
      text: `¿Estás seguro de que deseas realizar el pago de $${montoTotal}? ${this.cuota.montoMora > 0 ? 'Incluye mora de $' + this.cuota.montoMora : ''}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, pagar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pagarCuota();
      }
    });
  }

  pagarCuota(): void {
    if (!this.cuota || !this.cuota._id) {
      console.error('No se puede procesar el pago porque la cuota no está disponible');
      return;
    }

    const pagoData = {
      montoTotal: this.cuota.monto + (this.cuota.montoMora > 0 ? this.cuota.montoMora : 0),
      Cuota_id: this.cuota._id
    };

    console.log('Enviando datos de pago:', pagoData);

    this.http.post(`${environment.apiUrl}/pagos`, pagoData).subscribe(
      response => {
        console.log('Cuota pagada exitosamente', response);
        this.cuota.estado = false; // Actualizar el estado de la cuota en la interfaz
        this.pago = response; // Guardar el pago en la interfaz
        this.pago.fechaPagoFormateada = moment(this.pago.fechaPago).locale('es').format('LL');
      },
      error => {
        console.error('Error al pagar la cuota', error);
      }
    );
  }
}
