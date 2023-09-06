import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Menu',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    // {
                    //   label: 'Mi Almacen', icon: 'pi pi-fw pi-bookmark',
                    //   items: [
                    //       { label: 'Datacom', icon: 'pi pi-fw pi-bookmark', routerLink: ['/mialmacen/materiales']  }
                    //   ]
                    // },
                    {
                      label: 'Materiales', icon: 'pi pi-fw pi-box',
                      items: [
                          { label: 'Proveedores', icon: 'pi pi-fw pi-truck', routerLink: ['/materiales/proveedores']  },
                          { label: 'Items', icon: 'pi pi-fw pi-list', routerLink: ['/materiales/items']  },
                          { label: 'Compras', icon: 'pi pi-fw pi-credit-card', routerLink: ['/materiales/compras/Pendientes']  }
                      ]
                    },
                    // { label: 'Permisos', icon: 'pi pi-fw pi-home', routerLink: ['/enlaces/'] },
            //         {
            //           label: 'Proveedores', icon: 'pi pi-fw pi-bookmark',
            //           items: [
            //               { label: 'Nuevo', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //               { label: 'Lista', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  }
            //           ]
            //         },
            //         {
            //           label: 'Items', icon: 'pi pi-fw pi-bookmark',
            //           items: [
            //             {
            //               label: 'Datacom', icon: 'pi pi-fw pi-bookmark',
            //               items: [
            //                   { label: 'Nuevo', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //                   { label: 'Lista', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  }
            //               ]
            //             },
            //             {
            //               label: 'Entel', icon: 'pi pi-fw pi-bookmark',
            //               items: [
            //                   { label: 'Nuevo', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //                   { label: 'Lista', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  }
            //               ]
            //             }
            //           ]
            //         },
            //         {
            //           label: 'Stock', icon: 'pi pi-fw pi-bookmark',
            //           items: [
            //             {
            //               label: 'Datacom', icon: 'pi pi-fw pi-bookmark',
            //               items: [
            //                   { label: 'Con serie', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //                   { label: 'Sin serie', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //                   { label: 'Lista', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  }
            //               ]
            //             },
            //             {
            //               label: 'Entel', icon: 'pi pi-fw pi-bookmark',
            //               items: [
            //                   { label: 'Nuevo', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //                   { label: 'Lista', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  }
            //               ]
            //             }
            //           ]
            //         },
            //         {
            //           label: 'Solicitud', icon: 'pi pi-fw pi-bookmark',
            //           items: [
            //               { label: 'Nuevo', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //               { label: 'Lista', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //               { label: 'Solicitudes Aprobadas', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  }
            //           ]
            //         },
            //         {
            //           label: 'Cuadrillas', icon: 'pi pi-fw pi-bookmark',
            //           items: [
            //               { label: 'Nuevo', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //               { label: 'Lista', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  }
            //           ]
            //         },
            //         {
            //           label: 'Cargas OTs', icon: 'pi pi-fw pi-bookmark',
            //           items: [
            //               { label: 'Excel', icon: 'pi pi-fw pi-home', routerLink: ['/enlaces/'] },
            //               { label: 'Manual', icon: 'pi pi-fw pi-home', routerLink: ['/enlaces/'] },
            //           ]
            //         },
            //         {
            //           label: 'Asignaciones', icon: 'pi pi-fw pi-bookmark',
            //           items: [
            //               { label: 'Lista', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //               { label: 'Asignacion', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //               { label: 'Stock Cuadrilla', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  }
            //           ]
            //         },
            //         { label: 'Devoluciones', icon: 'pi pi-fw pi-home', routerLink: ['/enlaces/'] },
            //         {
            //           label: 'Asignaciones OTs', icon: 'pi pi-fw pi-bookmark',
            //           items: [
            //               { label: 'Lista', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //               { label: 'Asignacion OTs', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //               { label: 'Cierre OTs', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  }
            //           ]
            //         },
            //         { label: 'Busquedas', icon: 'pi pi-fw pi-home', routerLink: ['/enlaces/'] },
            //         { label: 'Reportes', icon: 'pi pi-fw pi-home', routerLink: ['/enlaces/'] },
            //         {
            //           label: 'Reportes', icon: 'pi pi-fw pi-bookmark',
            //           items: [
            //               { label: 'General', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  },
            //               { label: 'Datacom', icon: 'pi pi-fw pi-bookmark', routerLink: ['/enlaces/']  }
            //           ]
            //         },
                ]
            },
            // {
            //     label: 'UI Components',
            //     items: [
            //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
            //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
            //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
            //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
            //         { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
            //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
            //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
            //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
            //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
            //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
            //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
            //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
            //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
            //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
            //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
            //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
            //     ]
            // },
            // {
            //     label: 'Prime Blocks',
            //     items: [
            //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
            //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Utilities',
            //     items: [
            //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
            //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
            //     ]
            // },
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         },
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
        ];
    }
}
