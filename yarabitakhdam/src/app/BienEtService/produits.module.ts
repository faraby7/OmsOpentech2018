import {CUSTOM_ELEMENTS_SCHEMA, NgModule,} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {ProduitsComponent} from "./produits/produits.component";
import {produitService} from "./produits/produits.service";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import {ServicesComponent} from "./services/services.component";
import {BienEtServiceRoute} from "./bienetservice.routing";
import {ServicesService} from "./services/services.service";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(BienEtServiceRoute),
        SharedModule,
        NgxPaginationModule
    ],
    declarations: [ProduitsComponent,ServicesComponent],
    providers: [
        produitService,ServicesService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class ProduitsModule {}
