import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      CLIENT_CODE: ['', Validators.required],
      NOM: ['', Validators.required],
      QUANTITE: [0, [Validators.min(0)]],
      PRIX_ACHAT: [0, [Validators.min(0)]],
      PRIX_BASE1: [0, [Validators.min(0)]],
      PRIX_BASE2: [0, [Validators.min(0)]],
      PRIX_REVIENT: [0, [Validators.min(0)]],
      FRAIS_DIVERS: [0, [Validators.min(0)]],
      MARGE: [0, [Validators.min(0), Validators.max(100)]],
      PRIX_VENTE: [0, [Validators.min(0)]],
      PRIX_VENTE_MINIMUM: [0, [Validators.min(0)]],
      TTVA: [0, [Validators.min(0), Validators.max(100)]],
      STOCK_SEUIL: [0, [Validators.min(0)]],
      CATEGORIE_ID: [0, Validators.min(0)],
      UNITE_ID: [0, Validators.min(0)],
      INVENTORIE: [false],
      is_active: [true]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    // if (this.clientForm.valid) {
    //   this.clientService.addClient(this.clientForm.value).subscribe(response => {
    //     console.log('Client added successfully', response);
    //     this.router.navigate(["/Vente/listClient"])
    //   }, error => {
    //     console.error('Error adding client', error);
  //     });
  //   }
   }

}
