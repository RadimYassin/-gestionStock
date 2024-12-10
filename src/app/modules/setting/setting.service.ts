import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private apiUrl1 = 'http://31.220.89.29/gestcom-api/api/setting/ttva';
  private apiUrl2 = 'http://31.220.89.29/gestcom-api/api/setting/unites';
  private apiUrl3 = 'http://31.220.89.29/gestcom-api/api/setting/modes_paiement';
  private apiUrl4 = 'http://31.220.89.29/gestcom-api/api/setting/param_color';
  private apiUrl5 = 'http://31.220.89.29/gestcom-api/api/stock/stock_depot';
  private  vente_conditionUrl="http://31.220.89.29/gestcom-api/api/vente/vente_condition_paiment"
  private userUrl="http://31.220.89.29/gestcom-api/api/admin/users"
  private tarif="http://31.220.89.29/gestcom-api/api/stock/product_price_rebate_header"
  private articleUrl="http://31.220.89.29/gestcom-api/api/stock/stock_produit"


  private ttvaSubject = new Subject<any>();
  private unitySubject = new Subject<any>();
  private colorSubject = new Subject<any>();
  private paymentModeSubject = new Subject<any>();
  private depotSubject = new Subject<any>();
  private articleSubject=new Subject<any>()
  private vente_conditionSUbject=new Subject<any>();
  private userSubject = new Subject<any>();
  private TarifSubject=new Subject<any>();

  constructor(private http: HttpClient) {}


  // getDepot(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl5).pipe(
  //     tap((data) => this.depotSubject.next(data)),
  //   );
  // }

  // addDepot(Depot: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl5, Depot).pipe(
  //     tap(() => this.getDepot().subscribe()),
  //   );
  // }
  // TTVA functions
  getTtva(): Observable<any> {
    return this.http.get<any>(this.apiUrl1).pipe(
      tap((data) => this.ttvaSubject.next(data)),
    );
  }

  addTtva(ttva: any): Observable<any> {
    return this.http.post<any>(this.apiUrl1, ttva).pipe(
      tap(() => this.getTtva().subscribe()),
    );
  }

  deleteTtva(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl1}/${id}`).pipe(
      tap(() => this.getTtva().subscribe()),
    );
  }

  updateTtva(ttva: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl1}/${ttva.TTVA}`, ttva).pipe(
      tap(() => this.getTtva().subscribe()),
    );
  }

  getTtvaUpdates(): Observable<any> {
    return this.ttvaSubject.asObservable();
  }
   //get users
getUsers():Observable<any>{
  return this.http.get<any>(this.userUrl).pipe(
    tap((data)=>this.userSubject.next(data))
  )
}

addUser(User: any): Observable<any> {
  return this.http.post<any>(this.userUrl, User).pipe(
    tap(() => this.getUsers().subscribe()),
  );
}

getUserUpdates(): Observable<any[]> {
  return this.userSubject.asObservable();
}

  // Unity functions
  getUnity(): Observable<any> {
    return this.http.get<any>(this.apiUrl2).pipe(
      tap((data) => this.unitySubject.next(data)),
    );
  }

  addUnity(unity: any): Observable<any> {
    return this.http.post<any>(this.apiUrl2, unity).pipe(
      tap(() => this.getUnity().subscribe()),
    );
  }

  deleteUnity(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl2}/${id}`).pipe(
      tap(() => this.getUnity().subscribe()),
    );
  }

  updateUnity(unity: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl2}/${unity.UNITE_ID}`, unity).pipe(
      tap(() => this.getUnity().subscribe()),
    );
  }

  getUnityUpdates(): Observable<any> {
    return this.unitySubject.asObservable();
  }

  // Color functions
  getColor(): Observable<any> {
    return this.http.get<any>(this.apiUrl4).pipe(
      tap((data) => this.colorSubject.next(data)),
    );
  }

  addColor(color: any): Observable<any> {
    return this.http.post<any>(this.apiUrl4, color).pipe(
      tap(() => this.getColor().subscribe()),
    );
  }

  deleteColor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl4}/${id}`).pipe(
      tap(() => this.getColor().subscribe()),
    );
  }

  updateColor(color: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl4}/${color.id}`, color).pipe(
      tap(() => this.getColor().subscribe()),
    );
  }

  getColorUpdates(): Observable<any> {
    return this.colorSubject.asObservable();
  }

  // Payment Mode functions
  getPaymentMode(): Observable<any> {
    return this.http.get<any>(this.apiUrl3).pipe(
      tap((data) => this.paymentModeSubject.next(data)),
    );
  }

  addPaymentMode(paymentMode: any): Observable<any> {
    return this.http.post<any>(this.apiUrl3, paymentMode).pipe(
      tap(() => this.getPaymentMode().subscribe()),
    );
  }

  deletePaymentMode(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl3}/${id}`).pipe(
      tap(() => this.getPaymentMode().subscribe()),
    );
  }

  updatePaymentMode(paymentMode: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl3}/${paymentMode.MODE_PAIMENT_ID}`, paymentMode).pipe(
      tap(() => this.getPaymentMode().subscribe()),
    );
  }

  getPaymentModeUpdates(): Observable<any> {
    return this.paymentModeSubject.asObservable();
  }


  //depot function 

  getDepot(): Observable<any> {
    return this.http.get<any>(this.apiUrl5).pipe(
      tap((data) => this.depotSubject.next(data)),
    );
  }

  // addDepot(Depot: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl5, Depot).pipe(
  //     tap(() => this.getDepot().subscribe()),
  //   );
  // }

  addDepot(Depot: any): Observable<any> {
    return this.http.post<any>(this.apiUrl5, Depot).pipe(
      tap(() => this.getDepot().subscribe()),
    );
  }

  deleteDepot(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl5}/${id}`).pipe(
      tap(() => this.getDepot().subscribe()),
    );
  }

  updateDepot(depot: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl5}/${depot.DEPOT_ID}`, depot).pipe(
      tap(() => this.getDepot().subscribe()),
    );
  }

  getDepotUpdates(): Observable<any> {
    return this.depotSubject.asObservable();
  }

  //get vente_condition_paiment


  getVente_condition_paiment():Observable<any>{

      return this.http.get<any>(this.vente_conditionUrl).pipe(
        tap((data)=>this.vente_conditionSUbject.next(data))
      )
  }

//get article 
getArticle():Observable<any>{
  return this.http.get<any>(this.articleUrl).pipe(
    tap((data)=>this.articleSubject.next(data))
  )
}
///get tarif


getTarif():Observable<any>{
  return this.http.get<any>(this.tarif).pipe(
    tap((data)=>this.TarifSubject.next(data))
  )
}


// get fournisseur




}
