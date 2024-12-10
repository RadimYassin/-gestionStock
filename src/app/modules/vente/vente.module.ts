import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenteRoutingModule } from './vente-routing.module';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LivraisonComponent } from './pages/livraison/livraison.component';

import { BrowserModule } from '@angular/platform-browser';
import { EditeLivraisonComponent } from './pages/edite-livraison/edite-livraison.component';
registerLocaleData(en);

@NgModule({

  imports: [
    VenteRoutingModule,
    CommonModule,
    DragDropModule,
    NzButtonModule,
    NzTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzButtonModule
    ,
    FormsModule

  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class VenteModule {}
