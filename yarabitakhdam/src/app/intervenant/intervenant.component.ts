import { Component, OnInit } from '@angular/core';
import {VehiculeService} from "../vehicule/vehicule.service";
import {HttpClient} from "@angular/common/http";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IntervenantService} from "./intervenant.service";
import {Costumer} from "../costumer/Costumer";
import {Vehicule} from "../vehicule/vehicule";
import { HttpHeaders } from '@angular/common/http'
import * as $ from 'jquery';
import {Personal} from "../personal/Personal";
import {FormControl, FormGroup} from "@angular/forms";
import {Intervenant} from "./intervenant";
import {RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {toNumber} from "ngx-bootstrap/timepicker/timepicker.utils";



const httpOptions = {
    headers: new HttpHeaders({ 'Accept': 'application/json' })
};

@Component({
  selector: 'app-intervenant',
  templateUrl: './intervenant.component.html',
  styleUrls: ['./intervenant.component.scss']
})
export class IntervenantComponent implements OnInit {


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
    closeResult: string;


    InterventionsData:any;
    Boitiers: any;
    cartesSim: any;
    detail:any;
    costumers:Costumer[];
    vehicule:any;
    personals:Personal[];
    interventions: Intervenant[];
    interventionPost : Intervenant;


    myform: FormGroup;
    myformUpdate: FormGroup;
    id_intervention: FormControl;
    intervened_at:FormControl;
    id_instalateur:FormControl;
    id_costumer:FormControl;
    user_id:FormControl;
    nbr_installation:FormControl;
    status:FormControl;
    validation_resp:FormControl;
    upload:FormControl;
    categorie:FormControl;
    remarque:FormControl;
    intervention_id:FormControl;
    myform2 : FormGroup;


    kilometrage:FormControl;
    remarque_detail:FormControl;
    type_detail:FormControl;
    vehicule_select:FormControl;
    imei_carte:FormControl;
    sim_costumer:FormControl;
    imei_boitier:FormControl;
    box_costumer:FormControl;
    imei_vehicule_1:FormControl;
    imei_vehicule_2:FormControl;
    imei_vehicule_3:FormControl;
    marque:FormControl;
    model:FormControl;







    IntervetionPost:Intervenant;

    constructor(private intervenantService: IntervenantService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) { }

    ngOnInit() {
        this.createFormControlsUpdate();
        this.createFormUpdate();
        this.createFormControls();
        this.createForm();
        this.createForm2();
        this.getInterventions();
        this.getCostumers();
        this.getPersonals();

        // $('.table-filters input').on('input', function () {
        //
        //
        //     filterTable($(this).parents('table'));
        //
        // });
        // $('#client_select').on('change', function () {
        //
        //
        //     filterTable_select($(this).parents('table'));
        //
        // });

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
                });
                if (valid === true) {
                    $(this).css('display', '');
                } else {
                    $(this).css('display', 'none');
                }
            });
        }

        function filterTable_select($table) {
            var $filters = $table.find('.table-filters th');
            var $rows = $table.find('.table-data');
            $rows.each(function (rowIndex) {
                var valid = true;
                $(this).find('td').each(function (colIndex) {
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

    pageChanged(pN: number): void {
        this.pageNumber = pN;
        this.intervenantService.pageChange(this.pageNumber).subscribe(
            intervention => this.InterventionsData=intervention
        );
        setTimeout(() => {this.ngOnInit();}, 1000);
    }


    createFormUpdate() {
        this.myformUpdate = new FormGroup({
            id_intervention:this.id_intervention,
            status:this.status,
            validation_resp:this.validation_resp,
            intervened_at:this.intervened_at,
            id_costumer:this.id_costumer,
            id_instalateur:this.id_instalateur,
            upload:this.upload,
            categorie:this.categorie,
            remarque:this.remarque,
            intervention_id:this.intervention_id,
        });
    }

    createFormControlsUpdate() {
        this.id_intervention = new FormControl('');
        this.status = new FormControl('');
        this.validation_resp = new FormControl('');
        this.intervened_at = new FormControl('');
        this.id_costumer = new FormControl('');
        this.id_instalateur = new FormControl('');
        this.upload = new FormControl('');
        this.categorie = new FormControl('');
        this.remarque = new FormControl('');
        this.intervention_id = new FormControl('');
    }


    createFormControls() {
        this.id_intervention = new FormControl('');
        this.intervened_at = new FormControl('');
        this.id_instalateur = new FormControl('');
        this.id_costumer = new FormControl('');
        this.nbr_installation = new FormControl('');
        this.user_id = new FormControl('');
        this.status = new FormControl('');
        this.validation_resp = new FormControl('');


        this.type_detail = new FormControl('');

        this.vehicule_select = new FormControl('');

        this.imei_carte = new FormControl('');
        this.sim_costumer = new FormControl('');

        this.imei_boitier = new FormControl('');
        this.box_costumer = new FormControl('');

        this.imei_vehicule_1 = new FormControl('');
        this.imei_vehicule_2 = new FormControl('');
        this.imei_vehicule_3 = new FormControl('');
        this.marque = new FormControl('');
        this.model = new FormControl('');

        this.kilometrage = new FormControl('');
        this.remarque = new FormControl('');


    }


    createForm() {
        this.myform = new FormGroup({
            id:this.id_intervention,
            intervened_at:this.intervened_at,
            id_instalateur:this.id_instalateur,
            id_costumer:this.id_costumer,
            nbr_installation:this.nbr_installation,
            user_id:this.user_id,
            status:this.status,
            validation_resp:this.validation_resp,



        });
    }

    createForm2() {
        this.myform2= new FormGroup({
            type_detail:this.type_detail,
            vehicule_select:this.vehicule_select,
            imei_carte:this.imei_carte,
            sim_costumer:this.sim_costumer,
            imei_boitier:this.imei_boitier,
            box_costumer:this.box_costumer,
            imei_vehicule_1:this.imei_vehicule_1,
            imei_vehicule_2:this.imei_vehicule_2,
            imei_vehicule_3:this.imei_vehicule_3,
            marque:this.marque,
            model:this.model,
            kilometrage:this.kilometrage,
            remarque:this.remarque,

        });
    }


    getCostumers(): void {
        this.intervenantService.getCostumers()
            .subscribe(costumers => this.costumers = costumers);
    }

    getInterventions():void{
        this.intervenantService.getInterventions().subscribe(intervention => this.InterventionsData=intervention);
    }

    getPersonals():void{
        this.intervenantService.getPersonals().subscribe(intervention => this.personals=intervention);
    }

    opensm(content) {
        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    OnSubmit(){

        if (this.myform.valid) {

            this.addToast({title:'Please Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.IntervetionPost=  new Intervenant();
            this.IntervetionPost.intervened_at = this.myform.value['intervened_at'];
            this.IntervetionPost.id_costumer = this.myform.value['id_costumer'];
            this.IntervetionPost.id_instalateur =  this.myform.value['id_instalateur'];
            this.IntervetionPost.nbr_installation =  this.myform.value['nbr_installation'];
            this.IntervetionPost.user_id = 1;
            this.IntervetionPost.status = 'En cours';
            this.IntervetionPost.validation_resp ='0';
            console.log(this.IntervetionPost.id_instalateur);


            this.intervenantService.addIntervention( this.IntervetionPost ).subscribe(vehiclePostconsole=>{
                    try {
                        console.log(vehiclePostconsole);
                        if (vehiclePostconsole.status == '203') {
                             this.addToast({title:'notifications Waiting your Intervention', msg:"le nombre d'installation superieur aux boitiérs", timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                         }
                        else {
                            this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myform.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                            console.log(this.IntervetionPost.intervened_at);}

                    }catch (e) {

                        console.log(e);
                        this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
        else
        {

            this.addToast({title:'veuillez remplir tous les champs du formulaire', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:4000, theme:'bootstrap', position:'top-right', type:'error'});
        }
    }

    // OnSubmitNewLigne (customer,user_id,intervention){
    //
    //     console.log(customer);
    //     if (this.myform2) {
    //         this.addToast({title:'Please Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
    //         this.IntervetionPost=  new Intervenant();
    //
    //         this.IntervetionPost.type = this.myform2.value['type_detail'];
    //
    //         this.IntervetionPost.vehicule_select = this.myform2.value['vehicule_select'];
    //
    //         this.IntervetionPost.imei = ''+this.myform2.value['imei_vehicule_1']+this.myform2.value['imei_vehicule_2']+this.myform2.value['imei_vehicule_3'];
    //         this.IntervetionPost.marque = this.myform2.value['marque'];
    //         this.IntervetionPost.model = this.myform2.value['model'];
    //
    //
    //         this.IntervetionPost.imei_boitier = this.myform2.value['imei_boitier'];
    //         this.IntervetionPost.box_costumer = this.myform2.value['box_costumer'];
    //
    //         this.IntervetionPost.imei_carte = this.myform2.value['imei_carte'];
    //         this.IntervetionPost.sim_costumer = this.myform2.value['sim_costumer'];
    //
    //
    //         this.IntervetionPost.kilometrage = this.myform2.value['kilometrage'];
    //         this.IntervetionPost.remarque = this.myform2.value['remarque'];
    //
    //         this.IntervetionPost.costumer_id = customer;
    //         this.IntervetionPost.user_id = user_id;
    //         this.IntervetionPost.id_intervention = intervention;
    //
    //
    //         console.log(this.IntervetionPost);
    //
    //
    //         this.intervenantService.addInterventionLigne( this.IntervetionPost ).subscribe(vehiclePostconsole=>{
    //                 try {
    //                     this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
    //                     this.myform2.reset();
    //                     setTimeout(() => {this.getDetail(intervention);}, 1000);
    //
    //                 }catch (e) {
    //
    //                     console.log(e);
    //                     this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
    //                 }
    //             }
    //         );
    //     }
    // }

    onUpdateEtat(id,remarque){

        if (this.myformUpdate.valid) {
            this.addToast({title:'Please Waiting your Vehicle', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.interventionPost=  new Intervenant();
            this.interventionPost.id_intervention = id;
            this.interventionPost.status = 'Terminée';
            this.interventionPost.remarque = this.myformUpdate.value['remarque'] ? this.myformUpdate.value['remarque']:remarque;
            this.interventionPost.validation_resp= '1';

            this.intervenantService.updateIntervention( this.interventionPost ).subscribe(interventionPostconsole=>{
                    try {
                        this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                        setTimeout(() => {this.ngOnInit();}, 1000);

                    }catch (e) {

                        this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
    }

    fileUpload(id,date,customer,startTime,endTime) {
        var input_fl: any = document.getElementById('file_loader');
        var customer_input: any = document.getElementById('customer');
        var start_date_input: any = document.getElementById('start_date');
        var end_date_input: any = document.getElementById('end_date');
        var date_input: any = document.getElementById('date');

        let ApiUrl = 'http://localhost:8000/api/interventions/edit';

        let formData:FormData = new FormData();

        var files = input_fl.files;
        let fileList: FileList = files;

        if(fileList.length > 0) {
            console.log('test');
            let file: File = fileList[0];
            formData.append('photo', file, file.name);
        }


        let customerId = customer_input.value == '' ? customer:customer_input.value;
        let startDate = start_date_input.value == '' ? startTime:start_date_input.value;
        let endDate = end_date_input.value == '' ? endTime:end_date_input.value;
        let dateInvented = date_input.value == '' ? date:date_input.value;
        let interventionId = id;

        if (startDate == null){
            startDate='00:00';
        }
        if (endDate == null){
            endDate='00:00';
        }

        formData.append('date', dateInvented);
        formData.append('customer_id', customerId);
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('intervention_id', ""+interventionId);

        this.addToast({title:'Please Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});

        this.http.post(ApiUrl, formData).subscribe(interventionPostconsole=>{
                console.log(interventionPostconsole);
                this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                setTimeout(() => {this.ngOnInit();}, 1000);
                },
            (error)=>{this.addToast({title:'something went wrong with upload', msg:error, timeout:2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        );


    }

    clicker():void{
        $('#file_loader').click();
    }

    onUpdateValidation(id,remarque){

        if (this.myformUpdate.valid) {
            this.addToast({title:'Please Waiting your Vehicle', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.interventionPost=  new Intervenant();
            this.interventionPost.id_intervention = id;
            this.interventionPost.remarque = this.myformUpdate.value['remarque'] ? this.myformUpdate.value['remarque']:remarque;
            this.interventionPost.validation_resp= '0';
            this.intervenantService.updateIntervention( this.interventionPost ).subscribe(interventionPostconsole=>{
                    try {

                        this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                        setTimeout(() => {this.ngOnInit();}, 1000);

                    }catch (e) {

                        this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
    }

    delete(intervention:Intervenant):void{

         this.addToast({title:'notifications Waiting your Provider', msg:'waiting please delete operating system '+ intervention.intervention_id, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
         this.intervenantService.deleteIntervention(intervention).subscribe(vehiculePostconsole=>{
            try {
                console.log(vehiculePostconsole);
                if(vehiculePostconsole.status=='203')
                {
                    this.addToast({title:'notifications Waiting your Intervention', msg:'l\'interventervention est déja remplis', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
                }
                else{
                    this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                }
                setTimeout(() => {this.ngOnInit();}, 1000);

            }catch (e) {
                console.log(e);
                this.addToast({title:'notifications Waiting your Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
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

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
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

    replace_all(input: string):string {
         var output = "";
         for (var i=0;i<input.length;i++){
             if (input[i] != '-')
                output+=input[i];
         }
         return output;
    }

    display_boitiers(){
        var check: any = document.getElementById('check_boitiers');
        let check_value = check.value;

       if(check_value == 1){
            document.getElementById('boitier_if_client').style.display = 'block';
            document.getElementById('boitier_if_opentech').style.display = 'none';
           $('#boitier_if_opentech').val('');
           check.value=0;
       }
        else{
            document.getElementById('boitier_if_client').style.display = 'none';
            document.getElementById('boitier_if_opentech').style.display = 'block';
            $('#boitier_if_client').val('');
            check.value=1;
        }
    }

    display_carte(){
        var check: any = document.getElementById('check_cartes');
        let check_value = check.value;

        if(check_value == 1){
            document.getElementById('carte_if_client').style.display = 'block';
            document.getElementById('carte_if_opentech').style.display = 'none';
            $('#carte_if_opentech').val('');
            check.value=0;
        }
        else{
            document.getElementById('carte_if_client').style.display = 'none';
            document.getElementById('carte_if_opentech').style.display = 'block';
            $('#carte_if_client').val('');
            check.value=1;
        }
    }

    display_car(){
        var check: any = document.getElementById('new_car');
        let check_value = check.value;

        if(check_value == 1){
            document.getElementById('new_tr').style.display = 'block';
            $( "#veh_select" ).prop( "disabled", true );
            $('#veh_select').val('');
            check.value=0;
        }
        else{
            document.getElementById('new_tr').style.display = 'none';
            $( "#veh_select" ).prop( "disabled", false );
            $('#mat_1').val('');
            $('#mat_2').val('');
            $('#mat_3').val('');
            $('#marque').val('');
            $('#model').val('');
            check.value=1;
        }
    }

    getPdf(id){

        this.intervenantService.getPdf( id ).subscribe(
            (response: any) => {
                window.open('http://localhost:8000/api/interventions/getPdf/'+id,'_self');
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    seeFile(upload){
        window.open('http://localhost/myapp/storage/app/images/'+upload,'_blank');
    }

    filter() {

    }


}
