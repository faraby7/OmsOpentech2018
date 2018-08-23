import {FactureClientInterventionComponent} from "./facture-client-intervention.component";

import {Routes} from "@angular/router";

export const FactureClientInterventionPageroute: Routes = [{
    path: '',
    component: FactureClientInterventionComponent,
    data: {
        breadcrumb: 'Facture Clients Interventions'
    }
}];
