import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Devis} from "./Devis";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DevisClientService} from "./devis-client.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {LigneDevis} from "./LigneDevis";


declare const $: any;


@Component({
  selector: 'app-devis-client',
  templateUrl: './devis-client.component.html',
  styleUrls: ['./devis-client.component.scss']
})

export class DevisClientComponent {

    devisData:any;
    devisData1:any;
    ligneDevisData:any;
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
    MontantHT:FormControl;
    MontantTVA:FormControl;
    MontantTTC:FormControl;
    NotePublic:FormControl;
    NotePriver:FormControl;
    EtatFacture:FormControl;
    DateEcheance:FormControl;
    MontantReglement:FormControl;
    FactureIntervention:FormControl;
    ClientID:FormControl;
    DateFacture:FormControl;

    devisPost : Devis;
    ligneDevisPost : LigneDevis;


    //creatin facture provider

   test2 : Devis;
    myformligne:FormGroup;
    TVA:FormControl;
    Qte:FormControl;
    PUHT:FormControl;
    Reducation:FormControl;
    ProduitsID:FormControl;
    FactureID:FormControl;

    constructor(private devisClientService: DevisClientService, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) {

    }

    ngOnInit() {


        this.getDevisClient();
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


    getDevisClient():void{
        this.devisClientService.getDevis().subscribe(devis => this.devisData=devis);
    }

    onSubmit() {
        var test = new Devis();
        if (this.myform.valid) {
            this.addToast({
                title: 'Votre Devis est en cours',
                msg: '',
                timeout: 1000,
                theme: 'bootstrap',
                position: 'top-right',
                type: 'wait'
            });
            this.devisPost = new Devis();
            this.devisPost.MontantHT = this.myform.value['MontantHT'];
            this.devisPost.MontantTVA = this.myform.value['MontantTVA'];
            this.devisPost.MontantTTC = this.myform.value['MontantTTC'];
            this.devisPost.NotePublic = this.myform.value['NotePublic'];
            this.devisPost.NotePriver = this.myform.value['NotePriver'];
            this.devisPost.EtatFacture = this.myform.value['EtatFacture'];
            this.devisPost.DateEcheance = this.myform.value['DateEcheance'];
            this.devisPost.MontantReglement = this.myform.value['MontantReglement'];
            this.devisPost.ClientID = this.myform.value['ClientID'];
            this.devisPost.DateFacture = this.myform.value['DateFacture'];

            var subject = new Observable();

           this.devisClientService.addDevis(this.devisPost).subscribe(devisPostconsole => {
                    try {

                        this.addToast({
                            title: 'Votre Devis est ajouté à votre système',
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
                        test.id = devisPostconsole.id;
                        test.MontantHT = this.devisPost.MontantHT;
                        test.MontantTVA = this.devisPost.MontantTVA;
                        test.MontantTTC = this.devisPost.MontantTTC;
                        test.NotePublic = this.devisPost.NotePublic;
                        test.NotePriver = this.devisPost.NotePriver;
                        test.EtatFacture = this.devisPost.EtatFacture;
                        test.DateEcheance = this.devisPost.DateEcheance;
                        test.MontantReglement = this.devisPost.MontantReglement;
                        test.ClientID = this.devisPost.ClientID;
                        test.DateFacture = this.devisPost.DateFacture;

                    } catch (e) {
                        this.addToast({
                            title: 'Votre Devis n\'est pas ajouté à votre système',
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



    onUpdate(id,MontantHT,MontantTVA,MontantTTC,NotePublic,NotePriver,EtatFacture ,DateFacture,MontantReglement,ClientID){


        if (this.myformUpdate.valid) {

            this.addToast({title:'Votre Devis est en cours', msg:'', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.devisPost =  new Devis();
            this.devisPost.id = id;

            this.devisPost.MontantHT = MontantHT;
            this.devisPost.MontantTVA = MontantTVA;
            this.devisPost.MontantTTC =MontantTTC;
            this.devisPost.NotePublic = this.myformUpdate.value['NotePublic'] ? this.myformUpdate.value['NotePublic']:NotePublic;
            this.devisPost.NotePriver = this.myformUpdate.value['NotePriver'] ? this.myformUpdate.value['NotePriver']:NotePriver;
            this.devisPost.EtatFacture = EtatFacture;
            this.devisPost.DateEcheance=null;
            this.devisPost.DateFacture=this.myformUpdate.value['DateFacture'] ? this.myformUpdate.value['DateFacture']:DateFacture;
            this.devisPost.MontantReglement =MontantReglement;
            this.devisPost.ClientID =ClientID;

            console.log('ddd');
            this.devisClientService.updateDevis( this.devisPost ).subscribe(devisPostconsole=>{
                    try {
                        console.log(devisPostconsole.id);
                        if(typeof devisPostconsole.id=='undefined'){
                            this.addToast({title:'Votre devis est modifié à votre système', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myform.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                        }
                    }catch (e) {
                        this.addToast({title:'Votre devis n\'est pas modifié à votre système', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                    });
        }
    }

    delete(devis:Devis):void{

        this.addToast({title:'Votre Devis est en cours', msg:' ', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.devisClientService.deleteDevis(devis).subscribe(produitPostconsole=>{

            try {

                if(typeof produitPostconsole.RefFacture =='undefined'){
                    this.addToast({title:'Votre Devis est supprimé ', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    setTimeout(() => {this.ngOnInit();}, 1000);
                }
            }catch (e) {
                console.log(e);
                this.addToast({title:'error "Something went wrong on the server"', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
    }


    facture(devis:Devis):void{

        this.addToast({title:'Votre Devis est en cours', msg:' ', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});

        this.devisClientService.factureDevis(devis).subscribe(produitPostconsole=>{

            try {


                    this.addToast({title:'Votre Devis est supprimé ', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    setTimeout(() => {this.ngOnInit();}, 1000);

            }catch (e) {
                console.log(e);
                this.addToast({title:'error "Something went wrong on the server"', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
    }

    deleteLigne(ligneDevis:LigneDevis):void{

        this.addToast({title:'Votre Ligne Devis est en cours', msg:' ', timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.devisClientService.deleteLignesDevis(ligneDevis).subscribe(produitPostconsole=>{

            try {
                if(typeof produitPostconsole.id =='undefined'){
                    this.devisClientService.calculedevis(ligneDevis.FactureID).subscribe(fact=>{});
                    this.addToast({title:'Votre Ligne Devis est supprimé ', msg:'', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    this.getLigneDevis(ligneDevis.FactureID);
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
            this.addToast({title:'Votre Devis est en cours', msg:'', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.ligneDevisPost=  new LigneDevis();
            this.ligneDevisPost.TVA = this.myformligne.value['TVA'] ? this.myformligne.value['TVA']:0;
            this.ligneDevisPost.Qte = this.myformligne.value['Qte'];
            this.ligneDevisPost.PUHT = this.myformligne.value['PUHT'];
            this.ligneDevisPost.Reducation = this.myformligne.value['Reducation'] ? this.myformligne.value['Reducation']:0;
            this.ligneDevisPost.ProduitsID =this.myformligne.value['ProduitsID'];
            this.ligneDevisPost.FactureID =this.myformligne.value['FactureID'];
            //now
            this.devisClientService.addLignesDevis( this.ligneDevisPost ).subscribe(devisLignePostconsole=>{
                    try {

                            this.devisClientService.calculedevis(id).subscribe(fact=>{});
                            this.addToast({title:'Votre ligneDevis est en cours', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myformligne.reset();
                            this.getLigneDevis(id);
                            setTimeout(() => {this.ngOnInit();}, 10);

                    }catch (e) {
                        this.addToast({title:'error "Something went wrong on the server"', msg:'', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }

                }
            );
        }

    }


     getLigneDevis(id:number):void{
        this.devisClientService.getLignesDevis(id).subscribe(lignedevis => this.ligneDevisData=lignedevis);
    }

    getAllProduit():void{
        this.devisClientService.getallProduit().subscribe(produits => this.allProduit=produits);
    }

    getallClient():void{
        this.devisClientService.getallClient().subscribe(clients => this.allClient=clients);
    }



    createFormControls() {
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


    openDevis(content,id:number) {
        this.ligneDevisData=[];
        this.allProduit=[];
        this.getLigneDevis(id);
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
        this.pageSize= this.devisData.length;
    }

    changeDate(date:string):string{

        return date.slice(0,10);


    }


}
