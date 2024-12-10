import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../fournisseur/fournisseur.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-fournisseur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent implements OnInit {

  constructor(private fournisseurService: FournisseurService) {}

  searchQuery = '';
  fournisseurs: any[] = [];
  isModalOpen = false;
  selectedFournisseur: any = {};

  ngOnInit(): void {
    this.fournisseurService.getFournisseur().subscribe(
      (data) => {
        this.fournisseurs = data.data.data;
        console.log('Fournisseurs loaded:', this.fournisseurs);
      },
      error => console.error('Error loading fournisseurs', error)
    );
  }

  deletefournisseur(id: number): void {
    this.fournisseurService.deleteTtva(id).subscribe(
      () => {
        console.log('fournisseur deleted successfully');
        // Optionally refresh the list
        this.ngOnInit();
      },
      error => console.error('Error deleting fournisseur', error)
    );
  }

  openModal(fournisseur: any) {
    this.selectedFournisseur = { ...fournisseur };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  updateFournisseur() {
    this.fournisseurService.updateFournisseur(this.selectedFournisseur).subscribe(
      (data) => {
        console.log('Fournisseur updated:', data);
        this.ngOnInit(); // Optionally refresh the list after update
      },
      error => console.error('Error updating fournisseur', error)
    );
    this.closeModal();
  }

  filteredFournisseurs() {
    return this.fournisseurs.filter(fournisseur =>
      fournisseur.FOURNISSEUR_CODE.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      fournisseur.NOM.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      fournisseur.VILLE.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      fournisseur.PATENTE.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
