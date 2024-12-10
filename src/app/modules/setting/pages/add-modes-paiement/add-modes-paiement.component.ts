



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService } from '../../setting.service';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ListModesPaiementComponent } from '../list-modes-paiement/list-modes-paiement.component';

@Component({
  selector: 'app-add-modes-paiemen',
  standalone: true,
  imports: [CommonModule, FormsModule, ListModesPaiementComponent,AngularSvgIconModule],
  templateUrl: './add-modes-paiement.component.html',
  styleUrls: ['./add-modes-paiement.component.scss'],
  providers: [SettingService]


  
})
export class AddModesPaiementComponent {
  isModalOpen = false;

  modePaiement: any = {};

 

  constructor(private settingService: SettingService) { }

  onSubmit() {
    this.settingService.addPaymentMode(this.modePaiement).subscribe(
      response => {
        console.log('mode added successfully', response);

        this.isModalOpen=false
      },
      error => console.error('Error adding color', error)
    );
  }




  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}

