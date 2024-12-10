
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { ListDepotComponent } from '../list-depot/list-depot.component';
import { SettingService } from '../../setting.service';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
 selector: 'app-add-depot',
standalone: true,
  imports: [CommonModule, FormsModule, ListDepotComponent,AngularSvgIconModule],
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.scss'],
  providers: [SettingService]
})
export class AddDepotComponent {
  isModalOpen = false;

  depot: any = {};

 

  constructor(private settingService: SettingService) { }

  onSubmit() {
    this.settingService.addDepot(this.depot).subscribe(
      response => {
        console.log('Depot added successfully', response);
        this.depot = {  }; // Reset the form

        this.isModalOpen=false
      },
      error => console.error('Error adding Depot', error)
    );
  }






  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}
