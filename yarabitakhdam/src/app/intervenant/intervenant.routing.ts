import {Routes} from "@angular/router";
import {IntervenantComponent} from "./intervenant.component";

export const IntervenantPageroute: Routes = [{
    path: '',
    component: IntervenantComponent,
    data: {
        breadcrumb: 'Intervenant Page'
    }
}];