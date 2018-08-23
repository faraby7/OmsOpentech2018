///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Produits} from "./Produits";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {ServicesService} from "./services.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {by, element} from "protractor";


declare const $: any;


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent{


    /* pagination Info */
    pageSize = 5;
    pageNumber = 1;
    produitData:any;
    produit: Produits[];
    produitPost : Produits;
    title = 'app';
    position = 'bottom-right';
    msg: string;
    showClose = true;
    timeout = 5000;
    theme = 'bootstrap';
    type = 'default';
    closeOther = false;
    myform: FormGroup;
    myformUpdate: FormGroup;
    id:FormControl;
    RefProduit:FormControl;
    NomProduit:FormControl;
    DescriptionProduit:FormControl;
    DescriptionFacture:FormControl;
    PrixVente:FormControl;
    PrixVenteMin:FormControl;
    TauxTVA:FormControl;
    TypeProduit:FormControl;
    Type:FormControl;
    EtatVente:FormControl;
    EtatAchat:FormControl;

    closeResult: string;

    constructor(private produitService: ServicesService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) {

    }

    resizepage(){
        this.pageSize= this.produitData.length;
    }

    ngOnInit() {

        this.getProduit();
        this.createFormControls();
        this.createForm();
        this.createFormControlsUpdate();
        this.createFormUpdate();

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

    getProduit():void{
        this.produitService.getProduits().subscribe(produit => this.produitData=produit);
    }



    pageChanged(pN: number): void {
        this.pageNumber = pN;
    }

    inputText(event){
        var val = $("textarea#DescriptionProduit").val();
        val = val.replace(/[^\w]+/g, " ");
        $("textarea#DescriptionFacture").val(val);
    }
    createFormControls() {
        this.RefProduit = new FormControl('', Validators.required);
        this.NomProduit = new FormControl('');
        this.DescriptionProduit = new FormControl('');
        this.DescriptionFacture = new FormControl('');
        this.PrixVente = new FormControl('');
        this.PrixVenteMin = new FormControl('');
        this.TauxTVA = new FormControl('');
        this.TypeProduit = new FormControl('S');
        this.Type = new FormControl('1');
        this.EtatVente = new FormControl('');
        this.EtatAchat = new FormControl('');

    }
    createFormControlsUpdate() {
        this.id = new FormControl('');
        this.RefProduit = new FormControl('');
        this.NomProduit = new FormControl('');
        this.DescriptionProduit = new FormControl('');
        this.DescriptionFacture = new FormControl('');
        this.PrixVente = new FormControl('');
        this.PrixVenteMin = new FormControl('');
        this.TauxTVA = new FormControl('');
        this.TypeProduit = new FormControl('');
        this.EtatVente = new FormControl('');
        this.EtatAchat = new FormControl('');
    }
    createForm() {
        this.myform = new FormGroup({
            RefProduit:this.RefProduit,
            NomProduit:this.NomProduit,
            DescriptionProduit:this.DescriptionProduit,
            DescriptionFacture:this.DescriptionFacture,
            PrixVente:this.PrixVente,
            PrixVenteMin:this.PrixVenteMin,
            TauxTVA:this.TauxTVA,
            TypeProduit:this.TypeProduit,
            Type:this.Type,
            EtatVente:this.EtatVente,
            EtatAchat:this.EtatAchat,
        });
    }
    createFormUpdate() {
        this.myformUpdate = new FormGroup({
            id:this.id,
            RefProduit:this.RefProduit,
            NomProduit:this.NomProduit,
            DescriptionProduit:this.DescriptionProduit,
            DescriptionFacture:this.DescriptionFacture,
            PrixVente:this.PrixVente,
            PrixVenteMin:this.PrixVenteMin,
            TauxTVA:this.TauxTVA,
            TypeProduit:this.TypeProduit,
            EtatVente:this.EtatVente,
            EtatAchat:this.EtatAchat,
        });
    }

    onSubmit() {

        if (this.myform.valid) {
            this.addToast({title:'Votre service '+this.myform.value['NomProduit']+' est en cours', msg:'', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.produitPost=  new Produits();
            this.produitPost.RefProduit = this.myform.value['RefProduit'];
            this.produitPost.NomProduit = this.myform.value['NomProduit'];
            this.produitPost.DescriptionProduit = this.myform.value['DescriptionProduit'];
            this.produitPost.DescriptionFacture = this.myform.value['DescriptionFacture'];
            this.produitPost.PrixVente =this.myform.value['PrixVente'];
            this.produitPost.PrixVenteMin = this.myform.value['PrixVenteMin'];
            this.produitPost.TauxTVA = this.myform.value['TauxTVA'];
            this.produitPost.EtatVente= this.myform.value['EtatVente'];
            this.produitPost.TypeProduit = this.myform.value['TypeProduit'];
            this.produitPost.type = 1;
            this.produitPost.EtatAchat= this.myform.value['EtatAchat'];
            this.produitService.addProduct( this.produitPost ).subscribe(produitPostconsole=>{
                try {
                    if(typeof produitPostconsole.RefProduit!='undefined'){
                        this.addToast({title:'Votre service '+this.myform.value['NomProduit']+' est ajouté à votre système', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                        this.myform.reset();
                        setTimeout(() => {this.ngOnInit();}, 1000);
                    }
                }catch (e) {
                    this.addToast({title:'Votre service'+this.myform.value['NomProduit']+' n\'est pas ajouté à votre système', msg:'error "Something went wrong on the server"', timeout: 12000, theme:'bootstrap', position:'top-right', type:'error'});
                } }
            );}
    }
    onUpdate(id,EtatVente,EtatAchat,TypeProduit,RefProduit,NomProduit,DescriptionProduit,DescriptionFacture,PrixVente,PrixVenteMin,TauxTVA){

        if (this.myformUpdate.valid) {
            this.addToast({title:'Votre service '+NomProduit+' est en cours', msg:'', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.produitPost=  new Produits();
            this.produitPost.id = id;
            this.produitPost.RefProduit = this.myformUpdate.value['RefProduit'] ? this.myformUpdate.value['RefProduit']:RefProduit;
            this.produitPost.NomProduit = this.myformUpdate.value['NomProduit'] ? this.myformUpdate.value['NomProduit']:NomProduit;
            this.produitPost.DescriptionProduit = this.myformUpdate.value['DescriptionProduit'] ? this.myformUpdate.value['DescriptionProduit']:DescriptionProduit;
            this.produitPost.DescriptionFacture = this.myformUpdate.value['DescriptionFacture'] ? this.myformUpdate.value['DescriptionFacture']:DescriptionFacture;
            this.produitPost.PrixVente = this.myformUpdate.value['PrixVente'] ? this.myformUpdate.value['PrixVente']:PrixVente;
            this.produitPost.PrixVenteMin = this.myformUpdate.value['PrixVenteMin'] ? this.myformUpdate.value['PrixVenteMin']:PrixVenteMin;
            this.produitPost.TauxTVA = this.myformUpdate.value['TauxTVA'] ? this.myformUpdate.value['TauxTVA']:TauxTVA;
            this.produitPost.EtatVente=this.myformUpdate.value['EtatVente'] ? this.myformUpdate.value['EtatVente']:EtatVente;
            this.produitPost.EtatAchat=this.myformUpdate.value['EtatAchat'] ? this.myformUpdate.value['EtatAchat']:EtatAchat;
            this.produitPost.TypeProduit =TypeProduit;

            this.produitService.updateProduit( this.produitPost ).subscribe(produitPostconsole=>{
                try {
                    console.log(produitPostconsole.RefProduit);
                    if(typeof produitPostconsole.RefProduit=='undefined'){
                        this.addToast({title:'Votre service '+NomProduit+' est modifié à votre système', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                        this.myform.reset();
                        setTimeout(() => {this.ngOnInit();}, 1000);
                    }
                }catch (e) {

                    this.addToast({title:'Votre service n\'est pas modifié à votre système', msg:'error "Something went wrong on the server"', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                }}
            );}
    }

    delete(produit:Produits):void{


        this.produitService.deleteProduit(produit).subscribe(produitPostconsole=>{
            try {
                this.addToast({title:'Votre service est en cours', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
                if(typeof produitPostconsole.RefProduit =='undefined'){
                    this.addToast({title:'Votre service est supprimé ', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    this.myform.reset();
                    setTimeout(() => {this.ngOnInit();}, 1000);
                }
            }catch (e) {

                this.produitService.UpdateEtat(produit).subscribe(produitPostconsole=>{
                    try {
                        if(typeof produitPostconsole.RefProduit =='undefined'){
                            this.addToast({title:'Votre Service est Hore Vente Hors Achat ', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                            this.myform.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                        }
                    }catch (e) {



                        this.addToast({title:'error "Something went wrong on the server"', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                });
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
    }


    open(content) {
        this.modalService.open(content, {size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }

    opensm(content) {
        this.modalService.open(content, { }).result.then((result) => {
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


}
