import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {ReglementClientComponent} from "./reglement-client.component";
import {ReglementClientPageroute} from "./ReglementClient.routing";
import {ReglementClientService} from "./reglement-client.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(ReglementClientPageroute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [ReglementClientComponent],
    providers: [
        ReglementClientService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ReglementClientModule {}