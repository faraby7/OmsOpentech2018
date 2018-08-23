import { Routes } from '@angular/router';
import {HeroesComponent} from './heroes.component';

export const HeroesPageRoute: Routes = [{
  path: '',
  component: HeroesComponent,
  data: {
    breadcrumb: 'heroes Page'
  }
}];
