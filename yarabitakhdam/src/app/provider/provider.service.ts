import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Provider} from "./Provider";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";


@Injectable()
export class ProviderService {

  private ApiUrl = 'http://localhost:8000/api/provider';  // URL to web api
  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }

  getProvider (): Observable<Provider[]> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', 'auth-token');
    this._options = new RequestOptions({headers: headers});

    return this.http.get<Provider[]>(this.ApiUrl,{});

  }


  addProvider (provider: Provider): Observable<Provider> {

    return this.http.post<Provider>(this.ApiUrl+'/add', provider).pipe(
      tap((provider: Provider) => this.log(`added Provider w/ id=${provider.id}`)),
      catchError(this.handleError<Provider>('addProvider'))
    );



  }

  deleteProvider (provider:Provider | number) : Observable<Provider> {
    const id = typeof provider === 'number' ? provider : provider.id;
    const url = `${this.ApiUrl}/del/${id}`;

    return this.http.delete<Provider>(url).pipe(
      tap((provider: Provider) => this.log(`deleted Provider w/ id=${provider.id}`)),
      catchError(this.handleError<Provider>('deletedProvider'))
    );
  }


  updateProvider (provider: Provider): Observable<Provider> {

    return this.http.post<Provider>(this.ApiUrl+'/update', provider).pipe(
      tap((provider: Provider) => this.log(`update Provider w/ id=${provider.id}`)),
      catchError(this.handleError<Provider>('updateProvider'))
    );

  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }




}
