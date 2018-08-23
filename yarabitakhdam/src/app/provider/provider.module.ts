import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA,} from '@angular/core';

import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import { ProviderPageroute } from "../provider/provider.routing";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {ProviderComponent} from "./provider.component";
import {ProviderService} from "./provider.service";
import {AgGridModule} from "ag-grid-angular";
import { NgxPaginationModule } from 'ngx-pagination';
import { NumberOnlyDirective } from './number.directive';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(ProviderPageroute),
    SharedModule,
    NgxPaginationModule

  ],
  declarations: [ProviderComponent, NumberOnlyDirective],
  providers: [
    ProviderService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA],
})

export class ProviderModule {}
