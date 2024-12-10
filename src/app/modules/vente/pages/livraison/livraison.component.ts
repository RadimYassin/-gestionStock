import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { SettingService } from 'src/app/modules/setting/setting.service';
import { LivraisonService } from './livraison.service';

interface Produit {
  refCab: string;
  article: string;
  quantite: number;
  prixUnitaire: number;
  gratuit: number;
  TotalRemise: number;
  unity: string;
  TTVA: number;
}

@Component({
  standalone: true,
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.scss'],
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule here
  ],
})
export class LivraisonComponent implements OnInit {

  formModel = {
    REFERENCE: '',
    LIVRAISON_DATE: '',
    CLIENT_ID: '',
    CLIENT_NOM: '',
    EmployeeId: '',
    tarif: '',
    DEPOT_ID: '',
    VALIDATION: false,
    VALIDATION_DATE: '',
    bonOrigine: '',
    methode: '',
    CONDITIONS_REGLEMENT_ID: '',
    ECHEANCE: '',
    MONTANT_TOTAL: 0,
    TotalHT: 0,
    TOTAL_TVA: 0,
    details: [] as Produit[]
  };

  produit: Produit = {
    refCab: '',
    article: '',
    quantite: 0,
    prixUnitaire: 0,
    gratuit: 0,
    TotalRemise: 0,
    unity: '',
    TTVA: 0
  };

  users: any[] = [];
  livraison: any[] = [];
  Tva: any[] = [];
  Unity: any[] = [];
  methode: any[] = [];

  depots: any[] = [];
  venteConditions: any[] = [];
  articles: any[] = [];

  constructor(private setting: SettingService, private Livraison: LivraisonService) { }

  ngOnInit(): void {
    this.setting.getUsers().subscribe(data => {
      this.users = data.data;
    });

    this.setting.getDepot().subscribe(data => {
      this.depots = data.data;

    });

    this.setting.getVente_condition_paiment().subscribe(data => {
      this.venteConditions = data.data;
    });

    this.setting.getArticle().subscribe(data => {
      this.articles = data.data.data;
    });

    this.setting.getTtva().subscribe(data => {
      this.Tva = data.data;
    });

    this.setting.getUnity().subscribe(data => {
      this.Unity = data.data;
    });

    this.setting.getPaymentMode().subscribe(data => {
      this.methode = data.data;
    });
  }

  addProduit() {
    // Add the current produit to the details array
    this.formModel.details.push({ ...this.produit });
    // Recalculate totals after adding the product
    this.calculateTotals();
    // Reset the produit form
    this.resetProduitForm();
  }

  removeProduit(index: number) {
    // Remove the product from the details array
    this.formModel.details.splice(index, 1);
    // Recalculate totals after removing the product
    this.calculateTotals();
  }

  calculateTotals() {
    this.formModel.TotalHT = this.formModel.details.reduce((acc, cur) => acc + (cur.prixUnitaire * cur.quantite), 0);
    this.formModel.TOTAL_TVA = this.formModel.details.reduce((acc, cur) => acc + ((cur.TTVA / 100) * cur.prixUnitaire * cur.quantite), 0);
    this.formModel.MONTANT_TOTAL = this.formModel.TotalHT + this.formModel.TOTAL_TVA;
  }

  resetProduitForm() {
    this.produit = {
      refCab: '',
      article: '',
      quantite: 0,
      prixUnitaire: 0,
      gratuit: 0,
      TotalRemise: 0,
      unity: '',
      TTVA: 0
    };

  }

  onSubmit() {
    console.log(this.formModel);

    this.Livraison.addLivraison(this.formModel).subscribe((data)=>{
      console.log(data);
      
    })
    // Your submission logic here
  }
}
