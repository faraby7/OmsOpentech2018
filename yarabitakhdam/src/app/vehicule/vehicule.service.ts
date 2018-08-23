
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Vehicule } from "./Vehicule";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators"
import {Costumer} from "../costumer/Costumer";
import {Provider} from "../provider/Provider";


@Injectable()
export class VehiculeService {

        private ApiUrl = 'http://localhost:8000/api/vehicule';  // URL to web api
        private ApiUrlCostumer = 'http://localhost:8000/api/costumer';
        private row:any;
        private _options: RequestOptions = null;

        constructor(private http:HttpClient) {

        }


        getVehicles (): Observable<Vehicule[]> {

            const headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Authorization', 'auth-token');
            this._options = new RequestOptions({headers: headers});

            return this.http.get<Vehicule[]>(this.ApiUrl,{});

        }


        getCostumers (): Observable<Costumer[]> {

            const headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=utf-8');
            headers.append('Authorization', 'auth-token');
            this._options = new RequestOptions({headers: headers});

            return this.http.get<Costumer[]>(this.ApiUrlCostumer,{});

        }


        addVehicule (vehicule: Vehicule): Observable<Vehicule> {

            return this.http.post<Vehicule>(this.ApiUrl+'/add', vehicule).pipe(
                tap((vehicule: Vehicule) => this.log(`added Vehicule w/ id=${vehicule.id}`)),
                catchError(this.handleError<Vehicule>('addVehicule'))
            );
        }

        deleteVehicule (vehicule:Vehicule | number) : Observable<Vehicule> {
            const id = typeof vehicule === 'number' ? vehicule : vehicule.id;
            const url = `${this.ApiUrl}/del/${id}`;

            return this.http.delete<Vehicule>(url).pipe(
                tap((vehicule: Vehicule) => this.log(`deleted Vehicule w/ id=${vehicule.id}`)),
                catchError(this.handleError<Vehicule>('deletedVehicule'))
            );
        }

        updateVehicle (vehicule: Vehicule): Observable<Vehicule> {

            return this.http.post<Vehicule>(this.ApiUrl+'/update', vehicule).pipe(
                tap((vehicule: Vehicule) =>{console.log(vehicule); this.log(`update Vehicule w/ id=${vehicule.id}`)}),
                catchError(this.handleError<Vehicule>('updateProvider'))
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

