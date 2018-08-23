import {Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {DetailsFactureProviderModule} from "./detail-facture-provider/detailsFactureProvider.module";



export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'

    },{
          path: 'installer',
          loadChildren: './installer/installer.module#InstallerModule'
    },{
          path: 'table',
          loadChildren: './table/table.module#TableModule'
    },{
          path: 'provider',
          loadChildren: './provider/provider.module#ProviderModule'
    },{
          path: 'costumer',
          loadChildren: './costumer/costumer.module#CostumerModule'
    },{
          path: 'FactureProvider',
          loadChildren: './facture-provider/factureProvider.module#FactureProviderModule'
    },{
          path: 'ReglementProvider',
          loadChildren: './reglement-provider/reglementProvider.module#ReglementProviderModule'
    },{
          path: 'DetailFacture/:id',
          loadChildren: './detail-facture-provider/detailsFactureProvider.module#DetailsFactureProviderModule'
    },{
          path: 'DetailFactureClient/:id',
          loadChildren: './detail-facture-client/detailsFactureClient.module#DetailsFactureClientModule'
    },{
          path: 'DetailFactureInterventionClient/:id',
          loadChildren: './detail-facture-intervention-client/detailsFactureClient.module#DetailsFactureClientModule'
      },

      {
          path: 'FactureClient',
          loadChildren: './facture-client/factureClient.module#FactureClientModule'
    },
   {
          path: 'FactureClientIntervention',
          loadChildren: './facture-client-intervention/factureClientIntervention.module#FactureClientInterventionModule'
   },{
          path: 'FactureIntervention',
          loadChildren: './Facturation-Intervention/interventionNonFacture.module#InterventionNonFactureModule'
    },{
          path: 'DetailDevisClient/:id',
          loadChildren: './detail-devis-client/detailsDevisClient.module#DetailsDevisClientModule'
    },{
          path: 'DevisClient',
          loadChildren: './devis-client/devisClient.module#DevisClientModule'
    },{
          path: 'ReglementClient',
          loadChildren: './reglement-client/reglementClient.module#ReglementClientModule'
    },{
          path: 'bordereau',
          loadChildren: './bordereau-reglement/reglementClient.module#ReglementClientModule'
    },{
          path: 'banque',
          loadChildren: './Banque/banque.module#BanqueModule'
    },{
          path: 'dashboard',
          loadChildren: './dashboard/dashboard.module#DashboardModule'
    },{
          path: 'vehicule',
          loadChildren: './vehicule/vehicule.module#VehiculeModule'
    },{
          path: 'bienetservice',
          loadChildren: './BienEtService/produits.module#ProduitsModule'
    },{
          path: 'basic',
          loadChildren: './components/basic/basic.module#BasicModule'
    },{
          path: 'intervenant' ,
          loadChildren: './intervenant/intervenant.module#IntervenantModule'

    },{
          path: 'detail_intervention/:id',
          loadChildren: './detail-intervention/detail-intervention.module#DetailInterventionModule'
          // component:DetailInterventionComponent
      },{
          path: 'advance',
          loadChildren: './components/advance/advance.module#AdvanceModule'
    },{
          path: 'forms',
          loadChildren: './components/forms/forms.module#FormsModule'
    }, {
          path: 'bootstrap-table',
          loadChildren: './components/tables/bootstrap-table/bootstrap-table.module#BootstrapTableModule',
    },{
          path: 'map',
          loadChildren: './map/map.module#MapModule',
    },{
          path: 'simple-page',
          loadChildren: './simple-page/simple-page.module#SimplePageModule'
    },{
          path: 'heroes',
          loadChildren: './heroes/heroes.module#HeroesModule'
    }
  ]
},{
          path: '',
          component: AuthLayoutComponent,
  children: [
    {
           path: 'authentication',
           loadChildren: './authentication/authentication.module#AuthenticationModule'
    }
  ]
}, {
           path: '**',
           redirectTo: 'error/404'
}];
