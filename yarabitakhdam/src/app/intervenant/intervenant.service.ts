import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Headers, RequestOptions} from "@angular/http";
import {Vehicule} from "../vehicule/vehicule";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Intervenant} from "./intervenant";
import {Costumer} from "../costumer/Costumer";
import {Personal} from "../personal/Personal";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class IntervenantService {


    private ApiUrl = 'http://localhost:8000/api/interventions';  // URL to web api
    private ApiUrlCostumer = 'http://localhost:8000/api/costumer';
    private ApiUrlPersonal = 'http://localhost:8000/api/personals';
    private ApiUrlVehicule = 'http://localhost:8000/api/vehiculeAll';
    private ApiUrlPdf = 'http://localhost:8000/api/interventions/getPdf';
    private row:any;
    private _options: RequestOptions = null;



  constructor(private http:HttpClient) { }



    getInterventions (): Observable<Intervenant[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});

        return this.http.get<Intervenant[]>(this.ApiUrl,{});

    }



    getCostumers (): Observable<Costumer[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});

        return this.http.get<Costumer[]>(this.ApiUrlCostumer,{});
    }


    getPersonals (): Observable<Personal[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});

        return this.http.get<Personal[]>(this.ApiUrlPersonal);

    }

    pageChange(pN) {
        return this.http.get<Personal[]>('http://localhost:8000/api/v?page='+pN);
    }

    addInterventionLigne (intervention: Intervenant): Observable<Intervenant> {
        return this.http.post<Intervenant>(this.ApiUrl+'/addLine', intervention).pipe(
            tap((intervention: Intervenant) => this.log(`added Line w/ id=${intervention.id_intervention}`)),
            catchError(this.handleError<Intervenant>('addLine'))
        );
    }

    addIntervention (intervention: Intervenant): Observable<Intervenant> {
        return this.http.post<Intervenant>(this.ApiUrl+'/verify_for_add', intervention).pipe(
            tap((intervention: Intervenant) => this.log(`added Intervention w/ id=${intervention.id_intervention}`)),
            catchError(this.handleError<Intervenant>('addIntervention'))
        );
    }

    getProducts (intervention: Intervenant): Observable<Intervenant> {
        return this.http.post<Intervenant>(this.ApiUrl+'/produits', intervention).pipe(
            tap((intervention: Intervenant) => this.log(`get Intervention w/ id=${intervention.id_intervention}`)),
            catchError(this.handleError<Intervenant>('getIntervention'))
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

    deleteIntervention (intervention:Intervenant | number) : Observable<Intervenant> {
        const id = typeof intervention === 'number' ? intervention : intervention.intervention_id;
        const url = `${this.ApiUrl}/del/${id}`;

        console.log(url);

        return this.http.delete<Intervenant>(url).pipe(
            tap((intervention: Intervenant) => this.log(`deleted Intervention w/ id=${intervention.id_intervention}`)),
            catchError(this.handleError<Intervenant>('deleted Intervention'))
        );
    }

    getPdf(id: number): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'responseType': 'text',
                'Content-Type': 'application/pdf'
            })
        };
        return this.http.get(this.ApiUrlPdf+'/'+id,  httpOptions).pipe(
            tap((intervention: any) => this.log(`get Pdf w/ id=${intervention}`)),
            catchError(this.handleError<Intervenant>('getPdf'))
        );
    }


    updateIntervention (intervention: Intervenant): Observable<Intervenant> {
        return this.http.post<Intervenant>(this.ApiUrl+'/update', intervention).pipe(
            tap((intervention: Intervenant) =>{console.log(intervention); this.log(`update Intervention w/ id=${intervention.id_intervention}`)}),
            catchError(this.handleError<Intervenant>('updateIntervention'))
        );
    }


    modifierIntervention (intervention: Intervenant): Observable<Intervenant> {
        console.log(intervention.upload);
        return this.http.post<Intervenant>(this.ApiUrl+'/edit', intervention).pipe(
            tap((intervention: Intervenant) =>{console.log(intervention); this.log(`update Intervention w/ id=${intervention.id_intervention}`)}),
            catchError(this.handleError<Intervenant>('updateIntervention'))
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
