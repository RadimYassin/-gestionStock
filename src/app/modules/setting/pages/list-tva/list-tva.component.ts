import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../setting.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-tva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-tva.component.html',
  styleUrls: ['./list-tva.component.scss']
})
export class ListTvaComponent implements OnInit {

  searchTerm: string = '';  // Holds the search term input by the user
  dropdownStates: { [key: string]: boolean } = {};
  isModalOpen = false;
  isConfirmationModalOpen = false;
  selectedTVA: any = {};
  ttvaData: any[] = [];
  filteredTtvaData: any[] = [];  // Holds the filtered data
  editTtva: any = null;
  tvaToDelete: any = null;  // Holds the TVA item to delete

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getTtva().subscribe(
      data => {
        this.ttvaData = data.data;
        this.filteredTtvaData = this.ttvaData;  // Initially display all data
      },
      error => console.error('Error fetching data', error)
    );

    this.settingService.getTtvaUpdates().subscribe(
      data => {
        this.ttvaData = data.data;
        this.applyFilter();  // Apply the filter after data updates
      },
      error => console.error('Error updating data', error)
    );
  }

  applyFilter(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredTtvaData = this.ttvaData.filter(item =>
      String(item.TTVA).toLowerCase().includes(lowerCaseSearchTerm) ||
      String(item.LIBELE).toLowerCase().includes(lowerCaseSearchTerm) ||
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
    this.selectedTVA = { ...item }; // Copy the selected item data
    this.isModalOpen = true;
    this.dropdownStates = {}; // Close all dropdowns first

  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  updateTVA(): void {
    this.settingService.updateTtva(this.selectedTVA).subscribe(
      data => {
        console.log('TVA updated:', data);
        this.isModalOpen = false;
        this.ngOnInit(); // Refresh the list
      },
      error => console.error('Error updating TVA', error)
    );
  }

  openConfirmationModal(item: any): void {
    this.tvaToDelete = item;  // Set the item to be deleted
    this.isConfirmationModalOpen = true;
    this.dropdownStates = {}; // Close all dropdowns first

  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
    this.tvaToDelete = null;  // Clear the item to delete
  }

  confirmDeleteTtva(): void {
    if (this.tvaToDelete) {
      this.settingService.deleteTtva(this.tvaToDelete.TTVA).subscribe(
        () => {
          console.log('TTVA deleted successfully');
          this.isConfirmationModalOpen = false;
          this.tvaToDelete = null;
          this.ngOnInit(); // Refresh the list
        },
        error => console.error('Error deleting TTVA', error)
      );
    }
  }

}
