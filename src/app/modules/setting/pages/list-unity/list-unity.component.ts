
import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../setting.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-unity',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './list-unity.component.html',
  styleUrl: './list-unity.component.scss'
})
export class ListUnityComponent implements OnInit {

  searchTerm: string = '';  // Holds the search term input by the user
  dropdownStates: { [key: string]: boolean } = {};
  isModalOpen = false;
  isConfirmationModalOpen = false;
  selectedUnity: any = {};
  unityData: any[] = [];
  filteredData: any[] = [];  // Holds the filtered data
  editTtva: any = null;
  ToDelete: any = null;  // Holds the TVA item to delete

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getUnity().subscribe(
      data => {
        this.unityData = data.data;
        this.filteredData = this.unityData;  // Initially display all data
      },
      error => console.error('Error fetching data', error)
    );

    this.settingService.getUnityUpdates().subscribe(
      data => {
        this.unityData = data.data;
        this.applyFilter();  // Apply the filter after data updates
      },
      error => console.error('Error updating data', error)
    );
  }

  applyFilter(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredData = this.unityData.filter(item =>
      String(item.UNITE_LIBELE).toLowerCase().includes(lowerCaseSearchTerm) ||
      String(item.REMARQUE).toLowerCase().includes(lowerCaseSearchTerm) 
    );
  }
  

  toggleDropdown(dropdown: string, id: number): void {
    const key = `${dropdown}-${id}`;
    if (this.dropdownStates[key]) {
      this.dropdownStates[key] = false; // Close the dropdown if it's already open
    } else {
      this.dropdownStates = {}; // Close all dropdowns first
      this.dropdownStates[key] = true; // Open the clicked dropdown
    }
  }

  isDropdownOpen(dropdown: string, id: number): boolean {
    const key = `${dropdown}-${id}`;
    return this.dropdownStates[key] || false;
  }

  openModal(item: any): void {
    this.selectedUnity = {...item }; // Copy the selected item data
    this.isModalOpen = true;
    this.dropdownStates = {}; // Close all dropdowns first

  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  update(): void {
    this.settingService.updateUnity(this.selectedUnity).subscribe(
      data => {
        console.log('TVA updated:', data);
        this.isModalOpen = false;
        this.ngOnInit(); // Refresh the list
      },
      error => console.error('Error updating TVA', error)
    );
  }

  openConfirmationModal(item: any): void {
    this.ToDelete = item;  // Set the item to be deleted
    this.isConfirmationModalOpen = true;
    this.dropdownStates = {}; // Close all dropdowns first

  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
    this.ToDelete = null;  // Clear the item to delete
  }

  confirmDelete(): void {
    if (this.ToDelete) {
      this.settingService.deleteUnity(this.ToDelete.UNITE_ID).subscribe(
        () => {
          this.isConfirmationModalOpen = false;
          this.ToDelete = null;
          this.ngOnInit(); // Refresh the list
        },
        error => console.error('Error deleting ', error)
      );
    }
  }

}
