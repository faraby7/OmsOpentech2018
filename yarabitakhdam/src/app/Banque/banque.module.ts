import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from "ag-grid-angular";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import { BanqueService } from "./banque.service";
import { BanquePageroute } from "./banque.routing";
import { BanqueComponent } from "./banque.component";

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule,
      AgGridModule.withComponents([]),
      RouterModule.forChild(BanquePageroute),
      SharedModule,
      NgxPaginationModule
  ],
    declarations: [BanqueComponent],
    providers: [
        BanqueService
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],

})
export class BanqueModule { }
