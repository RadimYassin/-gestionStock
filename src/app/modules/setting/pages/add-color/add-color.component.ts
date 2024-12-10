
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService } from '../../setting.service';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ListColorComponent } from '../list-color/list-color.component';

@Component({
  selector: 'app-add-color',
  standalone: true,
  imports: [CommonModule, FormsModule, ListColorComponent,AngularSvgIconModule],
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.scss',
  providers: [SettingService]


  
})
export class AddColorComponent {
  isModalOpen = false;

  color: any = {};

 

  constructor(private settingService: SettingService) { }

  onSubmit() {
    this.settingService.addColor(this.color).subscribe(
      response => {
        console.log('color added successfully', response);

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

