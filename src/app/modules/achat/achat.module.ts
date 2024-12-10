import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FournisseurRoutingModule } from './achat-routing.module';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';

registerLocaleData(en);

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FournisseurRoutingModule,
    NzButtonModule,
    NzTableModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzButtonModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class AchatModule {}
