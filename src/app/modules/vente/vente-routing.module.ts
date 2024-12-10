import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenteComponent } from './vente.component';
import { ClientComponent } from './pages/client/client.component';
import { ListClientComponent } from './pages/listclient/listclient.component';
import { LivraisonComponent } from './pages/livraison/livraison.component';
import { FormsModule } from '@angular/forms';
import { ListlivraisonComponent } from './pages/listlivraison/listlivraison.component';
import {  ReceptionComponent} from './pages/reception/reception.component';
import { ListreceptionComponent } from './pages/listreception/listreception.component';
import { EditeLivraisonComponent } from './pages/edite-livraison/edite-livraison.component';

const routes: Routes = [
  {
    path: '',
    component:VenteComponent,
    children: [
      { path: 'addClient', component:ClientComponent },
      { path: 'listClient', component: ListClientComponent },
      { path: 'livraison', component:LivraisonComponent },
      { path: 'listlivraison',component:ListlivraisonComponent },
      { path: 'reception',component:ReceptionComponent },
      { path: 'listreception',component:ListreceptionComponent },
      { path: 'editeLivraison/:id',component:EditeLivraisonComponent },

      


    ],
  },
];

@NgModule({

  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule],
})
export class VenteRoutingModule {}
