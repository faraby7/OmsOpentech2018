///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DetailDevisClientService} from "./detail-devis-client.service";
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
declare const $: any;

@Component({
  selector: 'app-detail-devis-provider',
  templateUrl: './detail-devis-client.component.html',
  styleUrls: ['./detail-devis-client.component.scss']
})
export class DetailDevisClientComponent {

    devisData:any;
    devis:any;
    ligneDevisData:any;
    ReglementFatureData:any;
    closeResult: string;
    allBanques:any;


    title = 'app';
    position = 'bottom-right';

    constructor(private detailDevisProviderService: DetailDevisClientService, private route: ActivatedRoute, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) {

    }

  ngOnInit() {

      this.getDevisClient();

  }

    getDevisClient():void{

        const id = +this.route.snapshot.paramMap.get('id');
        this.detailDevisProviderService.getDevisInfo(id).subscribe(devis =>{
            this.devisData=devis;
            console.log(this.devisData);
        } );
       this.getLigneDevis(id);
    }

    getLigneDevis(id:number):void{

        this.detailDevisProviderService.getLignesDevis(id).subscribe(lignedevis => this.ligneDevisData=lignedevis);
    }





    open(content) {
        this.modalService.open(content, {size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }


    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }




    addToast(options) {
        if (options.closeOther) {
            this.toastyService.clearAll();
        }
        this.position = options.position ? options.position : this.position;
        const toastOptions: ToastOptions = {
            title: options.title,
            msg: options.msg,
            showClose: options.showClose,
            timeout: options.timeout,
            theme: options.theme,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added removed!');
            }
        };

        switch (options.type) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }



}
