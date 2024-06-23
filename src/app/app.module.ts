import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FinanzasComponent } from './pages/finanzas/finanzas.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { RegistroVentaComponent } from './pages/registro-venta/registro-venta.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { InventarioAnadirComponent } from './pages/inventario-anadir/inventario-anadir.component';
import { InventarioModificarComponent } from './pages/inventario-modificar/inventario-modificar.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { AnadirCreditoComponent } from './pages/anadir-credito/anadir-credito.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

// Import Angular Material modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// Import Angular Material modules
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DetallesCreditoComponent } from './pages/detalles-credito/detalles-credito.component';
import { CuentaCorrienteComponent } from './pages/cuenta-corriente/cuenta-corriente.component';
import { CuotaDetalleComponent } from './pages/cuota-detalle/cuota-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FinanzasComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    NavbarComponent,
    VentasComponent,
    RegistroVentaComponent,
    PerfilComponent,
    InventarioAnadirComponent,
    InventarioModificarComponent,
    ProductsComponent,
    CreditsComponent,
    AnadirCreditoComponent,
    InventarioComponent,
    ClientesComponent,
    DetallesCreditoComponent,
    CuentaCorrienteComponent,
    CuotaDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // Add Angular Material modules here
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
