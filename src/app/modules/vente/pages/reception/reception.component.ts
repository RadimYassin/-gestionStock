
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingService } from 'src/app/modules/setting/setting.service';
import { ReceptionService } from './reception.service';
import { FournisseurService } from 'src/app/modules/achat/pages/fournisseur/fournisseur.service';


@Component({
  selector: 'app-livraison',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.scss']
})
export class ReceptionComponent implements OnInit {


  formModel = {
    REFERENCE: '',
    REFERENCE_ORIGINE: '',
    RECEPTION_DATE:"",
    DATE_ORIGINE:"",
    FOURNISSEUR_CODE: '',
    FOURNISSEUR_NAME: '',
    EmployeeId: '',
    REFERENCE_FACTURE:
    ""  , 
     DEPOT_NAME: '',
    VALIDATION: false,
    VALIDATION_DATE: '',
    COMMANDE_REF: '',
    methode: '',
    Expression:"",
    ECHEANCE: '',
    MONTANT_TOTAL: 0 as number,   // Update to number
    TotalHT: 0 as number,         // Update to number
    TOTAL_TVA: 0 as number,       // Update to number
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

  fournisseur: any[] = [];
  ReceptionData: any[] = [];

  livraison: any[] = [];

  Tva: any[] = [];
  Unity: any[] = [];

methode:any[]=[]
  depots: any[] = [];
  venteConditions: any[] = [];
  articles: any[] = [];

  constructor(private setting: SettingService,private Reception :ReceptionService   ,private  Fournisseur:FournisseurService) { }

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
this.Fournisseur.getFournisseur().subscribe(data=>{

  this.fournisseur=data.data.data
  
})
    


  }
  

  calculateTotals(): void {
    const quantite = this.formModel.quantite || 0;
    const prixUnitaire = this.formModel.prixUnitaire || 0;
    const gratuit = this.formModel.gratuit || 0;
    const TotalRemise = this.formModel.TotalRemise || 0;
    const TTVA = this.formModel.TTVA || 0;

    const baseAmount = (quantite - gratuit) * prixUnitaire;
    this.formModel.TotalHT = baseAmount - TotalRemise;
    this.formModel.TOTAL_TVA = this.formModel.TotalHT * (TTVA / 100);
    this.formModel.MONTANT_TOTAL = this.formModel.TotalHT + this.formModel.TOTAL_TVA;
  }


  
  onSubmit() {
    this.calculateTotals(); // Ensure totals are calculated before submission
  
    const ReceptionData = {
      REFERENCE: this.formModel.REFERENCE,
      REFERENCE_ORIGINE: this.formModel.REFERENCE_ORIGINE,
      DATE_ORIGINE: this.formModel.DATE_ORIGINE,
      COMMANDE_REF: this.formModel.COMMANDE_REF,

      RECEPTION_DATE:this.formModel.RECEPTION_DATE,
      FOURNISSEUR_CODE: this.formModel.FOURNISSEUR_CODE,
      FOURNISSEUR_NAME: this.formModel.FOURNISSEUR_NAME,
      EmployeeId: this.formModel.EmployeeId,
      DEPOT_NAME: this.formModel.DEPOT_NAME,
      VALIDATION: this.formModel.VALIDATION,
      VALIDATION_DATE: this.formModel.VALIDATION_DATE,
      ECHEANCE: this.formModel.ECHEANCE,
      MONTANT_TOTAL: this.formModel.MONTANT_TOTAL,
      TotalHT: this.formModel.TotalHT,
      TOTAL_TVA: this.formModel.TOTAL_TVA,

      REFERENCE_FACTURE:this.formModel.REFERENCE_FACTURE
    };

this.Reception.addReception(ReceptionData).subscribe(

  (data) => {
  

      
      this.ReceptionData.push(data.data);  
      
  }
  
  
)
    

  }

}
