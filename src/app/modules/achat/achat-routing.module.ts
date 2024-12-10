import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  FournisseurComponent} from './pages/fournisseur/fournisseur.component';
import { AchatComponent } from './achat.component';
import { ListFournisseurComponent } from './pages/list-fournisseur/list-fournisseur.component';

const routes: Routes = [
  {
    path: '',
    component:AchatComponent,
    children: [
      { path: 'fournisseur', component:FournisseurComponent },
      { path: 'listFournisseur', component:ListFournisseurComponent },



    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FournisseurRoutingModule {}
