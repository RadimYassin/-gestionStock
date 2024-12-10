// import { Component, OnInit } from '@angular/core';
// import { SettingService } from '../../setting.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-list-depot',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './list-depot.component.html',
//   styleUrls: ['./list-depot.component.scss']
// })
// export class ListDepotComponent implements OnInit {
//   depotData: any[] = [];
//   editDepot: any = null;

//   constructor(private settingService: SettingService) { }

//   ngOnInit(): void {
//     // Fetch depot data on component initialization
//     this.settingService.getDepot().subscribe(
//       data => this.depotData = data.data,
//       error => console.error('Error fetching depot data', error)
//     );

//     // Optionally, subscribe to depot updates if available
//     this.settingService.getDepotUpdates().subscribe(
//       data => this.depotData = data.data,
//       error => console.error('Error updating depot data', error)
//     );
//   }

//   deleteDepot(id: number): void {
//     this.settingService.deleteDepot(id).subscribe(
//       () => {
//         console.log('Depot deleted successfully');
//         // Remove the deleted depot from the list
//         this.depotData = this.depotData.filter(depot => depot.DEPOT_ID !== id);
//       },
//       error => console.error('Error deleting depot', error)
//     );
//   }import { Component, OnInit } from '@angular/core';
//   import { SettingService } from '../../setting.service';
//   import { CommonModule } from '@angular/common';
//   import { FormsModule } from '@angular/forms';
  
//   @Component({
//     selector: 'app-list-depot',
//     standalone: true,
//     imports: [CommonModule, FormsModule],
//     templateUrl: './list-depot.component.html',
//     styleUrls: ['./list-depot.component.scss']
//   })
//   export class ListDepotComponent implements OnInit {
//     depotData: any[] = [];
//     editDepot: any = null;
  
//     constructor(private settingService: SettingService) { }
  
//     ngOnInit(): void {
//       // Fetch depot data on component initialization
//       this.settingService.getDepot().subscribe(
//         data => this.depotData = data.data,
//         error => console.error('Error fetching depot data', error)
//       );
  
//       // Optionally, subscribe to depot updates if available
//       this.settingService.getDepotUpdates().subscribe(
//         data => this.depotData = data.data,
//         error => console.error('Error updating depot data', error)
//       );
//     }
  
//     deleteDepot(id: number): void {
//       this.settingService.deleteDepot(id).subscribe(
//         () => {
//           console.log('Depot deleted successfully');
//           // Remove the deleted depot from the list
//           this.depotData = this.depotData.filter(depot => depot.DEPOT_ID !== id);
//         },
//         error => console.error('Error deleting depot', error)
//       );
//     }
  
//     setEditDepot(depot: any): void {
//       this.editDepot = { ...depot }; // Create a copy for editing
//     }
  
//     updateDepot(): void {
//       this.settingService.updateDepot(this.editDepot).subscribe(
//         () => {
//           console.log('Depot updated successfully');
//           // Update the depot data in the list
//           const index = this.depotData.findIndex(d => d.DEPOT_ID === this.editDepot.DEPOT_ID);
//           if (index > -1) {
//             this.depotData[index] = this.editDepot;
//           }
//           this.editDepot = null; // Clear the edit form
//         },
//         error => console.error('Error updating depot', error)
//       );
//     }
  
//     cancelEdit(): void {
//       this.editDepot = null; // Clear the edit form
//     }
//   }
  

//   setEditDepot(depot: any): void {
//     this.editDepot = { ...depot }; // Create a copy for editing
//   }

//   updateDepot(): void {
//     this.settingService.updateDepot(this.editDepot).subscribe(
//       () => {
//         console.log('Depot updated successfully');
//         // Update the depot data in the list
//         const index = this.depotData.findIndex(d => d.DEPOT_ID === this.editDepot.DEPOT_ID);
//         if (index > -1) {
//           this.depotData[index] = this.editDepot;
//         }
//         this.editDepot = null; // Clear the edit form
//       },
//       error => console.error('Error updating depot', error)
//     );
//   }

//   cancelEdit(): void {
//     this.editDepot = null; // Clear the edit form
//   }
// }


import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../setting.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-depot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-depot.component.html',
  styleUrls: ['./list-depot.component.scss']
})
export class ListDepotComponent implements OnInit {

  searchTerm: string = '';  // Holds the search term input by the user
  dropdownStates: { [key: string]: boolean } = {};
  isModalOpen = false;
  isConfirmationModalOpen = false;
  selectedDepot: any = {};
  depotData: any[] = [];
  filteredTtvaData: any[] = [];  // Holds the filtered data
  editTtva: any = null;
  DepotToDelete: any = null;  // Holds the TVA item to delete

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getDepot().subscribe(
      data => {
        this.depotData = data.data;
        this.filteredTtvaData = this.depotData;  // Initially display all data
      },
      error => console.error('Error fetching data', error)
    );

    this.settingService.getDepotUpdates().subscribe(
      data => {
        this.depotData = data.data;
        this.applyFilter();  // Apply the filter after data updates
      },
      error => console.error('Error updating data', error)
    );
  }

  applyFilter(): void {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.filteredTtvaData = this.depotData.filter(item =>
      String(item.DEPOT_CODE).toLowerCase().includes(lowerCaseSearchTerm) ||
      String(item.DEPOT_LIBELE).toLowerCase().includes(lowerCaseSearchTerm) ||
      String(item.DEPOT_EMPLACEMENT).toLowerCase().includes(lowerCaseSearchTerm)
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
    this.selectedDepot = { ...item }; // Copy the selected item data
    this.isModalOpen = true;
    this.dropdownStates = {}; // Close all dropdowns first

  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  updateTVA(): void {
    this.settingService.updateDepot(this.selectedDepot).subscribe(
      data => {
        console.log('TVA updated:', data);
        this.isModalOpen = false;
        this.ngOnInit(); // Refresh the list
      },
      error => console.error('Error updating TVA', error)
    );
  }

  openConfirmationModal(item: any): void {
    this.DepotToDelete = item;  // Set the item to be deleted
    this.isConfirmationModalOpen = true;
    this.dropdownStates = {}; // Close all dropdowns first

  }

  closeConfirmationModal(): void {
    this.isConfirmationModalOpen = false;
    this.DepotToDelete = null;  // Clear the item to delete
  }

  confirmDeleteTtva(): void {
    if (this.DepotToDelete) {
      this.settingService.deleteDepot(this.DepotToDelete.DEPOT_ID).subscribe(
        () => {
          console.log('TTVA deleted successfully');
          this.isConfirmationModalOpen = false;
          this.DepotToDelete = null;
          this.ngOnInit(); // Refresh the list
        },
        error => console.error('Error deleting TTVA', error)
      );
    }
  }

}
