import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { RegistroVentaComponent } from './pages/registro-venta/registro-venta.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { InventarioAnadirComponent } from './pages/inventario-anadir/inventario-anadir.component';
import { InventarioModificarComponent } from './pages/inventario-modificar/inventario-modificar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    NavbarComponent,
    VentasComponent,
    RegistroVentaComponent,
    PerfilComponent,
    InventarioAnadirComponent,
    InventarioModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
