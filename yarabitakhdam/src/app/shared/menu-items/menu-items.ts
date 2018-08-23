import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
    {
        label: 'Administration',
        main: [

        ]
    },
    {
        label: 'Tiers',
        main: [

            {
                state: 'provider',
                name: 'Fournisseurs',
                type: 'link',
                icon: 'ti-user'
            },{
                state: 'costumer',
                name: 'Clients',
                type: 'link',
                icon: 'ti-user'
            },
        ],
    },
    {
    label: 'Gestion Des Produits',
    main: [
     {
            state: 'bienetservice',
            name: 'Bien & Service',
            type: 'sub',
            icon: 'ti-layout-grid2-alt',
            children: [
                {
                    state: 'bien',
                    name: 'Bien'
                },
                {
                    state: 'service',
                    name: 'Service'
                }
            ]
        },

    ]
  },{
        label: 'Gestion Commerciale',
        main: [

            {
                state: 'DevisClient',
                name: 'Devis Client',
                type: 'link',
                icon: 'ti-check-box'
            },

        ],
    },
    {
        label: 'Gestion De Stock',
        main: [

        ],
    },{
        label: 'Gestion Technique',
        main: [

            {
                state: 'vehicule',
                name: 'Vehicule',
                type: 'link',
                icon: 'ti-car'
            }, {
                state: 'intervenant',
                name: 'Intervention',
                type: 'link',
                icon: 'ti-settings'
            },{
                state: 'FactureIntervention',
                name: 'Intervention Non Facturer',
                type: 'link',
                icon: 'ti-list'
            }
        ],
    },{
        label: 'Gestion financiere',
        main: [

            {
                state: 'FactureClientIntervention',
                name: 'Facture Client Intervention',
                type: 'link',
                icon: 'ti-file'
            },{
                state: 'FactureClient',
                name: 'Facture Client',
                type: 'link',
                icon: 'ti-write'
            },{
                state: 'ReglementClient',
                name: 'Reglement Client',
                type: 'link',
                icon: 'ti-money'
            },{
                state: 'bordereau',
                name: 'Bordereau',
                type: 'link',
                icon: 'ti-export'
            },{
                state: 'FactureProvider',
                name: 'Facture Fournisseur',
                type: 'link',
                icon: 'ti-write'
            },{
                state: 'ReglementProvider',
                name: 'Reglement Fournisseur',
                type: 'link',
                icon: 'ti-money'
            },
        ],
    },{
        label: 'Comptes bancaires',
        main: [
            {
                state: 'banque',
                name: 'Banque',
                type: 'link',
                icon: 'ti-shortcode'
            }
        ],
    },
    {
        label: 'Planification',
        main: [

        ],
    },

    /*
  {
    label: 'Clients',
    main: [
      {
        state: 'map',
        name: 'Maps',
        type: 'link',
        icon: 'ti-map-alt'
      },
      {
        state: 'authentication',
        name: 'Authentication',
        type: 'sub',
        icon: 'ti-id-badge',
        children: [
          {
            state: 'login',
            type: 'link',
            name: 'Login',
            target: true
          },
          {
            state: 'forgot',
            name: 'Forgot Password',
            target: true
          },
          {
            state: 'lock-screen',
            name: 'Lock Screen',
            target: true
          },
        ]
      },{
            state: 'forms',
            name: 'CLIENTS',
            type: 'link',
            icon: 'ti-layers'
        },
        {
            state: 'bootstrap-table',
            name: 'Bootstrap Table',
            type: 'link',
            icon: 'ti-receipt'
        },
      {
        state: 'simple-page',
        name: 'VEHICLES',
        type: 'link',
        icon: 'ti-layout-sidebar-left'
      },
      {
        state: 'simple-page',
        name: 'INTERVENTION',
        type: 'link',
        icon: 'ti-layout-sidebar-left'
      },
      {
        state: 'simple-page',
        name: 'INSTALLATIONS',
        type: 'link',
        icon: 'ti-layout-sidebar-left'
      },
      {
        state: 'simple-page',
        name: 'UTILISATEURS',
        type: 'link',
        icon: 'ti-layout-sidebar-left'
      }, {
            state: 'basic',
            name: 'STOCK',
            type: 'sub',
            icon: 'ti-layout-grid2-alt',
            children: [
                {
                    state: 'breadcrumb',
                    name: 'Boitier'
                },
                {
                    state: 'button',
                    name: 'Carte Sim'
                }
            ]
        },

        {
            state: 'advance',
            name: 'COMMANDES',
            type: 'link',
            icon: 'ti-crown'
        },
    ]
  }*/
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
