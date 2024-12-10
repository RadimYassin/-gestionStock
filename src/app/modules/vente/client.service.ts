import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://31.220.89.29/gestcom-api/api/vente/vente_client';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addClient(clientData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, clientData);
  }

  deleteClient(clientId: number): Observable<any> {
    const url = `${this.apiUrl}/${clientId}`;
    return this.http.delete<any>(url);
  }

  updateClient(clientData: any): Observable<any> {
    const url = `${this.apiUrl}/${clientData.CLIENT_ID}`;
    return this.http.put<any>(url, clientData);
  }
}
