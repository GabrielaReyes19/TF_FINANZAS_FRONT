import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanzasComponent } from './pages/finanzas/finanzas.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component'; 
import { VentasComponent } from './pages/ventas/ventas.component';
import { RegistroVentaComponent } from './pages/registro-venta/registro-venta.component';
import { ProductsComponent }  from './pages/products/products.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { AnadirCreditoComponent } from './pages/anadir-credito/anadir-credito.component';
import { InventarioAnadirComponent } from './pages/inventario-anadir/inventario-anadir.component';
import { InventarioModificarComponent } from './pages/inventario-modificar/inventario-modificar.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { DetallesCreditoComponent } from './pages/detalles-credito/detalles-credito.component';
import { CuentaCorrienteComponent } from './pages/cuenta-corriente/cuenta-corriente.component';
import { CuotaDetalleComponent } from './pages/cuota-detalle/cuota-detalle.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  {path:'inicio',component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'registro-venta', component: RegistroVentaComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'finanzas', component: FinanzasComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'anadir-credito', component: AnadirCreditoComponent },
  { path: 'inventario-anadir', component: InventarioAnadirComponent },
  { path: 'inventario-modificar', component: InventarioModificarComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'detalles-credito/:id', component: DetallesCreditoComponent },
  { path: 'cuenta-corriente', component: CuentaCorrienteComponent },
  { path: 'cuota-detalle/:id', component: CuotaDetalleComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
