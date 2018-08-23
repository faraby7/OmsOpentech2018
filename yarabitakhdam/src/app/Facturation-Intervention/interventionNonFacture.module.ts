import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {InterventionNonFactureComponent} from "./intervention-non-facture-component";
import {InterventionNonFacturePageroute} from "./interventionNonFacture.routing";
import {InterventionNonFactureService} from "./intervention-non-facture.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(InterventionNonFacturePageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [InterventionNonFactureComponent],
    providers: [
        InterventionNonFactureService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class InterventionNonFactureModule {}