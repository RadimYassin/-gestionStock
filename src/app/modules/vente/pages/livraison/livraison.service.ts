import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {
  private apiUrl = 'http://31.220.89.29/gestcom-api/api/vente/vente_livraison/';

  constructor(private http:HttpClient) { }


  private LivraisonSubject=new Subject<any>();



  getLivraison(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap((data) => this.LivraisonSubject.next(data)),
    );
  }

    getLivraisonItem(id:Number) {
    return this.http.get<any>(`${this.apiUrl}${id}`).pipe(
      tap((data) => this.LivraisonSubject.next(data)),
    );
  }


  addLivraison(info:any): Observable<any> {

return this.http.post<any>(this.apiUrl,info).pipe(
    tap(() => this.getLivraison().subscribe()),

);

  }

  deleteLivraison(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getLivraison().subscribe()),
    );
  }

  updateLivraison(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${data.LIVRAISON_ID}`, data).pipe(
      tap(() => this.getLivraison().subscribe()),
    );
  }

  getTLivraison(): Observable<any> {
    return this.LivraisonSubject.asObservable();
  }











  
}
