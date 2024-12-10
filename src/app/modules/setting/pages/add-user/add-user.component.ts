import { Component } from '@angular/core';
import { ListUserComponent } from '../list-user/list-user.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SettingService } from '../../setting.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,FormsModule,ListUserComponent,],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  providers: [SettingService]
})
export class AddUserComponent {
  isModalOpen = false;
  User = {
    NOM: '',
    PRENOM: '',
    LOGIN: '',
    PASSWORD: '',
    ADRESSE: '',
    TEL: '',
    MAIL: '',
    ROLE_ID: '',
    ACTIF: false,  // Changed to boolean for checkbox
    INS_USER: '',
    Blocked: false,  // Changed to boolean for checkbox
    ShowMargin: false,  // Changed to boolean for checkbox
    EnterSalesPrice: false,  // Changed to boolean for checkbox
    ShowShopPrice: false,  // Changed to boolean for checkbox
    product_provisioning_fix: '',
    product_provisioning_rel: '',
    product_provisioning_fix_per_qty: '',
    month_salery: ''
  };
  

  constructor(private settingService: SettingService) { }
  onSubmit() {
         this.settingService.addUser(this.User).subscribe(
            response => {
              console.log('user added successfully', response);
              this.User = { NOM: '', PRENOM: '', LOGIN: '', PASSWORD: '', ADRESSE: '',
                 TEL: '', MAIL: '', ROLE_ID: '', ACTIF: false, INS_USER: '', Blocked: false, ShowMargin: false,
                   EnterSalesPrice: false, ShowShopPrice: false, product_provisioning_fix: '',
                    product_provisioning_rel: '', product_provisioning_fix_per_qty: '',
                     month_salery: ''
                     
              }; // Reset the form
              this.isModalOpen=false
            },
            error => console.error('Error adding user', error)
          );
        }


  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
