import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgGridModule} from "ag-grid-angular";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {SharedModule} from "../shared/shared.module";
import {CardComponent} from "../shared/card/card.component";
import { IntervenantService } from "./intervenant.service";
import { IntervenantPageroute } from "./intervenant.routing";
import {IntervenantComponent} from "./intervenant.component";

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule,
      AgGridModule.withComponents([]),
      RouterModule.forChild(IntervenantPageroute),
      SharedModule,
      NgxPaginationModule,

  ],
    declarations: [IntervenantComponent],
    providers: [
            IntervenantService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: [CardComponent]
})
export class IntervenantModule { }
