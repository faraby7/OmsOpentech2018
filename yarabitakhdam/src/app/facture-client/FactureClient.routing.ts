import {FactureClientComponent} from "./facture-client.component";

import {Routes} from "@angular/router";

export const FactureClientPageroute: Routes = [{
    path: '',
    component: FactureClientComponent,
    data: {
        breadcrumb: 'Facture Clients'
    }
}];
