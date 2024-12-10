import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'Vente',
    component: LayoutComponent,
    loadChildren: () => import('../vente/vente.module').then((m) => m.VenteModule),
  },
  {
    path: 'stock',
    component: LayoutComponent,
    loadChildren: () => import('../stock/stock.module').then((m) => m.StockModule),
  },
  {
    path: 'setting',
    component: LayoutComponent,
    loadChildren: () => import('../setting/setting.module').then((m) => m.SettingModule),
  },

  {
    path: 'Achat',
    component: LayoutComponent,
    loadChildren: () => import('../achat/achat.module').then((m) => m.AchatModule),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
