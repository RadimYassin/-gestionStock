import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../client.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  standalone: true,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  imports: [ReactiveFormsModule, CommonModule] 
})
export class ClientComponent implements OnInit {
  clientForm: FormGroup;
  categories = [
    { id: 1, name: '15' },
    { id: 2, name: '16' },
    { id: 3, name: '17' },
    // Add more categories as needed
  ];

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router) {
    this.clientForm = this.fb.group({
      CLIENT_ID: [null],
      CLIENT_CODE: ['', Validators.required],
      NOM: ['', Validators.required],
      NOM2: [''],
      ADRESSE: [''],
      VILLE: [''],
      TEL: [''],
      GSM: [''],
      FAXE: [''],
      CONTACT: [''],
      MAIL: [''],
      LOGO: [null],
      IF: [''],
      PATENTE: [''],
      RC: [''],
      CNSS: [''],
      SEUIL_CREDIT: [0, [Validators.min(0)]],
      OLD_CREDIT: [0, [Validators.min(0)]],
      CLIENT_CATEGORIE_ID: [0, Validators.min(0)],
      INS_USER: [{ value: 'Admin', disabled: true }],
      INS_DATE: [{ value: new Date(), disabled: true }],
      UPD_USER: [{ value: 'Admin', disabled: true }],
      UPD_DATE: [{ value: new Date(), disabled: true }],
      DEFAUT: [0],
      ACTIF: [true],
      ICE: [''],
      VendorId: [null],
      CONTACT_ID: [1],
      IS_CONFRERE: [null]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.clientForm.valid) {

      
      this.clientService.addClient(this.clientForm.value).subscribe(response => {
        console.log('Client added successfully', response);
        this.router.navigate(["/Vente/listClient"])
      }, error => {
        console.error('Error adding client', error);
      });
    }
  }
}
