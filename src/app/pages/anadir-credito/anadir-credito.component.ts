import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment-timezone';
import { environment } from 'src/enviroments/enviroment';


@Component({
  selector: 'app-anadir-credito',
  templateUrl: './anadir-credito.component.html',
  styleUrls: ['./anadir-credito.component.scss']
})
export class AnadirCreditoComponent implements OnInit {
  creditoForm: FormGroup;
  clientes: any[] = [];
  tiposCredito: any[] = [];
  tiposInteres: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.creditoForm = this.fb.group({
      monto: ['', Validators.required],
      TipoCredito_id: ['', Validators.required],
      FechaCredito: ['', Validators.required],
      numeroCuotas: ['', Validators.required],
      TipoInteres_id: ['', Validators.required],
      tasaInteres: ['', Validators.required],
      dni: ['', Validators.required],
      Cliente_id: ['', Validators.required],
      plazoGracia: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.obtenerClientes();
    this.obtenerTiposCredito();
    this.obtenerTiposInteres();
  }

  obtenerClientes() {
    this.http.get<any[]>(environment.apiUrl + '/clientes').subscribe(data => {
      this.clientes = data;
    }, error => {
      console.error('Error al obtener clientes', error);
    });
  }

  obtenerTiposCredito() {
    this.http.get<any[]>(environment.apiUrl + '/tiposcredito').subscribe(data => {
      this.tiposCredito = data;
    }, error => {
      console.error('Error al obtener tipos de crédito', error);
    });
  }

  obtenerTiposInteres() {
    this.http.get<any[]>(environment.apiUrl + '/tiposinteres').subscribe(data => {
      this.tiposInteres = data;
    }, error => {
      console.error('Error al obtener tipos de interés', error);
    });
  }

  onSubmit() {
    if (this.creditoForm.valid) {
      const formValue = this.creditoForm.value;
      formValue.FechaCredito = moment(formValue.FechaCredito).tz('America/Lima').toDate();
      this.http.post(environment.apiUrl + '/creditos', formValue).subscribe(response => {
        console.log('Crédito creado', response);
      }, error => {
        console.error('Error al crear crédito', error);
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
