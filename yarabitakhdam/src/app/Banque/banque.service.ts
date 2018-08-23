
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Banque } from "./banque";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators"
import {Costumer} from "../costumer/Costumer";
import {Provider} from "../provider/Provider";


@Injectable()
export class BanqueService {

        private ApiUrl = 'http://localhost:8000/api/banque';  // URL to web api
        private ApiUrlCostumer = 'http://localhost:8000/api/costumer';
        private row:any;
        private _options: RequestOptions = null;

        constructor(private http:HttpClient) {

        }


        getComptes (): Observable<Banque[]> {

            const headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Authorization', 'auth-token');
            this._options = new RequestOptions({headers: headers});

            return this.http.get<Banque[]>(this.ApiUrl,{});

        }


        addCompte (banque: Banque): Observable<Banque> {

            return this.http.post<Banque>(this.ApiUrl+'/add', banque).pipe(
                tap((banque: Banque) => this.log(`added compte w/ id=${banque.id}`)),
                catchError(this.handleError<Banque>('addcompte'))
            );
        }


    deleteCompte (compte:Banque | number) : Observable<Banque> {
            const id = typeof compte === 'number' ? compte : compte.id;
            const url = `${this.ApiUrl}/del/${id}`;

            return this.http.delete<Banque>(url).pipe(
                tap((compte: Banque) => this.log(`deleted compte w/ id=${compte.id}`)),
                catchError(this.handleError<Banque>('compte'))
            );
        }

        updateCompte (banque: Banque): Observable<Banque> {
            return this.http.post<Banque>(this.ApiUrl+'/update', banque).pipe(
                tap((banque: Banque) => this.log(`update Compte w/ id=${banque.id}`)),
                catchError(this.handleError<Banque>('updateCompte'))
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

