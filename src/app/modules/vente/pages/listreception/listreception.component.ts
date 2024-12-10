import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReceptionService } from '../reception/reception.service'; 
import { FournisseurService } from 'src/app/modules/achat/pages/fournisseur/fournisseur.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-listreception',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularSvgIconModule
  ],
  templateUrl: './listreception.component.html',
  styleUrls: ['./listreception.component.scss']
})
export class ListreceptionComponent implements OnInit {
  receptionsData: any[] = [];
  filteredData: any[] = [];
  filterForm: FormGroup;

  fournisseur: any[] = [];
  
  // Pagination properties
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;

  // Dropdown tracking
  openDropdownId: number | null = null;

  constructor(
    private receptionService: ReceptionService,
    private fb: FormBuilder,
    private fournisseurService: FournisseurService
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      filterBy: ['Date'],
      option: [''],
      fournisseur: [''],
      pageSize: [10]  // Default value
    });
  }

  ngOnInit(): void {
    this.loadReceptions();
    this.loadFournisseurs();
    
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  toggleDropdown(itemId: number): void {
    this.openDropdownId = this.openDropdownId === itemId ? null : itemId;
  }

  isDropdownOpen(itemId: number): boolean {
    return this.openDropdownId === itemId;
  }

  loadReceptions(): void {
    this.receptionService.getReceptions().subscribe(
      response => {
        if (response && response.data && response.data.data) {
          this.receptionsData = response.data.data;
          this.applyFilters();
        }
      },
      error => console.error('Error fetching receptions', error)
    );
  }

  loadFournisseurs(): void {
    this.fournisseurService.getFournisseur().subscribe(
      data => {
        this.fournisseur = data.data.data;
      },
      error => console.error('Error fetching fournisseurs', error)
    );
  }

  applyFilters(): void {
    const { startDate, endDate, filterBy, option, fournisseur, pageSize } = this.filterForm.value;

    this.filteredData = this.receptionsData.filter(item => {
      const matchesDate = !startDate || !endDate || 
                         (new Date(item.RECEPTION_DATE) >= new Date(startDate) && 
                          new Date(item.RECEPTION_DATE) <= new Date(endDate));
      const matchesFournisseur = !fournisseur || item.FOURNISSEUR_NAME.includes(fournisseur);

      return matchesDate && matchesFournisseur;
    });

    this.pageSize = pageSize;  // Update pageSize
    this.totalItems = this.filteredData.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.currentPage = 1;
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredData.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  

  resetFilters(): void {
    this.filterForm.reset({
      startDate: '',
      endDate: '',
      filterBy: 'Date',
      option: '',
      fournisseur: '',
      pageSize: 10  // Reset pageSize to default value
    });
    this.applyFilters();  // Reapply filters to reset pagination
  }
}