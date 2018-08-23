import {Routes} from "@angular/router";
import {InterventionNonFactureComponent} from "./intervention-non-facture-component";


export const InterventionNonFacturePageroute: Routes = [{
    path: '',
    component: InterventionNonFactureComponent,
    data: {
        breadcrumb: 'Facturation Intervention'
    }
}];
