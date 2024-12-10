import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivraisonService } from '../livraison/livraison.service'; 
import { SettingService } from 'src/app/modules/setting/setting.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  selector: 'app-edite-livraison',
  templateUrl: './edite-livraison.component.html',
  styleUrls: ['./edite-livraison.component.scss'],
  imports:[
    CommonModule,
    FormsModule
  ]
})

export class EditeLivraisonComponent implements OnInit {

  id: string | null = null;
  formModel: any = {}; // Replace with your form model interface/type

  // Add any required data sources (e.g., users, depots, etc.)
  users: any[] = [];
  depots: any[] = [];
  articles: any[] = [];
  Tva: any[] = [];
  Unity: any[] = [];
  methode: any[] = [];
  venteConditions: any[] = [];
  livraisonData: any = {};

  constructor(
    private route: ActivatedRoute,
    private livraisonService: LivraisonService,
    private settingService: SettingService // Inject the setting service
  ) { }
  

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      const numericId = Number(this.id); // Convert the string ID to a number
  
      // Fetch livraison data
      this.livraisonService.getLivraisonItem(numericId).subscribe(
        (data) => {
          this.livraisonData = { ...data.data };
          this.formModel = {
            reference: this.livraisonData.REFERENCE || "",
            livraisonDate: this.livraisonData.LIVRAISON_DATE ? this.formatDate(this.livraisonData.LIVRAISON_DATE) : '',
            client: this.livraisonData.CLIENT_NOM || "",
            employe: this.livraisonData.EmployeeId || 0,
            depot: this.livraisonData.DEPOT_ID || 0,
            validation: this.livraisonData.VALIDATION === 1,
            validationDate: this.livraisonData.VALIDATION_DATE ? this.formatDate(this.livraisonData.VALIDATION_DATE) : '',
            bonOrigine: this.livraisonData.REFERENCE_ORIGINE || "",
            methode: this.livraisonData.METHODE_LIVRAISON_ID || 0,
            condition: this.livraisonData.CONDITIONS_REGLEMENT_ID || 0,
            echeance: !!this.livraisonData.ECHEANCE,
            echeanceDate: this.livraisonData.ECHEANCE ? this.formatDate(this.livraisonData.ECHEANCE) : '',
          };
          console.log('Fetched data:', this.formModel);
        },
        (error) => {
          console.error('Error fetching livraison data:', error);
        }
      );
  
      // Fetch users
      this.settingService.getUsers().subscribe(
        (data) => {
          this.users = data.data;
          console.log('Fetched users:', this.users);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
  
      // Fetch depots
      this.settingService.getDepot().subscribe(
        (data) => {
          this.depots = data.data;
          console.log('Fetched depots:', this.depots);
        },
        (error) => {
          console.error('Error fetching depots:', error);
        }
      );
  
      // Fetch sale conditions
      this.settingService.getVente_condition_paiment().subscribe(
        (data) => {
          this.venteConditions = data.data;
          console.log('Fetched sale conditions:', this.venteConditions);
        },
        (error) => {
          console.error('Error fetching sale conditions:', error);
        }
      );
    }
  }
  

  formatDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2); 
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  

  onSubmit(): void {
    console.log('Form submitted:', this.formModel);
    
  }
}