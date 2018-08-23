import { BanqueComponent } from "./banque.component";
import {Routes} from "@angular/router";

export const BanquePageroute: Routes = [{
    path: '',
    component: BanqueComponent,
    data: {
        breadcrumb: 'Banque'
    }
}];
