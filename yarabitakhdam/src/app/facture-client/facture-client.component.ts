import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Factures} from "./Factures";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FactureClientService} from "./facture-client.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {LigneFacture} from "./LigneFacture";


declare const $: any;


@Component({
  selector: 'app-facture-client',
  templateUrl: './facture-client.component.html',
  styleUrls: ['./facture-client.component.scss']
})

export class FactureClientComponent {

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
    TVA:FormControl;
    Qte:FormControl;
    PUHT:FormControl;
    Reducation:FormControl;
    ProduitsID:FormControl;
    FactureID:FormControl;

    constructor(private factureClientService: FactureClientService, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) {

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


    pdfFactureClient(id:number):void{
        this.factureClientService.FacturePdf(id).subscribe(facture => {
            console.log('test');
            console.log(facture);
            window.open('http://localhost:8000/api/FactureClient/pdf/'+id,"_self")


         },
        error1 => {
            console.log(error1);
        }
         );
    }
    onSubmit() {
        var test = new Factures();
        if (this.myform.valid) {
            this.addToast({
                title: 'Votre Facture est en cours',
                msg: '',
                timeout: 1000,
                theme: 'bootstrap',
                position: 'top-right',
                type: 'wait'
            });
            this.facturePost = new Factures();
            this.facturePost.MontantHT = this.myform.value['MontantHT'];
            this.facturePost.MontantTVA = this.myform.value['MontantTVA'];
            this.facturePost.MontantTTC = this.myform.value['MontantTTC'];
            this.facturePost.NotePublic = this.myform.value['NotePublic'];
            this.facturePost.NotePriver = this.myform.value['NotePriver'];
            this.facturePost.EtatFacture = this.myform.value['EtatFacture'];
            this.facturePost.DateEcheance = this.myform.value['DateEcheance'];
            this.facturePost.MontantReglement = this.myform.value['MontantReglement'];
            this.facturePost.ClientID = this.myform.value['ClientID'];
            this.facturePost.DateFacture = this.myform.value['DateFacture'];

            var subject = new Observable();

           this.factureClientService.addFacture(this.facturePost).subscribe(facturePostconsole => {
                    try {

                        this.addToast({
                            title: 'Votre Facture est ajouté à votre système',
                            msg: '',
                            timeout: 6000,
                            theme: 'bootstrap',
                            position: 'top-right',
                            type: 'success'
                        });
                        this.myform.reset();
                        setTimeout(() => {
                            this.ngOnInit();
                        }, 1000);
                        test.id = facturePostconsole.id;
                        test.RefFacture = String(facturePostconsole.id);
                        test.MontantHT = this.facturePost.MontantHT;
                        test.MontantTVA = this.facturePost.MontantTVA;
                        test.MontantTTC = this.facturePost.MontantTTC;
                        test.NotePublic = this.facturePost.NotePublic;
                        test.NotePriver = this.facturePost.NotePriver;
                        test.EtatFacture = this.facturePost.EtatFacture;
                        test.DateEcheance = this.facturePost.DateEcheance;
                        test.MontantReglement = this.facturePost.MontantReglement;
                        test.ClientID = this.facturePost.ClientID;
                        test.DateFacture = this.facturePost.DateFacture;

                    } catch (e) {
                        this.addToast({
                            title: 'Votre Facture n\'est pas ajouté à votre système',
                            msg: 'Turning standard Bootstrap alerts into awesome notifications',
                            timeout: 6000,
                            theme: 'bootstrap',
                            position: 'top-right',
                            type: 'error'
                        });
                    }

                });
        }
    }



    onUpdate(id,RefFacture,MontantHT,MontantTVA,MontantTTC,NotePublic,NotePriver,EtatFacture ,DateEcheance,DateFacture,MontantReglement,ClientID){


        if (this.myformUpdate.valid) {

            this.addToast({title:'Votre Facture est en cours', msg:'', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.facturePost =  new Factures();
            this.facturePost.id = id;
            this.facturePost.RefFacture =RefFacture;
            this.facturePost.MontantHT = MontantHT;
            this.facturePost.MontantTVA = MontantTVA;
            this.facturePost.MontantTTC =MontantTTC;
            this.facturePost.NotePublic = this.myformUpdate.value['NotePublic'] ? this.myformUpdate.value['NotePublic']:NotePublic;
            this.facturePost.NotePriver = this.myformUpdate.value['NotePriver'] ? this.myformUpdate.value['NotePriver']:NotePriver;
            this.facturePost.EtatFacture = EtatFacture;
            this.facturePost.DateEcheance=this.myformUpdate.value['DateEcheance'] ? this.myformUpdate.value['DateEcheance']:DateEcheance;
            this.facturePost.DateFacture=this.myformUpdate.value['DateFacture'] ? this.myformUpdate.value['DateFacture']:DateFacture;
            this.facturePost.MontantReglement =MontantReglement;
            this.facturePost.ClientID =ClientID;

            this.factureClientService.updateFacture( this.facturePost ).subscribe(facturePostconsole=>{
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
            this.factureClientService.addLignesFacture( this.ligneFacturePost ).subscribe(factureLignePostconsole=>{
                    try {

                            this.factureClientService.calculefacture(id).subscribe(fact=>{});
                            this.addToast({title:'Votre Facture est en cours', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myformligne.reset();
                            this.getLigneFacture(id);
                            setTimeout(() => {this.ngOnInit();}, 10);

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
