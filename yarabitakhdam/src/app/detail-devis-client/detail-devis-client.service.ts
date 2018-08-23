import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Devis} from "../devis-client/Devis";
import {LigneDevis} from "../devis-client/LigneDevis";

@Injectable()
export class DetailDevisClientService {

    private ApiUrl = 'http://localhost:8000/api/DevisClient';  // URL to web api
    private ApiUrl1 = 'http://localhost:8000/api/LigneDevisClient';  // URL to web api
    private row:any;
    private _options: RequestOptions = null;

    constructor(private http:HttpClient) {

    }

    getDevisInfo (id:number): Observable<Devis[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<Devis[]>(this.ApiUrl+"/"+id,{});

    }



    getLignesDevis (id:number): Observable<LigneDevis[]> {

        const url = `${this.ApiUrl1}/${id}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<LigneDevis[]>(url,{});
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
