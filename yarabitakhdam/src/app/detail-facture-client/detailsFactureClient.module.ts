import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { DetailFactureClientPageroute } from "./detailsFactureClient.routing";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import { DetailFactureClientComponent } from "./detail-facture-client.component";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {DetailFactureClientService} from "./detail-facture-client.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(DetailFactureClientPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [DetailFactureClientComponent],
    providers: [
        DetailFactureClientService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class DetailsFactureClientModule {}