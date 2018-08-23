import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Factures} from "./Factures";
import {LigneFacture} from "./LigneFacture";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {ReglementClient} from "./ReglementClient";


@Injectable()
export class ReglementClientService {

    private ApiUrl = 'http://localhost:8000/api/ReglementClient/';  // URL to web api
    private ApiUrl1 = 'http://localhost:8000/api/LigneFacture';  // URL to web api
    private row:any;
    private _options: RequestOptions = null;

    constructor(private http:HttpClient) {

    }

    getReglements (): Observable<ReglementClient[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});

        return this.http.get<ReglementClient[]>(this.ApiUrl,{});

    }


    addFacture (factures: Factures): Observable<Factures> {
        console.log("test"+factures);
        return this.http.post<Factures>(this.ApiUrl+'/add', factures).pipe(
            tap((facture: Factures) => this.log(`added facture w/ id=${facture.id}`)),
            catchError(this.handleError<Factures>('addFacture'))
        );

    }

    deleteFacture (factures:Factures | number) : Observable<Factures> {
        const id = typeof factures === 'number' ? factures : factures.id;
        const url = `${this.ApiUrl}/del/${id}`;

        return this.http.delete<Factures>(url).pipe(
            tap((facture: Factures) => this.log(`deleted Facture w/ id=${facture.id}`)),
            catchError(this.handleError<Factures>('deleted Facture'))
        );
    }


    updateFacture(factures: Factures): Observable<Factures> {

        return this.http.post<Factures>(this.ApiUrl+'/update', factures).pipe(
            tap((facture: Factures) => this.log(`update Factures w/ id=${facture.id}`)),
            catchError(this.handleError<Factures>('updateFactures'))
        );

    }


    getLignesFacture (id:number): Observable<LigneFacture[]> {

        const url = `${this.ApiUrl1}/${id}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<LigneFacture[]>(url,{});
    }


    searchReglement (reglementClient: ReglementClient): Observable<ReglementClient> {

       return this.http.post<ReglementClient>(this.ApiUrl+'search', reglementClient).pipe(
           tap((reglementClient: ReglementClient) => this.log(`search facture w/ id=${reglementClient.id}`)),
           catchError(this.handleError<ReglementClient>('search'))
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
