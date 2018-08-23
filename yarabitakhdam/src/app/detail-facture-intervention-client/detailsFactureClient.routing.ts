import { DetailFactureClientComponent } from "./detail-facture-client.component";
import {Routes} from "@angular/router";

export const DetailFactureClientPageroute: Routes = [{
    path: '',
    component: DetailFactureClientComponent,
    data: {
        breadcrumb: 'Detail Facture Client'
    }
}];
