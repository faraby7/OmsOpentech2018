import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { DetailDevisClientPageroute } from "./detailsDevisClient.routing";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import { DetailDevisClientComponent } from "./detail-devis-client.component";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {DetailDevisClientService} from "./detail-devis-client.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(DetailDevisClientPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [DetailDevisClientComponent],
    providers: [
        DetailDevisClientService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class DetailsDevisClientModule {}