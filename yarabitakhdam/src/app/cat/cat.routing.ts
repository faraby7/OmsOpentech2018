import { Routes } from '@angular/router';
import {CatComponent} from "./cat.component";

export const CatPageRoute: Routes = [{
  path: '',
  component: CatComponent,
  data: {
    breadcrumb: 'Categorie Page'
  }
}];
