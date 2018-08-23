import {Routes} from "@angular/router";
import {ReglementProviderComponent} from "./reglement-provider.component";

export const ReglementProviderPageroute: Routes = [{
    path: '',
    component: ReglementProviderComponent,
    data: {
        breadcrumb: 'Reglement Fournisseurs'
    }
}];
