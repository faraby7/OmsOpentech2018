import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Factures} from "./Factures";
import {HttpClient} from "@angular/common/http";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ReglementClientService} from "./reglement-client.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {LigneFacture} from "./LigneFacture";
import {ReglementClient} from "./ReglementClient";
import {DatePipe} from "@angular/common";
import {pipe} from "rxjs/util/pipe";


declare const $: any;


@Component({
  selector: 'app-facture-provider',
  templateUrl: './reglement-client.component.html',
  styleUrls: ['./reglement-client.component.scss']
})
export class ReglementClientComponent {

    reglementData:any;
    ligneFactureData:any;
    m:number;
    allProduit:any;
    allProvider:any;
    title = 'app';
    position = 'bottom-right';
    msg: string;
    showClose = true;
    res :any;
    timeout = 5000;
    theme = 'bootstrap';
    type = 'default';
    closeOther = false;
    closeResult: string;

    pageSize = 0;
    pageNumber = 1;
    reglementPost:ReglementClient;
    myformSearch: FormGroup;

    Total =0;
    NombreReglement=0;

    DateEcheance:FormControl;
    ModePaiement:FormControl;
    date:any;



    constructor(private reglementProviderService: ReglementClientService, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) {

    }

    ngOnInit() {

        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            return [year, month, day].join('-');
        }
        this.date = new Date();
        this.reglementPost=  new ReglementClient();
        this.reglementPost.DateEcheance = formatDate(this.date);
        this.reglementPost.ModePaiement = null;
        this.reglementProviderService.searchReglement( this.reglementPost ).subscribe(ReglementPostconsole=>this.reglementData=ReglementPostconsole);
       this.searchpage();
        //this.getFactureProvider();
        this.createFormControls();
        this.createForm();

}


    getFactureProvider():void{
        this.reglementProviderService.getReglements().subscribe(ReglementPostconsole => this.reglementData=ReglementPostconsole);
    }

    search() {

        if (this.myformSearch.valid) {


            this.reglementPost=  new ReglementClient();
            this.reglementPost.DateEcheance = this.myformSearch.value['DateEcheance'];
            this.reglementPost.ModePaiement = this.myformSearch.value['ModePaiement'];
            this.reglementProviderService.searchReglement( this.reglementPost ).subscribe(ReglementPostconsole=>this.reglementData=ReglementPostconsole);



        }
    }

    sumpage(){



    }
    searchpage(){

        setTimeout(() => { this.pageSize= this.reglementData.length;}, 1000);


    }

    createFormControls() {
        this.ModePaiement = new FormControl('');
        this.DateEcheance = new FormControl('');

    }



    createForm() {
        this.myformSearch = new FormGroup({
            ModePaiement:this.ModePaiement,
            DateEcheance:this.DateEcheance,

        });
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

    opensm(content) {
        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
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


    pageChanged(pN: number): void {
        this.pageNumber = pN;
    }


    changeDate(date:string):string{

        return date.slice(0,10);


    }


}
