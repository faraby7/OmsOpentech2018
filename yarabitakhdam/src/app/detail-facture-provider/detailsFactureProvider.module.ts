import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { DetailFactureProviderPageroute } from "./detailsFactureProvider.routing";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import { DetailFactureProviderComponent } from "./detail-facture-provider.component";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {DetailFactureProviderService} from "./detail-facture-provider.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(DetailFactureProviderPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [DetailFactureProviderComponent],
    providers: [
        DetailFactureProviderService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class DetailsFactureProviderModule {}