import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';
import { HttpClientModule} from '@angular/common/http';

import { HeroesComponent } from './heroes.component';
import {HeroesPageRoute} from './heroes.routing';
import {SharedModule} from '../shared/shared.module';
import {HeroService} from "./hero.service";
import {MessageService} from "./message.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(HeroesPageRoute),
    SharedModule
  ],
  declarations: [HeroesComponent],
  providers: [ HeroService, MessageService ],

})
export class HeroesModule { }
