import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LivraisonService } from '../livraison/livraison.service';
import { FournisseurService } from 'src/app/modules/achat/pages/fournisseur/fournisseur.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { Router } from '@angular/router';


@Component({
  selector: 'app-listlivraison',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularSvgIconModule
  ],
  templateUrl: './listlivraison.component.html',
  styleUrls: ['./listlivraison.component.scss']
})
export class ListlivraisonComponent implements OnInit {
  livraisonsData: any[] = [];
  filteredData: any[] = [];
  filterForm: FormGroup;

  fournisseur: any[] = [];
  // Dropdown tracking
  openDropdownId: number | null = null;
  // Pagination properties
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(
    private livraisonService: LivraisonService,
    private fb: FormBuilder,
    private Fournisseur: FournisseurService,

    private router: Router
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
    this.livraisonService.getLivraison().subscribe(
      response => {
        if (response && response.data && response.data.data) {
          this.livraisonsData = response.data.data;
          this.applyFilters();
        }
      },
      error => console.error('Error fetching livraisons', error)
    );

    this.Fournisseur.getFournisseur().subscribe(data => {
      this.fournisseur = data.data.data;
    });

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






  applyFilters(): void {
    const { startDate, endDate, filterBy, option, fournisseur, pageSize } = this.filterForm.value;

    this.filteredData = this.livraisonsData.filter(item => {
      const matchesDate = !startDate || !endDate || 
                         (new Date(item.LIVRAISON_DATE) >= new Date(startDate) && 
                          new Date(item.LIVRAISON_DATE) <= new Date(endDate));
      const matchesFournisseur = !fournisseur || item.CLIENT_NOM.includes(fournisseur);

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


  navigateEdit(itemId: number) {
    this.router.navigate(['/Vente/editeLivraison', itemId]);
  }
}
