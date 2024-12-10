import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private fournisseurUrl="http://31.220.89.29/gestcom-api/api/achat/achat_fournisseur"
  private Fournisseur=new Subject<any>();

  constructor(private http:HttpClient) { }
  getFournisseur(): Observable<any> {
    return this.http.get<any>(this.fournisseurUrl).pipe(
      tap((data) => this.Fournisseur.next(data)),
    );
  }
  

  AddFournisseur(data:any): Observable<any> {
    return this.http.post<any>(this.fournisseurUrl,data).pipe(
      tap((data) => this.getFournisseur().subscribe()),
    );
  }

  deleteTtva(id: number): Observable<any> {
    return this.http.delete<any>(`${this.fournisseurUrl}/${id}`).pipe(
      tap(() => this.getFournisseur().subscribe()),
    );
  }


  updateFournisseur(Data: any): Observable<any> {
    return this.http.put<any>(`${this.fournisseurUrl}/${Data.FOURNISSEUR_ID}`, Data).pipe(
      tap(() => this.getFournisseur().subscribe()),
    );
  }

  getTFournisseurs(): Observable<any> {
    return this.Fournisseur.asObservable();
  }

}
