import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {ReglementProviderComponent} from "./reglement-provider.component";
import {ReglementProviderPageroute} from "./ReglementProvider.routing";
import {ReglementProviderService} from "./reglement-provider.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(ReglementProviderPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [ReglementProviderComponent],
    providers: [
        ReglementProviderService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ReglementProviderModule {}