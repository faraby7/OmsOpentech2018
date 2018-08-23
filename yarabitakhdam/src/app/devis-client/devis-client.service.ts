import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Devis} from "./Devis";
import {LigneDevis} from "./LigneDevis";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";


@Injectable()
export class DevisClientService {

    private ApiUrl = 'http://localhost:8000/api/DevisClient';  // URL to web api
    private ApiUrl1 = 'http://localhost:8000/api/LigneDevisClient';  // URL to web api
    private row:any;
    private _options: RequestOptions = null;

    constructor(private http:HttpClient) {

    }

    getDevis(): Observable<Devis[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});

        return this.http.get<Devis[]>(this.ApiUrl,{});

    }


    addDevis(devis: Devis): Observable<Devis> {

        return this.http.post<Devis>(this.ApiUrl+'/add', devis).pipe(
            tap((devis: Devis) => this.log(`added Devis w/ id=${devis.id}`)),
            catchError(this.handleError<Devis>('Devis'))
        );

    }

    deleteDevis (devis:Devis | number) : Observable<Devis> {
        const id = typeof devis === 'number' ? devis : devis.id;
        const url = `${this.ApiUrl}/del/${id}`;

        return this.http.delete<Devis>(url).pipe(
            tap((devis: Devis) => this.log(`deleted Devis w/ id=${devis.id}`)),
            catchError(this.handleError<Devis>('deleted Devis'))
        );
    }

    factureDevis  (devis:Devis | number) : Observable<LigneDevis> {

        const id = typeof devis === 'number' ? devis : devis.id;
        const url = `${this.ApiUrl}/facture/${id}`;

        return this.http.delete<Devis>(url).pipe(
            tap((devis: Devis) => this.log(`deleted Devis w/ id=${devis.id}`)),
            catchError(this.handleError<Devis>('deleted Devis'))
        );
    }



    updateDevis(devis: Devis): Observable<Devis> {

        return this.http.post<Devis>(this.ApiUrl+'/update', devis).pipe(
            tap((devis: Devis) => this.log(`update Factures w/ id=${devis.id}`)),
            catchError(this.handleError<Devis>('updateDevis'))
        );

    }




    getLignesDevis(id:number): Observable<LigneDevis[]> {

        const url = `${this.ApiUrl1}/${id}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<LigneDevis[]>(url,{});
    }



    addLignesDevis(lignedevis: LigneDevis): Observable<LigneDevis> {

        return this.http.post<LigneDevis>(this.ApiUrl1+'/add', lignedevis).pipe(
            tap((lignedevis: LigneDevis) => this.log(`added lignedevis w/ id=${lignedevis.id}`)),
            catchError(this.handleError<LigneDevis>('lignedevis'))
        );

    }


    deleteLignesDevis  (lignedevis:LigneDevis| number) : Observable<LigneDevis> {
        const id = typeof lignedevis === 'number' ? lignedevis : lignedevis.id;
        const url = `${this.ApiUrl1}/del/${id}`;

        return this.http.delete<LigneDevis>(url).pipe(
            tap((ligneDevis: LigneDevis) => this.log(`deleted LigneDevis w/ id=${ligneDevis.id}`)),
            catchError(this.handleError<LigneDevis>('deleted LigneDevis'))
        );
    }




    calculedevis (id:number):Observable<LigneDevis[]>{

        return this.http.get<LigneDevis[]>(this.ApiUrl+'/calcule/'+id,{});
    }


    getallProduit(): Observable<LigneDevis[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<LigneDevis[]>("http://localhost:8000/api/produits/select",{});
    }


    getallClient(): Observable<LigneDevis[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<LigneDevis[]>("http://localhost:8000/api/costumer",{});
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
