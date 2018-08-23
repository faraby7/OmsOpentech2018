import { Routes } from '@angular/router';
import {ProduitsComponent} from "./produits/produits.component";
import {ServicesComponent} from "./services/services.component";

export const BienEtServiceRoute: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'Bien et service',
            status: false
        },
        children: [
            {
                path: 'bien',
                component: ProduitsComponent,
                data: {
                    breadcrumb: 'Les Produits',
                    status: true
                }
            }, {
                path: 'service',
                component: ServicesComponent,
                data: {
                    breadcrumb: 'Les Services',
                    status: true
                }
            }
        ]
    }
];
