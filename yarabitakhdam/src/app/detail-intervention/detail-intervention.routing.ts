import {IntervenantComponent} from "../intervenant/intervenant.component";
import {Routes} from "@angular/router";
import {DetailInterventionComponent} from "./detail-intervention.component";

export const Detail_interventionPageroute: Routes = [{
    path: '',
    component: DetailInterventionComponent,
    data: {
        breadcrumb: 'Detail Intervention Page'
    }
}];