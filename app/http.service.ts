

// THIS ONLY DELETES WHAT IS IN MEMORY.
// REFRESHING THE BROWSER CLEARS THE MEMORY
//   AND THE ORIGINAL FILE DB IS RELOADED.
// THERE IS NO REAL DATABASE HERE.
// FORK IT AND ADD FIREBASE IF YOU LIKE.

// Showing different ways to pass a URL to the service.


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { MemberModel } from './members/member.model'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({ providedIn: 'root' })
export class HttpService {

  private api = '/api/';

  constructor(
    private http: HttpClient,
    ) { }

// ----------------- CRUD -------------------

  // --------------GET ALL RECORDS ------------
  public getAllRecords(url): Observable<any> {
    return this.http.get<MemberModel>(url).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  // ----------- CREATE new record -----------

  public addRecord(url: string, recordData):  Observable<any> {
    return this.http.post(url, recordData).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  // ---------- EDIT AND UPDATE --------------

  // ---- FETCH record detail for editing or viewing. ----

  public getRecordById(url, recordId): Observable<any> {
    return this.http.get<any>(`${url}/${recordId}`).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


  // ---- UPDATES an existing record ----

  public updateRecord(url, recordUpdate): Observable<any> {
    return this.http.put(url, recordUpdate, httpOptions).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }



  // --------- DELETES a single record. ---------

  public deleteRecord(url):  Observable<any> {
    return this.http.delete(url).pipe(
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }


// --------------- QUERIES ---------------------

  public searchCountries(url) {
    return this.http.get<any>(url).pipe(
      map(data => {
        return data;
      }),
      catchError((error: any) => {
           console.error(error);
           return of();
         }),
    );
  }

  // --------- INCREMENTAL SEARCH --------

  //  Called by the Mat Datatable search by last name.

  public nameSearch(terms) {
    return terms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => {
          const url = `api/members/?last_name=${term}`;
          return this.http.get(url);
      }),
      catchError((error: any) => {
           console.error(error);
           return of();
      }),
    );
  }

  // --------------- FORM CONTROLS ---------------------


  public validateUsername(userName) {
 
    const url = `api/members/?user_name=${userName}`;
    return this.http.get(url).pipe(
      map(data => {
        return data;
      }),
      catchError((error: any) => {
           console.error(error);
           return of();
      }),
    );
  }
}
