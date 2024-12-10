import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTvaComponent } from '../list-tva/list-tva.component';
import { SettingService } from '../../setting.service';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-add-tva',
  standalone: true,
  imports: [CommonModule, FormsModule, ListTvaComponent,AngularSvgIconModule],
  templateUrl: './add-tva.component.html',
  styleUrls: ['./add-tva.component.scss'],
  providers: [SettingService]
})
export class AddTvaComponent {
  isModalOpen = false;

  selectedTVA: any = {};

 

  constructor(private settingService: SettingService) { }

  onSubmit() {
    this.settingService.addTtva(this.selectedTVA).subscribe(
      response => {
        console.log('TTVA added successfully', response);
        this.selectedTVA = { TTVA: '', LIBELE: '', REMARQUE: '', DEFAUT: false }; // Reset the form

        this.isModalOpen=false
      },
      error => console.error('Error adding TTVA', error)
    );
  }




  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}
