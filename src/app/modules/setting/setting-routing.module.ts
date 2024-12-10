import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { AddTvaComponent } from './pages/add-tva/add-tva.component';
import { AddUnityComponent } from './pages/add-unity/add-unity.component';
import { AddColorComponent } from './pages/add-color/add-color.component';
import { AddModesPaiementComponent } from './pages/add-modes-paiement/add-modes-paiement.component';
import { AddDepotComponent } from './pages/add-depot/add-depot.component';
import { AddUserComponent } from './pages/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component:SettingComponent,
    children: [
      { path: 'TVA', component:AddTvaComponent },
      { path: 'Unity', component:AddUnityComponent },
      { path: 'Color', component:AddColorComponent },
      { path: 'Modes_paiment', component:AddModesPaiementComponent },
      { path: 'Depot', component:AddDepotComponent },
      { path: 'user', component:AddUserComponent },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
