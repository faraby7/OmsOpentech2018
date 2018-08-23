import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Intervenant} from "../intervenant/intervenant";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {HttpClient} from "@angular/common/http";
import {Vehicule} from "../vehicule/vehicule";

@Injectable()
export class DetailInterventionService {


    private ApiUrl = 'http://localhost:8000/api/interventions';
    private ApiUrlVehicule = 'http://localhost:8000/api/vehiculeAll';

  constructor(private http:HttpClient) { }


    getProducts (intervention: Intervenant): Observable<any> {
        return this.http.post<Intervenant>(this.ApiUrl+'/produits', intervention).pipe(
            tap((intervention: Intervenant) => this.log(`get Intervention w/ id=${intervention.id_intervention}`)),
            catchError(this.handleError<Intervenant>('getIntervention'))
        );
    }

    updateLine (intervenant: Intervenant): Observable<Intervenant> {
        return this.http.post<Intervenant>(this.ApiUrl+'/update_line', intervenant).pipe(
            tap((intervenant: Intervenant) =>{console.log(intervenant); this.log(`update Line w/ id=${intervenant.id_intervention}`)}),
            catchError(this.handleError<Intervenant>('updateLine'))
        );
    }

    getDetail (intervention: Intervenant): Observable<Intervenant> {
        return this.http.post<Intervenant>(this.ApiUrl+'/detail', intervention).pipe(
            tap((intervention: Intervenant) => this.log(`get Detail w/ id=${intervention.id_intervention}`)),
            catchError(this.handleError<Intervenant>('getDetail'))
        );
    }

    getVehiculs (intervention: Intervenant): Observable<Intervenant> {
        return this.http.post<Intervenant>(this.ApiUrlVehicule, intervention).pipe(
            tap((intervention: Intervenant) => this.log(`get Vehicule w/ id=${intervention.id_intervention}`)),
            catchError(this.handleError<Intervenant>('getVehicule'))
        );
    }


    deleteDetail (intervention:Intervenant | number) : Observable<Intervenant> {
        const id = typeof intervention === 'number' ? intervention : intervention.detail_id;
        const url = `${this.ApiUrl}/detail_intervention/del/${id}`;

        console.log(url);

        return this.http.delete<Intervenant>(url).pipe(
            tap((intervention: Intervenant) => this.log(`deleted Intervention w/ id=${intervention.id_intervention}`)),
            catchError(this.handleError<Intervenant>('deleted Intervention'))
        );
    }

    addLine (intervention: Intervenant): Observable<Intervenant> {
        return this.http.post<Intervenant>(this.ApiUrl+'/add_detail', intervention).pipe(
            tap((intervention: Intervenant) => this.log(`added Line w/ id=${intervention.id_intervention}`)),
            catchError(this.handleError<Intervenant>('addLine'))
        );
    }



    public handleError<T> (operation = 'operation', result?: T) {
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
