import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Produits} from "./Produits";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class produitService {

    private ApiUrl = 'http://localhost:8000/api/produits';  // URL to web api
    private row:any;
    private _options: RequestOptions = null;

    constructor(private http:HttpClient) {
    }
    getProduits (): Observable<Produits[]> {
            const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});
        return this.http.get<Produits[]>(this.ApiUrl,{});

    }

    addProduct (produit: Produits): Observable<Produits> {

            return this.http.post<Produits>(this.ApiUrl+'/add', produit).pipe(
                tap((produit: Produits) => this.log(`added Produit w/ id=${produit.id}`)),
                catchError(this.handleError<Produits>('addProduit'))
            );
    }

    deleteProduit (produit:Produits | number) : Observable<Produits> {
             const id = typeof produit === 'number' ? produit : produit.id;
             const url = `${this.ApiUrl}/del/${id}`;
              return this.http.delete<Produits>(url).pipe(
                  tap((produit: Produits) => this.log(`deleted Produit w/ id=${produit.id}`)),
                  catchError(this.handleError<Produits>('deletedProduit'))
              );
    }

    UpdateEtat(produit:Produits | number) : Observable<Produits> {
        const id = typeof produit === 'number' ? produit : produit.id;
        const url = `${this.ApiUrl}/up/${id}`;
        return this.http.delete<Produits>(url).pipe(
            tap((produit: Produits) => this.log(`Updated Produit w/ id=${produit.id}`)),
            catchError(this.handleError<Produits>('updatedProduit'))
        );
    }
    updateProduit (produit: Produits): Observable<Produits> {
        return this.http.post<Produits>(this.ApiUrl+'/update', produit).pipe(
            tap((produit: Produits) => this.log(`update Produit w/ id=${produit.id}`)),
            catchError(this.handleError<Produits>('updateProduit'))
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
