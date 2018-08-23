import {InstallerComponent} from "../installer/installer.component";
import {Routes} from "@angular/router";

export const InstallerPageroute: Routes = [{
  path: '',
  component: InstallerComponent,
  data: {
    breadcrumb: 'Installer Page'
  }
}];
