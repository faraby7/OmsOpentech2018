import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Factures} from "./Factures";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FactureClientInterventionService} from "./facture-client-intervention.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {LigneFacture} from "./LigneFacture";


declare const $: any;


@Component({
  selector: 'app-facture-client',
  templateUrl: './facture-client-intervention.component.html',
  styleUrls: ['./facture-client-intervention.component.scss']
})

export class FactureClientInterventionComponent {

    factureData:any;
    factureData1:any;
    ligneFactureData:any;
    allProduit:any;
    allClient:any;
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

    pageSize = 5;
    pageNumber = 1;

    myform: FormGroup;
    myformUpdate: FormGroup;
    id:FormControl;
    RefFacture:FormControl;
    MontantHT:FormControl;
    MontantTVA:FormControl;
    MontantTTC:FormControl;
    NotePublic:FormControl;
    NotePriver:FormControl;
    EtatFacture:FormControl;
    DateEcheance:FormControl;
    MontantReglement:FormControl;
    ClientID:FormControl;
    DateFacture:FormControl;

    facturePost : Factures;
    ligneFacturePost : LigneFacture;


    //creatin facture provider

   test2 : Factures;
    myformligne:FormGroup;
    Reducation:FormControl;
    DetailInterventionID:FormControl;
    FactureID:FormControl;
    StartDateSIM:FormControl;
    EndDateSIM:FormControl;
    PUHT:FormControl;
    TVA:FormControl;
    PrixParMois:FormControl;
    DescriptionFactureLigne:FormControl;


    constructor(private factureClientService: FactureClientInterventionService, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) {

    }

    ngOnInit() {


        this.getFactureClient();
        this.createFormControls();
        this.createForm();
        this.createFormControlsUpdate();
        this.createFormUpdate();
        this.createFormControlesLigne();
        this.createFormLigne();
        this.getallClient();
            $('.table-filters input').on('input', function () {
                filterTable($(this).parents('table'));
            });
            $('.table-filters select').click('select', function () {
                filterTable($(this).parents('table'));
            });

            function filterTable($table) {
                var $filters = $table.find('.table-filters th');
                var $rows = $table.find('.table-data');
                $rows.each(function (rowIndex) {
                    var valid = true;
                    $(this).find('td').each(function (colIndex) {
                        if ($filters.eq(colIndex).find('input').val()) {
                            if ($(this).html().toLowerCase().indexOf(
                                $filters.eq(colIndex).find('input').val().toLowerCase()) == -1) {
                                valid = valid && false;
                            }
                        }
                        if ($filters.eq(colIndex).find('select').val()) {
                            if ($(this).html().toLowerCase().indexOf(
                                $filters.eq(colIndex).find('select').val().toLowerCase()) == -1) {
                                valid = valid && false;
                            }
                        }
                    });
                    if (valid === true) {
                        $(this).css('display', '');
                    } else {
                        $(this).css('display', 'none');
                    }
                });
            }
}


    getFactureClient():void{
        this.factureClientService.getFactures().subscribe(facture => this.factureData=facture);
    }


    pdfFactureClientIntervention(id:number):void{
        this.factureClientService.FacturePdf(id).subscribe(facture => {
            console.log('test');
            console.log(facture);
            window.open('http://localhost:8000/api/FactureClientIntervention/pdf/'+id,"_self")

         },
        error1 => {
            console.log(error1);
        }
         );
    }

    delete(facture:Factures):void{

        this.addToast({title:'Votre Facture est en cours', msg:' ', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.factureClientService.deleteFacture(facture).subscribe(produitPostconsole=>{

            try {

                if(typeof produitPostconsole.RefFacture =='undefined'){
                    this.addToast({title:'Votre Facture est supprimé ', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    setTimeout(() => {this.ngOnInit();}, 1000);
                }
            }catch (e) {
                console.log(e);
                this.addToast({title:'error "Something went wrong on the server"', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
    }


    close(facture:Factures):void{

        this.addToast({title:'Votre Facture est en cours', msg:' ', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.factureClientService.closeFacture(facture).subscribe(produitPostconsole=>{

            try {


                    this.addToast({title:'Votre Facture est supprimé ', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    setTimeout(() => {this.ngOnInit();}, 1000);

            }catch (e) {
                console.log(e);
                this.addToast({title:'error "Something went wrong on the server"', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
    }

    deleteLigne(ligneFacture:LigneFacture):void{

        this.addToast({title:'Votre Ligne Facture est en cours', msg:' ', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.factureClientService.deleteLignesFacture(ligneFacture).subscribe(produitPostconsole=>{

            try {
                if(typeof produitPostconsole.id =='undefined'){
                    this.factureClientService.calculefacture(ligneFacture.FactureID).subscribe(fact=>{});
                    this.addToast({title:'Votre Ligne Facture est supprimé ', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    this.getLigneFacture(ligneFacture.FactureID);
                    setTimeout(() => {this.ngOnInit();}, 1000);

                }
            }catch (e) {
                console.log(e);
                this.addToast({title:'error "Something went wrong on the server"', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });


    }



    onSubmitLigne(id:number,DetailInterventionID:number,FactureID:number,StartDateSIM:string,EndDateSIM:string,PUHT:number,TVA:number,DescriptionFactureLigne:string,PrixParMois:number) {



        console.log(this.myformligne.value['PUHT']);
        if (this.myformligne.valid) {
            this.addToast({title:'Votre Facture est en cours', msg:'', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.ligneFacturePost=  new LigneFacture();
            this.ligneFacturePost.id = id;
            this.ligneFacturePost.Reducation = this.myformligne.value['Reducation'] ? this.myformligne.value['Reducation']:0;
            this.ligneFacturePost.DetailInterventionID = DetailInterventionID;
            this.ligneFacturePost.FactureID =FactureID;
            this.ligneFacturePost.StartDateSIM = this.myformligne.value['StartDateSIM'] ? this.myformligne.value['StartDateSIM']:StartDateSIM;
            this.ligneFacturePost.EndDateSIM = this.myformligne.value['EndDateSIM'] ? this.myformligne.value['EndDateSIM']:EndDateSIM;
            this.ligneFacturePost.PUHT = this.myformligne.value['PUHT'] ? this.myformligne.value['PUHT']:PUHT;
            this.ligneFacturePost.TVA = this.myformligne.value['TVA'] ? this.myformligne.value['TVA']:TVA;
            this.ligneFacturePost.PrixParMois = this.myformligne.value['PrixParMois'] ? this.myformligne.value['PrixParMois']:PrixParMois;
            this.ligneFacturePost.DescriptionFactureLigne = this.myformligne.value['DescriptionFactureLigne'] ? this.myformligne.value['DescriptionFactureLigne']:DescriptionFactureLigne;
            //now
            this.factureClientService.UpdateLignesFacture( this.ligneFacturePost ).subscribe(factureLignePostconsole=>{
                    try {

                            this.factureClientService.calculefacture(FactureID).subscribe(fact=>{});
                            this.addToast({title:'Votre Facture est en cours', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myformligne.reset();
                             this.getLigneFacture(FactureID);
                             setTimeout(() => {this.ngOnInit();}, 1000);



                    }catch (e) {
                        this.addToast({title:'error "Something went wrong on the server"', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }

                }
            );
        }

    }


     getLigneFacture(id:number):void{
        this.factureClientService.getLignesFacture(id).subscribe(lignefacture => this.ligneFactureData=lignefacture);
    }

    getAllProduit():void{
        this.factureClientService.getallProduit().subscribe(produits => this.allProduit=produits);
    }

    getallClient():void{
        this.factureClientService.getallClient().subscribe(clients => this.allClient=clients);
    }



    createFormControls() {
        this.RefFacture = new FormControl('');
        this.NotePublic = new FormControl('');
        this.NotePriver = new FormControl('');
        this.MontantTVA = new FormControl('');
        this.MontantHT = new FormControl('');
        this.MontantTTC = new FormControl('');
        this.EtatFacture = new FormControl(0);
        this.DateEcheance = new FormControl('');
        this.MontantReglement = new FormControl('');
        this.DateFacture = new FormControl('');
        this.ClientID = new FormControl('');
    }



    createForm() {
        this.myform = new FormGroup({
            RefFacture:this.RefFacture,
            NotePublic:this.NotePublic,
            NotePriver:this.NotePriver,
            MontantTVA:this.MontantTVA,
            MontantHT:this.MontantHT,
            MontantTTC:this.MontantTTC,
            ClientID:this.ClientID,
            EtatFacture:this.EtatFacture,
            DateEcheance:this.DateEcheance,
            MontantReglement:this.MontantReglement,
            DateFacture:this.DateFacture,
        });
    }
    createFormControlesLigne(){
        this.Reducation = new FormControl('');
        this.StartDateSIM = new FormControl(null);
        this.EndDateSIM = new FormControl(null);
        this.PUHT = new FormControl(null);
        this.TVA = new FormControl(null);
        this.PrixParMois = new FormControl(null);
        this.DescriptionFactureLigne = new FormControl(null);
    }

    createFormLigne(){
        this.myformligne = new FormGroup({
            Reducation:this.Reducation,
            StartDateSIM:this.StartDateSIM,
            EndDateSIM:this.EndDateSIM,
            PUHT:this.PUHT,
            TVA:this.TVA,
            PrixParMois:this.PrixParMois,
            DescriptionFactureLigne:this.DescriptionFactureLigne,

    });
    }

    createFormControlsUpdate() {
        this.id = new FormControl('');
        this.RefFacture = new FormControl('');
        this.NotePublic = new FormControl('');
        this.NotePriver = new FormControl('');
        this.MontantTVA = new FormControl('');
        this.MontantHT = new FormControl('');
        this.MontantTTC = new FormControl('');
        this.ClientID = new FormControl('');
        this.EtatFacture = new FormControl('');
        this.DateEcheance = new FormControl('');
        this.MontantReglement = new FormControl('');
        this.DateFacture = new FormControl('');

    }

    createFormUpdate() {
        this.myformUpdate = new FormGroup({
            id:this.id,
            RefFacture:this.RefFacture,
            NotePublic:this.NotePublic,
            NotePriver:this.NotePriver,
            MontantTVA:this.MontantTVA,
            MontantHT:this.MontantHT,
            MontantTTC:this.MontantTTC,
            ClientID:this.ClientID,
            EtatFacture:this.EtatFacture,
            DateEcheance:this.DateEcheance,
            MontantReglement:this.MontantReglement,
            DateFacture:this.DateFacture,
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


    openFacture(content,id:number) {
        this.ligneFactureData=[];
        this.allProduit=[];
        this.getLigneFacture(id);
        this.getAllProduit();
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
    resizepage(){
        this.pageSize= this.factureData.length;
    }

    changeDate(date:string):string{

        return date.slice(0,10);


    }


}
