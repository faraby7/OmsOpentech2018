import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {Detail_interventionPageroute} from "../detail-intervention/detail-intervention.routing";
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import {RouterModule} from "@angular/router";
import {CardComponent} from "../shared/card/card.component";
import {DetailInterventionService} from "./detail-intervention.service";
import {DetailInterventionComponent} from "./detail-intervention.component";

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule,
      AgGridModule.withComponents([]),
      RouterModule.forChild(Detail_interventionPageroute),
      SharedModule,
      NgxPaginationModule
  ],
    declarations: [DetailInterventionComponent],
    providers: [
        DetailInterventionService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: [CardComponent]
})
export class DetailInterventionModule { }
