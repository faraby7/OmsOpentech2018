import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Costumer} from "./Costumer";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";


@Injectable()
export class CostumerService {

  private ApiUrl = 'http://localhost:8000/api/costumer';  // URL to web api
  private row:any;
  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }

  getCostumer (): Observable<Costumer[]> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Authorization', 'auth-token');
    this._options = new RequestOptions({headers: headers});

    return this.http.get<Costumer[]>(this.ApiUrl,{});

  }


  addCostumer (costumer: Costumer): Observable<Costumer> {

    return this.http.post<Costumer>(this.ApiUrl+'/add', costumer).pipe(
      tap((costumer: Costumer) => this.log(`added Customer w/ id=${costumer.id}`)),
      catchError(this.handleError<Costumer>('addCostumer'))
    );



  }

  deleteCostumer (costumer:Costumer | number) : Observable<Costumer> {
    const id = typeof costumer === 'number' ? costumer : costumer.id;
    const url = `${this.ApiUrl}/del/${id}`;

    return this.http.delete<Costumer>(url).pipe(
      tap((costumer: Costumer) => this.log(`deleted Customer w/ id=${costumer.id}`)),
      catchError(this.handleError<Costumer>('deleteCostumer'))
    );
  }


  updateCostumer (costumer: Costumer): Observable<Costumer> {

    return this.http.post<Costumer>(this.ApiUrl+'/update', costumer).pipe(
      tap((costumer: Costumer) => this.log(`update Customer w/ id=${costumer.id}`)),
      catchError(this.handleError<Costumer>('updateCostumer'))
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
