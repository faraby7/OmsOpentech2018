import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {InstallerPageroute} from "../installer/installer.routing";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";
import {InstallerComponent} from "./installer.component";
import {InstallerService} from "./installer.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(InstallerPageroute),
    SharedModule
  ],
  declarations: [InstallerComponent],
    providers: [
        InstallerService
    ]})

export class InstallerModule {}
