import { VehiculeComponent } from "./vehicule.component";
import {Routes} from "@angular/router";

export const VehiculePageroute: Routes = [{
    path: '',
    component: VehiculeComponent,
    data: {
        breadcrumb: 'Vehicules Page'
    }
}];
