// import { Component } from '@angular/core';
// import { ListUnityComponent } from '../list-unity/list-unity.component';
// import { SettingService } from '../../setting.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-add-unity',
//   standalone: true,
//   imports: [CommonModule,FormsModule,ListUnityComponent],
//   templateUrl: './add-unity.component.html',
//   styleUrl: './add-unity.component.scss',
//   providers: [SettingService]
  
// })
// export class AddUnityComponent {
//   uunity = {
//     UNITE_LIBELE: '',
//     REMARQUE: '',
//     IS_DOUBLE: '',
//     DEFAUT: false
//   };

//    constructor(private settingService: SettingService) { }

//    onSubmit() {
//     this.settingService.addUnity(this.uunity).subscribe(
//        response => {
//          console.log('UNITY added successfully', response);
//          this.uunity = { UNITE_LIBELE: '', REMARQUE: '', IS_DOUBLE: '', DEFAUT: false }; // Reset the form
//        },
//        error => console.error('Error adding UNITY', error)
//      );
//    } 

// }
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService } from '../../setting.service';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ListUnityComponent } from '../list-unity/list-unity.component';

@Component({
  selector: 'app-add-unity',
  standalone: true,
  imports: [CommonModule, FormsModule, ListUnityComponent,AngularSvgIconModule],
  templateUrl: './add-unity.component.html',
  styleUrl: './add-unity.component.scss',
  providers: [SettingService]
})
export class AddUnityComponent {
  isModalOpen = false;

  Unite: any = {};

 

  constructor(private settingService: SettingService) { }

  onSubmit() {
    this.settingService.addUnity(this.Unite).subscribe(
      response => {
        console.log('Unite added successfully', response);

        this.isModalOpen=false
      },
      error => console.error('Error adding Unite', error)
    );
  }




  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

}
