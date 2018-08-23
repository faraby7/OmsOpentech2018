import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {DevisClientPageroute} from "./DevisClient.routing";
import {DevisClientService} from "./devis-client.service";
import {DevisClientComponent} from "./devis-client.component";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(DevisClientPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [DevisClientComponent],
    providers: [
        DevisClientService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class DevisClientModule {}