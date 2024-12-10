import { NzMessageService } from 'ng-zorro-antd/message';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule, NzCustomColumn } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClientService } from '../../client.service';

interface Person {
  CLIENT_ID: number;
  CLIENT_CODE: string;
  NOM: string;
  NOM2?: string;
  ADRESSE: string;
  VILLE: string;
  TEL: string;
  GSM?: string;
  FAXE?: string;
  CONTACT?: string;
  MAIL: string;
  LOGO?: string | null;
  IF?: string;
  PATENTE?: string;
  RC?: string;
  CNSS?: string;
  SEUIL_CREDIT?: string;
  OLD_CREDIT?: string;
  CLIENT_CATEGORIE_ID?: number;
  INS_USER?: string;
  INS_DATE?: string;
  UPD_USER?: string;
  UPD_DATE?: string;
  DEFAUT?: number;
  ACTIF?: number;
  ICE?: string;
  VendorId?: number | null;
  CONTACT_ID?: number;
  IS_CONFRERE?: boolean | null;
}
interface CustomColumn extends NzCustomColumn {
  name: string;
  required?: boolean;
  position?: 'left' | 'right';
  width: number;
}

@Component({
  selector: 'app-list-client',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    NzModalModule,
    FormsModule,
    NzGridModule,
    AngularSvgIconModule,
    DragDropModule
  ],
  templateUrl: './listclient.component.html',
  styleUrls: ['./listclient.component.scss']
})
export class ListClientComponent implements OnInit {
  listOfData: Person[] = [];
  filteredData: Person[] = [];
  searchValue = '';

  customColumn: CustomColumn[] = [
    { name: 'Client Code', value: 'CLIENT_CODE', default: true, required: true, position: 'left', width: 100 },
    { name: 'Name', value: 'NOM', default: true, required: true, position: 'left', width: 100 },
    { name: 'Name 2', value: 'NOM2', default: false, position: 'left', width: 100 },
    { name: 'Address', value: 'ADRESSE', default: true, position: 'left', width: 100 },
    { name: 'City', value: 'VILLE', default: true, position: 'left', width: 100 },
    { name: 'Phone', value: 'TEL', default: true, position: 'left', width: 100 },
    { name: 'Mobile', value: 'GSM', default: false, position: 'left', width: 100 },
    { name: 'Fax', value: 'FAXE', default: false, position: 'left', width: 100 },
    { name: 'Contact', value: 'CONTACT', default: false, position: 'left', width: 100 },
    { name: 'Email', value: 'MAIL', default: true, position: 'left', width: 100 },
    { name: 'Logo', value: 'LOGO', default: false, position: 'left', width: 100 },
    { name: 'IF', value: 'IF', default: false, position: 'left', width: 100 },
    { name: 'Patente', value: 'PATENTE', default: false, position: 'left', width: 100 },
    { name: 'RC', value: 'RC', default: false, position: 'left', width: 100 },
    { name: 'CNSS', value: 'CNSS', default: false, position: 'left', width: 100 },
    { name: 'Credit Limit', value: 'SEUIL_CREDIT', default: false, position: 'left', width: 100 },
    { name: 'Old Credit', value: 'OLD_CREDIT', default: false, position: 'left', width: 100 },
    { name: 'Client Category ID', value: 'CLIENT_CATEGORIE_ID', default: false, position: 'left', width: 100 },
    { name: 'Insert User', value: 'INS_USER', default: false, position: 'left', width: 100 },
    { name: 'Insert Date', value: 'INS_DATE', default: false, position: 'left', width: 100 },
    { name: 'Update User', value: 'UPD_USER', default: false, position: 'left', width: 100 },
    { name: 'Update Date', value: 'UPD_DATE', default: false, position: 'left', width: 100 },
    { name: 'Default', value: 'DEFAUT', default: false, position: 'left', width: 100 },
    { name: 'Active', value: 'ACTIF', default: false, position: 'left', width: 100 },
    { name: 'ICE', value: 'ICE', default: false, position: 'left', width: 100 },
    { name: 'Vendor ID', value: 'VendorId', default: false, position: 'left', width: 100 },
    { name: 'Contact ID', value: 'CONTACT_ID', default: false, position: 'left', width: 100 },
    { name: 'Is Colleague', value: 'IS_CONFRERE', default: false, position: 'left', width: 100 },
    { name: '', value: 'action', default: true, required: true, position: 'right', width: 100 }  ];

  isVisible: boolean = false;
  title: CustomColumn[] = [];
  footer: CustomColumn[] = [];
  fix: CustomColumn[] = [];
  notFix: CustomColumn[] = [];

  constructor(private clientService: ClientService, private cdr: ChangeDetectorRef, private message: NzMessageService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe(response => {
      if (response.success) {
        this.listOfData = response.data;
        this.filteredData = this.listOfData;
      }
      console.log(this.listOfData);
    });

    this.title = this.customColumn.filter(item => item.position === 'left' && item.required);
    this.footer = this.customColumn.filter(item => item.position === 'right' && item.required);
    this.fix = this.customColumn.filter(item => item.default && !item.required);
    this.notFix = this.customColumn.filter(item => !item.default && !item.required);
  }

  getColumnValue(data: Person, columnValue: string): any {
    return data[columnValue as keyof Person];
  }

  hasActionColumn(): boolean {
    return this.customColumn.some(col => col.value === 'action' && col.default);
  }

  search(): void {
    this.filteredData = this.listOfData.filter(item => {
      return Object.keys(item).some(key => {
        return item[key as keyof Person]?.toString().toLowerCase().includes(this.searchValue.toLowerCase());
      });
    });
  }

  drop(event: CdkDragDrop<CustomColumn[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.fix = this.fix.map(item => {
      item.default = true;
      return item;
    });
    this.notFix = this.notFix.map(item => {
      item.default = false;
      return item;
    });
    this.cdr.markForCheck();
  }

  deleteCustom(value: CustomColumn, index: number): void {
    value.default = false;
    this.notFix = [...this.notFix, value];
    this.fix.splice(index, 1);
    this.cdr.markForCheck();
  }

  addCustom(value: CustomColumn, index: number): void {
    value.default = true;
    this.fix = [...this.fix, value];
    this.notFix.splice(index, 1);
    this.cdr.markForCheck();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.customColumn = [...this.title, ...this.fix, ...this.notFix, ...this.footer];
    this.isVisible = false;
    this.cdr.markForCheck();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  // New methods for delete and update
  deleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(response => {
      if (response.success) {
        this.listOfData = this.listOfData.filter(client => client.CLIENT_ID !== clientId);
        this.filteredData = this.filteredData.filter(client => client.CLIENT_ID !== clientId);
        this.message.success('Client deleted successfully');
      } else {
        this.message.error('Failed to delete client');
      }
    });
  }

  updateClient(client: Person): void {
    this.clientService.updateClient(client).subscribe(response => {
      if (response.success) {
        this.message.success('Client updated successfully');
        this.clientService.getClients().subscribe(response => {
          if (response.success) {
            this.listOfData = response.data;
            this.filteredData = this.listOfData;
          }
        });
      } else {
        this.message.error('Failed to update client');
      }
    });
  }
}
