import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  // },
  {
    path: 'Vente',
    loadChildren: () => import('./modules/vente/vente.module').then((m) => m.VenteModule),
  },
  {
    path: 'stock',
    loadChildren: () => import('./modules/stock/stock.module').then((m) => m.StockModule),
  },

  {
    path: 'Achat',
    loadChildren: () => import('./modules/achat/achat.module').then((m) => m.AchatModule),
  },
  {
    path: 'setting',
    loadChildren: () => import('./modules/setting/setting.module').then((m) => m.SettingModule),
  },
  { path: '**', redirectTo: 'errors/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}