import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

import { CatComponent } from './cat.component';
import {CatPageRoute} from './cat.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(CatPageRoute),
    SharedModule
  ],
  declarations: [CatComponent]
})
export class CatModule { }
