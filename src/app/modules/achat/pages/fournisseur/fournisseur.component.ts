import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FournisseurService } from './fournisseur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fournisseur',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './fournisseur.component.html',
  styleUrl: './fournisseur.component.scss'
})
export class FournisseurComponent {

constructor(private Fournisseur:FournisseurService,private router:Router){}

  formModel = {
    "NOM": " ",
    "ADRESSE": "",
    "VILLE": "",
    "TEL": "",
    "FAXE": "",
    "CONTACT": "",
    "MAIL": "",
    "IF": "",
    "PATENTE": "",
    "RC": "",
    "CNSS": "",
    "ICE": "",
   "FOURNISSEUR_CODE":"",
"FOURNISSEUR_CATEGORIE_ID":""
  };

  onSubmit(){ 

          
this.Fournisseur.AddFournisseur(this.formModel).subscribe((data)=>{


this.router.navigate(['/Achat/listFournisseur'])  
})

  }
}
