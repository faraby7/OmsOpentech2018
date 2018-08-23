import { ProviderComponent } from "../provider/provider.component";
import {Routes} from "@angular/router";

export const ProviderPageroute: Routes = [{
  path: '',
  component: ProviderComponent,
  data: {
    breadcrumb: 'Liste des fournisseurs'
  }
}];
