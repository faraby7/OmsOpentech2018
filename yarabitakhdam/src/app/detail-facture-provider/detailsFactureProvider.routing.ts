import { DetailFactureProviderComponent } from "./detail-facture-provider.component";
import {Routes} from "@angular/router";

export const DetailFactureProviderPageroute: Routes = [{
    path: '',
    component: DetailFactureProviderComponent,
    data: {
        breadcrumb: 'Detail Facture Provider Page'
    }
}];
