import { Component, OnInit } from '@angular/core';
import { BanqueModule } from "./banque.module";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
import { BanqueService } from "./banque.service";
import {Banque} from "./banque";
import {Observable} from "rxjs/Observable";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Produits} from "../BienEtService/produits/Produits";

declare const $: any;

@Component({

  selector: 'app-vehicule',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.scss']
})
export class BanqueComponent {


    pageSize = 5;
    pageNumber = 1;

    title = 'app';
    position = 'bottom-right';
    msg: string;
    showClose = true;
    res :any;
    timeout = 5000;
    theme = 'bootstrap';
    type = 'default';
    closeOther = false;

    compteData:any;
    vehicule: Banque[];
    banquePost : Banque;



    closeResult: string;
    myformCompte: FormGroup;
    myformUpdate: FormGroup;

    id:FormControl;
    RefCompte:FormControl;
    Type:FormControl;
    Devis:FormControl;
    Domiciliation:FormControl;
    Nom:FormControl;
    Numero:FormControl;
    Proprietaire:FormControl;
    Solde:FormControl;

  constructor(private banqueService: BanqueService, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) { }

    //getCostumers(): void {
    //    this.vehiculeService.getCostumers()
    //        .subscribe(costumers => this.costumers = costumers);
    //}

    createFormUpdate() {
        this.myformUpdate = new FormGroup({
            id:this.id,
            RefCompte:this.RefCompte,
            Type:this.Type,
            Devis:this.Devis,
            Nom:this.Nom,
            Numero:this.Numero,
            Proprietaire:this.Proprietaire,
            Domiciliation:this.Domiciliation,
            Solde:this.Solde
        });
    }

    createFormControlsUpdate() {
        this.id = new FormControl('');
        this.RefCompte = new FormControl('');
        this.Type = new FormControl('');
        this.Devis = new FormControl('');
        this.Nom = new FormControl('');
        this.Numero = new FormControl('');
        this.Proprietaire = new FormControl('');
        this.Domiciliation = new FormControl('');
        this.Solde = new FormControl('');

    }

    ngOnInit() {

        this.createFormControls();
        this.createForm();
        this.createFormControlsUpdate();
        this.createFormUpdate();

        this.getBanque();

  }

    pageChanged(pN: number): void {

        this.pageNumber = pN;
    }


    createFormControls() {
        this.id = new FormControl('');
        this.RefCompte = new FormControl('');
        this.Type = new FormControl('');
        this.Devis = new FormControl('');
        this.Nom = new FormControl('');
        this.Numero = new FormControl('');
        this.Proprietaire = new FormControl('');
        this.Domiciliation = new FormControl('');
        this.Solde = new FormControl('');
    }

    createForm() {
        this.myformCompte = new FormGroup({
            id:this.id,
            RefCompte:this.RefCompte,
            Type:this.Type,
            Devis:this.Devis,
            Nom:this.Nom,
            Numero:this.Numero,
            Proprietaire:this.Proprietaire,
            Domiciliation:this.Domiciliation,
            Solde:this.Solde
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


     onUpdate(id,RefCompte,Type,Devis,Domiciliation,Nom,Numero,Proprietaire,Solde){


         if (this.myformUpdate.valid) {
             this.addToast({title:'Please Waiting your Vehicle', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
             this.banquePost=  new Banque();
             this.banquePost.id = id;
             this.banquePost.RefCompte = this.myformUpdate.value['RefCompte'] ? this.myformUpdate.value['RefCompte']:RefCompte;
             this.banquePost.Type= this.myformUpdate.value['Type'] ? this.myformUpdate.value['Type']:Type;
             this.banquePost.Devis = this.myformUpdate.value['Devis'] ? this.myformUpdate.value['Devis']:Devis;
             this.banquePost.Domiciliation = this.myformUpdate.value['Domiciliation'] ? this.myformUpdate.value['Domiciliation']:Domiciliation;
             this.banquePost.Nom = this.myformUpdate.value['Nom'] ? this.myformUpdate.value['Nom']:Nom;
             this.banquePost.Numero = this.myformUpdate.value['Numero'] ? this.myformUpdate.value['Numero']:Numero;
             this.banquePost.Proprietaire = this.myformUpdate.value['Proprietaire'] ? this.myformUpdate.value['Proprietaire']:Proprietaire;
             this.banquePost.Solde = this.myformUpdate.value['Solde'] ? this.myformUpdate.value['Solde']:Solde;
             this.banqueService.updateCompte( this.banquePost ).subscribe(comptePostconsole=>{

                 try {
                     console.log(comptePostconsole.RefCompte);
                     if(typeof comptePostconsole.RefCompte=='undefined'){
                         this.addToast({title:'Votre Compte '+Nom+' est modifié à votre système', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                         this.myformUpdate.reset();
                         setTimeout(() => {this.ngOnInit();}, 1000);
                     }
                 }catch (e) {

                     this.addToast({title:'Votre Produit n\'est pas modifié à votre système', msg:'error "Something went wrong on the server"', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                 }
             }

             );
         }
     }

    onSubmit() {
        if (this.myformCompte.valid) {

            this.addToast({title:'Please Waiting your Provider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.banquePost=  new Banque();
            this.banquePost.RefCompte = this.myformCompte.value['RefCompte'];
            this.banquePost.Type = this.myformCompte.value['Type'];
            this.banquePost.Devis = this.myformCompte.value['Devis'];
            this.banquePost.Domiciliation = this.myformCompte.value['Domiciliation'];
            this.banquePost.Nom = this.myformCompte.value['Nom'];
            this.banquePost.Numero = this.myformCompte.value['Numero'];
            this.banquePost.Proprietaire = this.myformCompte.value['Proprietaire'];
            this.banquePost.Solde = 0;
            this.banqueService.addCompte( this.banquePost ).subscribe(comptePostconsole=>{
                    try {
                        console.log(comptePostconsole);
                            this.addToast({title:'notifications Waiting your Vehicule', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myformCompte.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                    }catch (e) {

                        this.addToast({title:'notifications Waiting your Vehicule', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
    }


    getBanque():void{
        this.banqueService.getComptes().subscribe(compte => this.compteData=compte);
    }


    open(content) {
        this.modalService.open(content, {size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }


    resizepage(){

       // this.pageSize= this.vehiculeData.length;

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


    delete(compte:Banque):void{


        this.banqueService.deleteCompte(compte).subscribe(comptePostconsole=>{
            try {
                this.addToast({title:'Votre Compte est en cours', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
                if(typeof comptePostconsole.RefCompte =='undefined'){
                    this.addToast({title:'Votre Compte est supprimé ', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});

                    setTimeout(() => {this.ngOnInit();}, 1000);
                }
            }catch (e) {

                this.addToast({title:'error "Something went wrong on the server"', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});

            }
        });
    }

}
