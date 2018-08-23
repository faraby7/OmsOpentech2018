///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Factures} from "./Factures";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FactureProviderService} from "./facture-provider.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {by, element} from "protractor";
import {Produits} from "../BienEtService/produits/Produits";
import {LigneFacture} from "./LigneFacture";


declare const $: any;


@Component({
  selector: 'app-facture-provider',
  templateUrl: './facture-provider.component.html',
  styleUrls: ['./facture-provider.component.scss']
})
export class FactureProviderComponent {

    factureData:any;
    ligneFactureData:any;
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
    MovementID:FormControl;
    ProviderID:FormControl;
    DateFacture:FormControl;

    facturePost : Factures;
    ligneFacturePost : LigneFacture;


    //creatin facture provider


    myformligne:FormGroup;
    TVA:FormControl;
    Qte:FormControl;
    PUHT:FormControl;
    Reducation:FormControl;
    ProduitsID:FormControl;
    FactureID:FormControl;

    constructor(private factureProviderService: FactureProviderService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) {

    }

    ngOnInit() {

        this.getFactureProvider();
        this.createFormControls();
        this.createForm();
        this.createFormControlsUpdate();
        this.createFormUpdate();
        this.createFormControlesLigne();
        this.createFormLigne();
        this.getAllProvider();
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


    getFactureProvider():void{
        this.factureProviderService.getFactures().subscribe(facture => this.factureData=facture);
    }

    onSubmit() {

        if (this.myform.valid) {
            this.addToast({title:'Votre Facture est en cours', msg:'', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.facturePost=  new Factures();
            this.facturePost.RefFacture = this.myform.value['RefFacture'];
            this.facturePost.MontantHT = this.myform.value['MontantHT'];
            this.facturePost.MontantTVA = this.myform.value['MontantTVA'];
            this.facturePost.MontantTTC = this.myform.value['MontantTTC'];
            this.facturePost.NotePublic =this.myform.value['NotePublic'];
            this.facturePost.NotePriver =this.myform.value['NotePriver'];
            this.facturePost.EtatFacture = this.myform.value['EtatFacture'];
            this.facturePost.DateEcheance = this.myform.value['DateEcheance'];
            this.facturePost.MontantReglement=this.myform.value['MontantReglement'];
            this.facturePost.MovementID = this.myform.value['MovementID'];
            this.facturePost.ProviderID = this.myform.value['ProviderID'];
            this.facturePost.DateFacture=this.myform.value['DateFacture'];
            this.factureProviderService.addFacture( this.facturePost ).subscribe(facturePostconsole=>{
                    try {
                        if(typeof facturePostconsole.RefFacture!='undefined'){
                            this.addToast({title:'Votre Facture est ajouté à votre système', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myform.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                        }
                    }catch (e) {
                        this.addToast({title:'Votre Facture n\'est pas ajouté à votre système', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }

                }
            );
        }
    }
    onUpdate(id,RefFacture,MontantHT,MontantTVA,MontantTTC,NotePublic,NotePriver,EtatFacture ,DateEcheance,DateFacture,MontantReglement,MovementID,ProviderID){


        if (this.myformUpdate.valid) {

            this.addToast({title:'Votre Facture est en cours', msg:'', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.facturePost =  new Factures();
            this.facturePost.id = id;
            this.facturePost.RefFacture = this.myformUpdate.value['RefFacture'] ? this.myformUpdate.value['RefFacture']:RefFacture;
            this.facturePost.MontantHT = MontantHT;
            this.facturePost.MontantTVA = MontantTVA;
            this.facturePost.MontantTTC =MontantTTC;
            this.facturePost.NotePublic = this.myformUpdate.value['NotePublic'] ? this.myformUpdate.value['NotePublic']:NotePublic;
            this.facturePost.NotePriver = this.myformUpdate.value['NotePriver'] ? this.myformUpdate.value['NotePriver']:NotePriver;
            this.facturePost.EtatFacture = EtatFacture;
            this.facturePost.DateEcheance=this.myformUpdate.value['DateEcheance'] ? this.myformUpdate.value['DateEcheance']:DateEcheance;
            this.facturePost.DateFacture=this.myformUpdate.value['DateFacture'] ? this.myformUpdate.value['DateFacture']:DateFacture;
            this.facturePost.MontantReglement =MontantReglement;
            this.facturePost.ProviderID =ProviderID;
            this.facturePost.MovementID =MovementID;

            this.factureProviderService.updateFacture( this.facturePost ).subscribe(facturePostconsole=>{
                    try {
                        console.log(facturePostconsole.RefFacture);
                        if(typeof facturePostconsole.RefFacture=='undefined'){
                            this.addToast({title:'Votre Facture est modifié à votre système', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myform.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                        }
                    }catch (e) {
                        this.addToast({title:'Votre Facture n\'est pas modifié à votre système', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                    });
        }
    }

    delete(facture:Factures):void{

        this.addToast({title:'Votre Facture est en cours', msg:' ', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.factureProviderService.deleteFacture(facture).subscribe(produitPostconsole=>{

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


    onSubmitLigne(id:number) {
        this.myformligne.value['FactureID']=id;

        if (this.myformligne.valid) {
            this.addToast({title:'Votre Facture est en cours', msg:'', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.ligneFacturePost=  new LigneFacture();
            this.ligneFacturePost.TVA = this.myformligne.value['TVA'] ? this.myformligne.value['TVA']:0;
            this.ligneFacturePost.Qte = this.myformligne.value['Qte'];
            this.ligneFacturePost.PUHT = this.myformligne.value['PUHT'];
            this.ligneFacturePost.Reducation = this.myformligne.value['Reducation'] ? this.myformligne.value['Reducation']:0;
            this.ligneFacturePost.ProduitsID =this.myformligne.value['ProduitsID'];
            this.ligneFacturePost.FactureID =this.myformligne.value['FactureID'];
            //now
            this.factureProviderService.addLignesFacture( this.ligneFacturePost ).subscribe(factureLignePostconsole=>{
                    try {
                        if(typeof factureLignePostconsole.TVA!='undefined'){
                            this.factureProviderService.calculefacture(id).subscribe(fact=>{});
                            this.addToast({title:'Votre Facture est en cours', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myformligne.reset();
                            this.getLigneFacture(id);
                            setTimeout(() => {this.ngOnInit();}, 10);
                        }
                    }catch (e) {
                        this.addToast({title:'error "Something went wrong on the server"', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }

                }
            );
        }

    }

    deleteLigne(ligneFacture:LigneFacture):void{

        this.addToast({title:'Votre Ligne Facture est en cours', msg:' ', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.factureProviderService.deleteLignesFacture(ligneFacture).subscribe(produitPostconsole=>{

            try {
                if(typeof produitPostconsole.id =='undefined'){
                    this.factureProviderService.calculefacture(ligneFacture.FactureID).subscribe(fact=>{});
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


     getLigneFacture(id:number):void{
        this.factureProviderService.getLignesFacture(id).subscribe(lignefacture => this.ligneFactureData=lignefacture);
    }

    getAllProduit():void{
        this.factureProviderService.getallProduit().subscribe(produits => this.allProduit=produits);
    }

    getAllProvider():void{
        this.factureProviderService.getallProvider().subscribe(providers => this.allProvider=providers);
    }



    createFormControls() {
        this.RefFacture = new FormControl('');
        this.NotePublic = new FormControl('');
        this.NotePriver = new FormControl('');
        this.MontantTVA = new FormControl('');
        this.MontantHT = new FormControl('');
        this.MontantTTC = new FormControl('');
        this.MovementID = new FormControl('');
        this.EtatFacture = new FormControl(0);
        this.DateEcheance = new FormControl('');
        this.MontantReglement = new FormControl('');
        this.DateFacture = new FormControl('');
        this.ProviderID = new FormControl('');
    }



    createForm() {
        this.myform = new FormGroup({
            RefFacture:this.RefFacture,
            NotePublic:this.NotePublic,
            NotePriver:this.NotePriver,
            MontantTVA:this.MontantTVA,
            MontantHT:this.MontantHT,
            MontantTTC:this.MontantTTC,
            MovementID:this.MovementID,
            ProviderID:this.ProviderID,
            EtatFacture:this.EtatFacture,
            DateEcheance:this.DateEcheance,
            MontantReglement:this.MontantReglement,
            DateFacture:this.DateFacture,
        });
    }
    createFormControlesLigne(){
        this.TVA = new FormControl('');
        this.Qte = new FormControl('');
        this.PUHT = new FormControl('');
        this.Reducation = new FormControl('');
        this.ProduitsID = new FormControl('');
        this.FactureID = new FormControl('');
    }

    createFormLigne(){
        this.myformligne = new FormGroup({
            TVA:this.TVA,
            Qte:this.Qte,
            PUHT:this.PUHT,
            Reducation:this.Reducation,
            ProduitsID:this.ProduitsID,
            FactureID:this.FactureID,
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
        this.MovementID = new FormControl('');
        this.ProviderID = new FormControl('');
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
            MovementID:this.MovementID,
            ProviderID:this.ProviderID,
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
