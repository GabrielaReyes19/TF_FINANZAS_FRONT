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
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
