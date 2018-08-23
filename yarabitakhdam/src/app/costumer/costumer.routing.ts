import { CostumerComponent } from "../costumer/costumer.component";
import {Routes} from "@angular/router";

export const CostumerPageroute: Routes = [{
  path: '',
  component: CostumerComponent,
  data: {
    breadcrumb: 'Liste des clients'
  }
}];
