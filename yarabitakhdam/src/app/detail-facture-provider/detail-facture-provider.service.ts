import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {Factures} from "../facture-provider/Factures";
import {Observable} from "rxjs/Observable";
import {LigneFacture} from "../facture-provider/LigneFacture";
import {ReglementProvider} from "./ReglememtProvider";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {ReglementClient} from "../reglement-client/ReglementClient";

@Injectable()
export class DetailFactureProviderService {

    private ApiUrl = 'http://localhost:8000/api/FactureProvider';  // URL to web api
    private ApiUrl1 = 'http://localhost:8000/api/LigneFacture';  // URL to web api
    private ApiUrl2 = 'http://localhost:8000/api/ReglementProvider';  // URL to web api
    private row:any;
    private _options: RequestOptions = null;

    constructor(private http:HttpClient) {

    }

    getFactureInfo (id:number): Observable<Factures[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<Factures[]>(this.ApiUrl+"/"+id,{});

    }



    getLignesFacture (id:number): Observable<LigneFacture[]> {

        const url = `${this.ApiUrl1}/${id}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<LigneFacture[]>(url,{});
    }

    getReglementFacture (id:number): Observable<ReglementProvider[]> {

        const url = `${this.ApiUrl2}/${id}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<ReglementProvider[]>(url,{});
    }

    addReglement (reglement: ReglementProvider): Observable<ReglementProvider> {


        return this.http.post<ReglementProvider>(this.ApiUrl2+'/add', reglement).pipe(
            tap((reglement: ReglementProvider) => this.log(`added reglement w/ id=${reglement.id}`)),
            catchError(this.handleError<Factures>('addReglement'))
        );

    }

    calculereglement (id:number):Observable<Factures[]>{

        return this.http.get<Factures[]>(this.ApiUrl2+'/calcule/'+id,{});
    }


    getAllBanque(): Observable<LigneFacture[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<LigneFacture[]>("http://localhost:8000/api/banque/",{});
    }
    
    deleteReg(reglement:ReglementClient | number) : Observable<LigneFacture> {
        const id = typeof reglement === 'number' ? reglement : reglement.id;
        const url = `${this.ApiUrl2}/del/${id}`;

        return this.http.delete<ReglementClient>(url).pipe(
            tap((reglement: ReglementClient) => this.log(`deleted lignefacture w/ id=${reglement.id}`)),
            catchError(this.handleError<ReglementClient>('deleted lignefacture'))
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
