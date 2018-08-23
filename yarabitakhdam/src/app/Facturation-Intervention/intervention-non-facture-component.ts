import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {InterventionNonFactureService} from "./intervention-non-facture.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';
import {DatePipe} from "@angular/common";
import {pipe} from "rxjs/util/pipe";
import {Factures} from "./Factures";
import {Observable} from "rxjs/Observable";


declare const $: any;


@Component({
  selector: 'app-facture-provider',
  templateUrl: './intervention-non-facture.component.html',
  styleUrls: ['./intervention-non-facture.component.scss']
})
export class InterventionNonFactureComponent {

    reglementData:any;
    FactureRefData:any;
    ClientData:any;
    ligneFactureData:any;
    myform: FormGroup;
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
    facturePost : Factures;
    id:FormControl;

    arraychecked : Array<number> =[];
    id_costumer:number;


    RefFacture:FormControl;
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

    Total =0;
    NombreReglement=0;

    date:any;



    constructor(private reglementProviderService: InterventionNonFactureService, private http: HttpClient, private modalService: NgbModal, private toastyService: ToastyService) {

    }

    ngOnInit() {

        this.getInterventionNonFacture();
        this.getAllCostumer();
        this.createFormControls();
        this.createForm();

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

    createFormControls() {
        this.RefFacture = new FormControl('');
        this.NotePublic = new FormControl('');
        this.NotePriver = new FormControl('');
        this.MontantTVA = new FormControl('');
        this.MontantHT = new FormControl('');
        this.MontantTTC = new FormControl('');
        this.EtatFacture = new FormControl(1);
        this.DateEcheance = new FormControl('');
        this.MontantReglement = new FormControl('');
        this.FactureIntervention = new FormControl(1);
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
            FactureIntervention:this.FactureIntervention,
            DateFacture:this.DateFacture,
        });
    }


    getInterventionNonFacture():void{
        this.reglementProviderService.getInterventionNonFacture().subscribe(InterventionNonFacturePostconsole => this.reglementData=InterventionNonFacturePostconsole);
    }

    getFactureExiste():void{
        this.reglementProviderService.getFactureExiste(this.id_costumer).subscribe(FacturePostconsole => this.FactureRefData=FacturePostconsole);
    }

    getAllCostumer():void{
        this.reglementProviderService.getAllCostumer().subscribe(Allclient => this.ClientData=Allclient);
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
            this.facturePost.FactureIntervention = this.myform.value['FactureIntervention'];
            this.facturePost.ClientID = this.id_costumer;
            this.facturePost.DateFacture = this.myform.value['DateFacture'];

            var subject = new Observable();

            this.reglementProviderService.addFacture(this.facturePost).subscribe(facturePostconsole => {
                try {

                    this.addToast({
                        title: 'Votre Facture est ajouté à votre système',
                        msg: '',
                        timeout: 6000,
                        theme: 'bootstrap',
                        position: 'top-right',
                        type: 'success'
                    });

                   this.reglementProviderService.sendcheckedIntervention(this.arraychecked).subscribe(facturePostconsole => {});


                    this.myform.reset();
                    setTimeout(() => {this.ngOnInit();}, 1000);
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














    onAffecter() {

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
            this.facturePost.FactureIntervention = this.myform.value['FactureIntervention'];
            this.facturePost.ClientID = this.id_costumer;
            this.facturePost.DateFacture = this.myform.value['DateFacture'];



                    this.reglementProviderService.sendcheckedInterventiondejaexiste(this.arraychecked,this.facturePost.FactureIntervention).subscribe(facturePostconsole => {});

            this.addToast({
                title: 'Votre Facture est ajouté à votre système',
                msg: '',
                timeout: 6000,
                theme: 'bootstrap',
                position: 'top-right',
                type: 'success'
            });
          this.myform.reset();
          setTimeout(() => {this.ngOnInit();}, 1000);





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

    opensm(content) {

        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openfacture(content) {

        var numbers = new Array();


        this.id_costumer= $( "select#costumer_idid option:checked" ).attr('title');
        console.log(this.id_costumer);
        $('#listcheck tbody').find('input[type = "checkbox"]:checked').each(function () {

            console.log($(this).val());
            numbers.push($(this).val());
        });
        this.arraychecked=numbers;
        console.log(this.arraychecked);


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


    resizepage(){
        this.pageSize= this.reglementData.length;
    }

    onselectnotchecked()
    {
        $('#listcheck tbody').find('input[type = "checkbox"]:checked').each(function () {

            $(this).prop('checked', false);
        });



    }

    changeDate(date:string):string{

        return date.slice(0,10);

    }



}
