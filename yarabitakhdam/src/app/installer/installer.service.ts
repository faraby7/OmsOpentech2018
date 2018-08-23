import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Installer} from "./Installer";
import {HttpClient} from "@angular/common/http";
import {Headers, RequestOptions} from "@angular/http";

@Injectable()
export class InstallerService {

  private ApiUrl = 'http://localhost:8000/api/instalateur/';  // URL to web api

  private _options: RequestOptions = null;

  constructor(private http:HttpClient) {

  }

  getInstaller (): Observable<Installer[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', 'auth-token');
        this._options = new RequestOptions({headers: headers});

        return this.http.get<Installer[]>(this.ApiUrl,{});

    }
}
