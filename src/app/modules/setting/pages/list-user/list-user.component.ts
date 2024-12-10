import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../setting.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss'
})
export class ListUserComponent {
  searchTerm: string = '';  // Holds the search term input by the user
  userData: any[] = [];
  filteredData: any[] = [];  // Holds the filtered data

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getUsers().subscribe(
      data => {
        this.userData = data.data;
        this.filteredData = this.userData;  // Initially display all data
      },
      error => console.error('Error fetching data', error)
    );
  }

  applyFilter(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredData = this.userData.filter(item =>
      String(item.NOM).toLowerCase().includes(lowerCaseSearchTerm) ||
      String(item.LOGIN).toLowerCase().includes(lowerCaseSearchTerm) 
    );
  }

}
