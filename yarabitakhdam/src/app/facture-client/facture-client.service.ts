import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Factures} from "./Factures";
import {LigneFacture} from "./LigneFacture";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";


@Injectable()
export class FactureClientService {

    private ApiUrl = 'http://localhost:8000/api/FactureClient';  // URL to web api
    private ApiUrl1 = 'http://localhost:8000/api/LigneFactureClient';  // URL to web api
    private row:any;
    private _options: RequestOptions = null;

    constructor(private http:HttpClient) {

    }

    getFactures (): Observable<Factures[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});

        return this.http.get<Factures[]>(this.ApiUrl,{});

    }

    FacturePdf (id: number) : Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'responseType': 'text',
                'Content-Type': 'application/pdf'
            })
        };

        const url = `${this.ApiUrl}/pdf/${id}`;

        return this.http.get<any>(url,httpOptions).pipe(tap((facture: any) => this.log(`added facture w/ id=${facture}`)),
            catchError(this.handleError<any>('getpdf')));
    }



    addFacture (factures: Factures): Observable<Factures> {

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

    closeFacture  (factures:Factures | number) : Observable<LigneFacture> {

        const id = typeof factures === 'number' ? factures : factures.id;
        const url = `${this.ApiUrl}/close/${id}`;

        return this.http.delete<Factures>(url).pipe(
            tap((facture: Factures) => this.log(`deleted Facture w/ id=${facture.id}`)),
            catchError(this.handleError<Factures>('deleted Facture'))
        );
    }



    updateFacture(factures: Factures): Observable<Factures> {

        return this.http.post<Factures>(this.ApiUrl+'/update', factures).pipe(
            tap((factures: Factures) => this.log(`update Factures w/ id=${factures.id}`)),
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



    addLignesFacture (lignefacture: LigneFacture): Observable<LigneFacture> {

        return this.http.post<LigneFacture>(this.ApiUrl1+'/add', lignefacture).pipe(
            tap((lignefacture: LigneFacture) => this.log(`added lignefacture w/ id=${lignefacture.id}`)),
            catchError(this.handleError<LigneFacture>('addLigneFacture'))
        );

    }


    deleteLignesFacture  (lignefacture:LigneFacture | number) : Observable<LigneFacture> {
        const id = typeof lignefacture === 'number' ? lignefacture : lignefacture.id;
        const url = `${this.ApiUrl1}/del/${id}`;

        return this.http.delete<LigneFacture>(url).pipe(
            tap((lignefacture: LigneFacture) => this.log(`deleted lignefacture w/ id=${lignefacture.id}`)),
            catchError(this.handleError<LigneFacture>('deleted lignefacture'))
        );
    }




    calculefacture (id:number):Observable<LigneFacture[]>{

        return this.http.get<LigneFacture[]>(this.ApiUrl+'/calcule/'+id,{});
    }


    getallProduit(): Observable<LigneFacture[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<LigneFacture[]>("http://localhost:8000/api/produits/select",{});
    }


    getallClient(): Observable<LigneFacture[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<LigneFacture[]>("http://localhost:8000/api/costumer",{});
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
