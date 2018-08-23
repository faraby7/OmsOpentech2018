import { Component, OnInit } from '@angular/core';
import {InstallerService} from "./installer.service";
import {Installer} from "./Installer";

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styleUrls: ['./installer.component.css']
})
export class InstallerComponent {

  Installers: Installer[];


  constructor(private installer:InstallerService ) {
  }



     getInstallerAll() :void{
        this.installer.getInstaller().subscribe(installers => this.Installers = installers);
      }



}
