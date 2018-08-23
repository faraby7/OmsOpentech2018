import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { FactureProviderPageroute } from "../facture-provider/FactureProvider.routing";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {FactureProviderComponent} from "../facture-provider/facture-provider.component";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {FactureProviderService} from "../facture-provider/facture-provider.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(FactureProviderPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [FactureProviderComponent],
    providers: [
        FactureProviderService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class FactureProviderModule {}