import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA,} from '@angular/core';

import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { CostumerPageroute } from "../costumer/costumer.routing";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {CostumerComponent} from "./costumer.component";
import {CostumerService} from "./costumer.service";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import { NumberOnlyDirective } from './number.directive';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(CostumerPageroute),
    SharedModule,
    NgxPaginationModule

  ],
  declarations: [CostumerComponent,NumberOnlyDirective],
  providers: [
    CostumerService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],

})

export class CostumerModule {}
