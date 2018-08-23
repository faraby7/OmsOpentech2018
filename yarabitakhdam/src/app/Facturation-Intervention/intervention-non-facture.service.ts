import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {Factures} from "../facture-client/Factures";



@Injectable()
export class InterventionNonFactureService {

    private ApiUrl = 'http://localhost:8000/api/FactureClient';
    private Api = 'http://localhost:8000/api/interventionsNonFacture';
    private Api1 = 'http://localhost:8000/api/costumer';
    // URL to web api
    private row:any;
    private _options: RequestOptions = null;

    constructor(private http:HttpClient) {

    }

    getInterventionNonFacture (): Observable<any[]> {

        return this.http.get<any[]>(this.Api,{});

    }
    getFactureExiste (idCostumer:number): Observable<any[]> {

        return this.http.get<any[]>(this.ApiUrl+'/client/'+idCostumer,{});

    }

    getAllCostumer(): Observable<any[]> {

        return this.http.get<any[]>(this.Api1,{});

    }

    addFacture (factures: Factures): Observable<Factures> {

        return this.http.post<Factures>(this.ApiUrl+'/add', factures).pipe(
            tap((facture: Factures) => this.log(`added facture w/ id=${facture.id}`)),
            catchError(this.handleError<Factures>('addFacture'))
        );

    }



    sendcheckedIntervention (arraychecked: Array<number>): Observable< Array<any> > {

        return this.http.post< Array<number>>(this.Api+'/arraychecked', arraychecked).pipe(
            tap((arraychecked:  Array<number>) => this.log(`check facture `)),
            catchError(this.handleError< Array<number>>('checked'))
        );

    }

    sendcheckedInterventiondejaexiste (arraychecked: Array<number>,id:number): Observable< Array<any> > {

        return this.http.post< Array<number>>(this.Api+'/arraycheckedexiste/'+id, arraychecked).pipe(
            tap((arraychecked:  Array<number>) => this.log(`check facture `)),
            catchError(this.handleError< Array<number>>('checked'))
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
