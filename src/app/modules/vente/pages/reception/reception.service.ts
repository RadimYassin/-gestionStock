import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  constructor(private http: HttpClient) { }
  private ReceptionSubject = new Subject<any>();

  private apiurl = "http://31.220.89.29/gestcom-api/api/achat/achat_reception/"

  getReceptions(): Observable<any> {
    return this.http.get<any>(this.apiurl).pipe(
      tap((data) => this.ReceptionSubject.next(data)),
    );
  }

  addReception(reception: any): Observable<any> {

    return this.http.post<any>(this.apiurl, reception).pipe(
      tap((data) => this.ReceptionSubject.next(data))
    )
  }
}
