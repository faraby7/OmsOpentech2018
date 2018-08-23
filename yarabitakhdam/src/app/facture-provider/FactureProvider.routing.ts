import { FactureProviderComponent } from "../facture-provider/facture-provider.component";
import {Routes} from "@angular/router";

export const FactureProviderPageroute: Routes = [{
    path: '',
    component: FactureProviderComponent,
    data: {
        breadcrumb: 'Facture Fournisseurs'
    }
}];
