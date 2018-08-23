import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IntervenantService} from "../intervenant/intervenant.service";
import {HttpClient} from "@angular/common/http";
import {DetailInterventionService} from "./detail-intervention.service";
import {ActivatedRoute} from "@angular/router";
import {Intervenant} from "../intervenant/intervenant";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-detail-intervention',
  templateUrl: './detail-intervention.component.html',
  styleUrls: ['./detail-intervention.component.scss']
})
export class DetailInterventionComponent implements OnInit {

    pageSize = 10;
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
    intervention: string;


    Boitiers: any;
    cartesSim: any;
    detail:any;
    vehicule:any;
    imei:string;

    myform: FormGroup;
    myformUpdate:FormGroup;
    interventionPost : Intervenant;


    id_instalateur:FormControl;
    categorie:FormControl;
    id_intervention:FormControl;

    type_post:FormControl;


    type_update:FormControl;
    car_update:FormControl;
    imei1_update:FormControl;
    imei2_update:FormControl;
    imei3_update:FormControl;
    marque_update:FormControl;
    model_update:FormControl;
    imei_boitier:FormControl;
    imei_carte:FormControl;
    box_costumer:FormControl;
    sim_costumer:FormControl;
    kilometrage:FormControl;
    remarque:FormControl;
    duration:FormControl;



    type_add:FormControl;
    // ifRotour_add:FormControl;
    vehicule_add:FormControl;
    imei1_add:FormControl;
    imei2_add:FormControl;
    imei3_add:FormControl;
    marque_add:FormControl;
    model_add:FormControl;
    boitier_opentech_add:FormControl;
    carte_opentech_add:FormControl;
    boitier_client_add:FormControl;
    carte_client_add:FormControl;
    kilometrage_add:FormControl;
    remarque_add:FormControl;
    duration_add:FormControl;




    constructor(private detailInterventionService: DetailInterventionService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService,private route: ActivatedRoute) { }

    ngOnInit() {

        this.createFormControls();
        this.createForm();
        this.createFormControlsUpdate();
        this.createFormUpdate();




        this.intervention = this.route.snapshot.paramMap.get('id');
        this.getDetail(this.intervention);
        this.getVehiculs(this.intervention);



        $('.table-filters input').on('input', function () {
            filterTable($(this).parents('table'));
        });

        $('#client_select').on('change', function () {
            filterTable_select($(this).parents('table'));
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

    createFormControls() {
        this.id_intervention = new FormControl('');
        this.type_add = new FormControl('');
        // this.ifRotour_add = new FormControl('');
        this.vehicule_add = new FormControl('');
        this.imei1_add = new FormControl('');
        this.imei2_add = new FormControl('');
        this.imei3_add = new FormControl('');
        this.marque_add = new FormControl('');
        this.model_add = new FormControl('');
        this.boitier_opentech_add = new FormControl('');
        this.carte_opentech_add = new FormControl('');
        this.boitier_client_add = new FormControl('');
        this.carte_client_add = new FormControl('');
        this.kilometrage_add = new FormControl('');
        this.remarque_add = new FormControl('');
        this.duration_add = new FormControl('');
    }

    createForm() {
        this.myform = new FormGroup({
            id_intervention:this.id_intervention,
            type_add:this.type_add,
            // ifRotour_add:this.ifRotour_add,
            vehicule_add:this.vehicule_add,
            imei1_add:this.imei1_add,
            imei2_add:this.imei2_add,
            imei3_add:this.imei3_add,
            marque_add:this.marque_add,
            model_add:this.model_add,
            boitier_opentech_add:this.boitier_opentech_add,
            carte_opentech_add:this.carte_opentech_add,
            boitier_client_add:this.boitier_client_add,
            carte_client_add:this.carte_client_add,
            kilometrage_add:this.kilometrage_add,
            remarque_add:this.remarque_add,
            duration_add:this.duration_add,
        });
    }

    createFormUpdate() {
        this.myformUpdate = new FormGroup({
            id_intervention:this.id_intervention,
            type_update:this.type_update,
            car_update:this.car_update,
            imei1_update:this.imei1_update,
            imei2_update:this.imei2_update,
            imei3_update:this.imei3_update,
            marque_update:this.marque_update,
            model_update:this.model_update,
            imei_boitier:this.imei_boitier,
            imei_carte:this.imei_carte,
            box_costumer:this.box_costumer,
            sim_costumer:this.sim_costumer,
            kilometrage:this.kilometrage,
            remarque:this.remarque,
            duration:this.duration,
        });
    }

    createFormControlsUpdate() {
        this.id_intervention = new FormControl('');
        this.type_update = new FormControl('');
        this.car_update = new FormControl('');
        this.imei1_update = new FormControl('');
        this.imei2_update = new FormControl('');
        this.imei3_update = new FormControl('');
        this.marque_update = new FormControl('');
        this.model_update = new FormControl('');
        this.imei_boitier = new FormControl('');
        this.imei_carte = new FormControl('');
        this.box_costumer = new FormControl('');
        this.sim_costumer = new FormControl('');
        this.kilometrage = new FormControl('');
        this.remarque = new FormControl('');
        this.duration = new FormControl('');
    }

    add_detail_intervention(){
        this.addToast({title:'Please Waiting your Vehicle', msg:'Please Waiting your Operation', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.intervention = this.route.snapshot.paramMap.get('id');
        this.imei = this.myform.value['imei1_add']+' '+this.myform.value['imei2_add']+' '+this.myform.value['imei3_add'];

        console.log(this.imei);
        console.log(this.myform.value['vehicule_add']);

        if (this.myform.value['duration_add'] == '00:00'){
            this.addToast({title:'notifications Waiting your Provider', msg:'You should verify the duration !!!', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
            return;
        }
        if (this.myform.value['vehicule_add'] == '' && this.imei == '  '){
            this.addToast({title:'notifications Waiting your Provider', msg:'You should verify the vehicule !!!', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
            return;
        }
        if (this.myform.valid) {
            this.interventionPost=  new Intervenant();
            this.interventionPost.intervention =this.intervention;
            this.interventionPost.type = this.myform.value['type_add'];

            // this.interventionPost.if_rotour = this.myform.value['ifRotour_add'];

            this.interventionPost.vehicule = $('#'+'imei_car').val()+'';

            this.interventionPost.imei = $('#'+'imei_1_new').val()+' '+$('#'+'imei_2_new').val()+' '+$('#'+'imei_3_new').val()+'';
            this.interventionPost.marque = $('#'+'marque_new').val()+'';
            this.interventionPost.model = $('#'+'model_new').val()+'';


            this.interventionPost.box_costumer = $('#'+'boitier_client_new').val()+'';
            this.interventionPost.sim_costumer = $('#'+'sim_client_new').val()+'';


            this.interventionPost.imei_box = $('#'+'boitier_open_new').val()+'';
            this.interventionPost.imei_sim = $('#'+'sim_open_new').val()+'';


            this.interventionPost.kilometrage = this.myform.value['kilometrage_add'];
            this.interventionPost.remarque = this.myform.value['remarque_add'];
            this.interventionPost.status = '0';

            this.interventionPost.duration = this.myform.value['duration_add'];

            console.log(this.interventionPost);
            this.detailInterventionService.addLine( this.interventionPost ).subscribe(
                vehiclePostconsole=>{
                    try {

                        this.addToast({title:'notifications Waiting your Intervention Line', msg:'Line added succesfully !!!', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                        //this.myform.reset();
                        setTimeout(() => {this.ngOnInit();}, 1000);

                    }catch (e) {

                        this.addToast({title:'notifications Waiting your Provider', msg:'something went wrong !!!', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
        else {
            this.addToast({title:'notifications Waiting your Provider', msg:'something missing in your form !!!', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
        }
    }

    updateLine(id,type,kilometrage,remarque,duration){
        this.addToast({title:'Please Waiting your Vehicle', msg:'Please Waiting your Operation', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.intervention = this.route.snapshot.paramMap.get('id');
            if (this.myformUpdate.valid) {
            this.interventionPost=  new Intervenant();
            this.interventionPost.detail_id =id;
            this.interventionPost.intervention =this.intervention;
            this.interventionPost.type = type;

            this.interventionPost.vehicule = $('#'+'select_car').val()+'';
            console.log($('#'+'select_car').val()+'');

            this.interventionPost.imei =$('#'+'imei_1').val()+' '+$('#'+'imei_2').val()+' '+$('#'+'imei_3').val()+'';
            this.interventionPost.marque = $('#'+'marque').val()+'';
            this.interventionPost.model = $('#'+'model').val()+'';


            this.interventionPost.box_costumer = $('#'+'boitiers_client').val()+'';
            this.interventionPost.sim_costumer = $('#'+'sim_client').val()+'';


            this.interventionPost.imei_box = $('#'+'boitiers_opentech').val()+'';
            this.interventionPost.imei_sim = $('#'+'sim_opentech').val()+'';


            this.interventionPost.kilometrage = this.myformUpdate.value['kilometrage'] == ''? kilometrage:this.myformUpdate.value['kilometrage'];
            this.interventionPost.remarque = this.myformUpdate.value['remarque'] == ''? remarque:this.myformUpdate.value['remarque'];
            this.interventionPost.duration = this.myformUpdate.value['duration'] == ''? duration:this.myformUpdate.value['duration'];

            console.log(this.interventionPost);
            this.detailInterventionService.updateLine( this.interventionPost ).subscribe(
                vehiclePostconsole=>{
                    try {

                        this.addToast({title:'notifications Waiting your Intervention Line', msg:'Line updateted succesfully !!!', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                        //this.myform.reset();
                        setTimeout(() => {this.ngOnInit();}, 1000);

                    }catch (e) {

                        this.addToast({title:'notifications Waiting your Provider', msg:'something went wrong !!!', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
    }

    delete(intervention:Intervenant):void{

        this.addToast({title:'notifications Waiting your Detail', msg:'waiting please delete operating system '+ intervention.intervention_id, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.detailInterventionService.deleteDetail(intervention).subscribe(detailPostconsole=>{
            try {
                this.addToast({title:'notifications Waiting your detail Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                setTimeout(() => {this.ngOnInit();}, 1000);
            }catch (e) {
                console.log(e);
                this.addToast({title:'notifications Waiting your detail Intervention', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
    }

    pageChanged(pN: number): void {
        this.pageNumber = pN;
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

    opensm(content) {
        this.modalService.open(content, { }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `D2ismissed ${this.getDismissReason(reason)}`;
        });
    }

    resizepage(){ }

    vider_details(){
        this.Boitiers = [];
        this.cartesSim = [];
    }

    getBoitiers(val,forTarget,ValBox){
        let type = forTarget == 'update' ? val:$('#'+val).val();
        // if (forTarget == 'add'){
        //     if (type == 'r'){
        //         $('#'+'if_rotour').css('display','inline-block');
        //         $('#'+'type_update').css('width', '95%');
        //     }else{
        //         $('#'+'if_rotour').css('display','none');
        //         $('#'+'type_update').css('width', '100%');
        //     }
        // }
        this.intervention = this.route.snapshot.paramMap.get('id');
        this.interventionPost=  new Intervenant();
        this.interventionPost.categorie =1;
        this.interventionPost.intervention =this.intervention;
        this.interventionPost.type = type+'';

        this.detailInterventionService.getProducts( this.interventionPost ).subscribe(
            vehiclePostconsole=>{
                try {
                    this.Boitiers = vehiclePostconsole;
                }catch (e) {
                    console.log(e);
                }
            }
        );
        if(forTarget == 'update'){
            setTimeout(() => {this.after_reload_box(ValBox);}, 1000);
        }
    }


    after_reload_sim(Val){
        $('#'+'sim_opentech').val(Val);
    }

    after_reload_box(Val){
        $('#'+'boitiers_opentech').val(Val);
    }


    getCartesSim(val,forTarget,ValSim){
        let type = forTarget == 'update' ? val:$('#'+val).val();
        this.intervention = this.route.snapshot.paramMap.get('id');
        this.interventionPost=  new Intervenant();
        this.interventionPost.categorie =2;
        this.interventionPost.intervention =this.intervention;
        this.interventionPost.type = type+'';

        this.detailInterventionService.getProducts( this.interventionPost ).subscribe(
            vehiclePostconsole=>{
                try {
                    this.cartesSim = vehiclePostconsole;
                }catch (e) {
                    console.log(e);
                }
            }
        );
        if(forTarget == 'update') {
            setTimeout(() => {
                this.after_reload_sim(ValSim);
            }, 1000);
        }
    }


    getDetail(id){
        if (this.myform.valid) {
            this.interventionPost=  new Intervenant();
            this.interventionPost.id_intervention =id;

            this.detailInterventionService.getDetail( this.interventionPost ).subscribe(
                detailPostconsole=>{
                    try {
                        this.detail = detailPostconsole;
                        console.log(detailPostconsole);
                    }catch (e) {
                        console.log(e);
                    }
                }
            );
        }
    }

    getVehiculs(intervention){
        if (this.myform.valid) {
            this.interventionPost=  new Intervenant();
            this.interventionPost.id_intervention =intervention;

            this.detailInterventionService.getVehiculs( this.interventionPost ).subscribe(
                detailPostconsole=>{
                    try {
                        this.vehicule = detailPostconsole;
                    }catch (e) {
                        console.log(e);
                    }
                }
            );
        }
    }


    count_boitiers: number = 0;
    display_boitiers(){

        if(this.count_boitiers % 2 == 0){
            $('#'+'boitiers_client').css('display','inline-block');
            $('#'+'boitiers_opentech').css('display','none');
            $('#'+'boitiers_opentech').val('');
           // $('#'+'').val();
            $('#'+'boitiers_add').removeClass();
            $('#'+'boitiers_add').addClass('fas fa-times');
        }
        else{
            $('#'+'boitiers_client').css('display','none');
            $('#'+'boitiers_opentech').css('display','inline-block');
            $('#'+'boitiers_add').removeClass();
            $('#'+'boitiers_client').val('');
           // $('#'+'boitiers_opentech').val();
            $('#'+'boitiers_add').addClass('fas fa-plus');
            $('#'+'boitiers_client').val('');
        }
        this.count_boitiers++;
    }


    count_sim: number = 0;
    display_Sim(){

        if(this.count_sim % 2 == 0){
            $('#'+'sim_client').css('display','inline-block');
            $('#'+'sim_opentech').css('display','none');
            $('#'+'sim_opentech').val('');
            $('#'+'sim_add').removeClass();
            $('#'+'sim_add').addClass('fas fa-times');
        }
        else{
            $('#'+'sim_client').css('display','none');
            $('#'+'sim_opentech').css('display','inline-block');
            $('#'+'sim_client').val('');
            $('#'+'sim_add').removeClass();
            $('#'+'sim_add').addClass('fas fa-plus');
        }
        this.count_sim++;
    }


    count_car: number = 0;
    display_Car(){

        if(this.count_car % 2 == 0){
            $('#'+'imei_1').css('display','inline-block');
            $('#'+'imei_2').css('display','inline-block');
            $('#'+'imei_3').css('display','inline-block');
            $('#'+'marque').css('display','inline-block');
            $('#'+'model').css('display','inline-block');
            $('#'+'select_car').css('display','none');
            $('#'+'select_car').val('');
            $('#'+'add_car').removeClass();
            $('#'+'add_car').addClass('fas fa-times');
            this.count_car++;
        }
        else{
            $('#'+'imei_1').css('display' ,'none');
            $('#'+'imei_2').css('display','none');
            $('#'+'imei_3').css('display','none');
            $('#'+'marque').css('display','none');
            $('#'+'model').css('display','none');
            $('#'+'imei_1').val('');
            $('#'+'imei_2').val('');
            $('#'+'imei_3').val('');
            $('#'+'marque').val('');
            $('#'+'model').val('');
            $('#'+'select_car').css('display','inline-block');
            $('#'+'add_car').removeClass();
            $('#'+'add_car').addClass('fas fa-plus');
            this.count_car++;
        }
    }


    count_car_new: number = 0;
    display_Car_add(){

        if(this.count_car_new % 2 == 0){
            $('#'+'imei_1_new').css('display','inline-block');
            $('#'+'imei_2_new').css('display','inline-block');
            $('#'+'imei_3_new').css('display','inline-block');
            $('#'+'marque_new').css('display','inline-block');
            $('#'+'model_new').css('display','inline-block');
            $('#'+'imei_car').css('display','none');
            $('#'+'imei_car').val('');
            $('#'+'add_new_car').removeClass();
            $('#'+'add_new_car').addClass('fas fa-times');
        }
        else{
            $('#'+'imei_1_new').css('display','none');
            $('#'+'imei_2_new').css('display','none');
            $('#'+'imei_3_new').css('display','none');
            $('#'+'marque_new').css('display','none');
            $('#'+'model_new').css('display','none');
            $('#'+'imei_car').css('display','inline-block');
            $('#'+'imei_1_new').val('');
            $('#'+'imei_2_new').val('');
            $('#'+'imei_3_new').val('');
            $('#'+'marque_new').val('');
            $('#'+'model_new').val('');
            $('#'+'add_new_car').removeClass();
            $('#'+'add_new_car').addClass('fas fa-plus');
        }
        this.count_car_new++;
    }


    count_sim_new: number = 0;
    display_Sim_add(){

        if(this.count_sim_new % 2 == 0){
            $('#'+'sim_client_new').css('display','inline-block');
            $('#'+'sim_open_new').css('display','none');
            $('#'+'sim_open_new').val('');
            $('#'+'add_sim_new').removeClass();
            $('#'+'add_sim_new').addClass('fas fa-times');
        }
        else{
            $('#'+'sim_client_new').css('display','none');
            $('#'+'sim_open_new').css('display','inline-block');
            $('#'+'sim_client_new').val('');
            $('#'+'add_sim_new').removeClass();
            $('#'+'add_sim_new').addClass('fas fa-plus');
        }
        this.count_sim_new++;
    }


    count_box_new: number = 0;
    display_box_add(){

        if(this.count_box_new % 2 == 0){
            $('#'+'boitier_client_new').css('display', 'inline-block');
            $('#'+'boitier_open_new').css('display','none');
            $('#'+'boitier_open_new').val('');
            $('#'+'add_boitier_new').removeClass();
            $('#'+'add_boitier_new').addClass('fas fa-times');
            this.count_box_new++;
        }
        else{
            $('#'+'boitier_client_new').css('display','none');
            $('#'+'boitier_open_new').css('display','inline-block');
            $('#'+'boitier_client_new').val('');
            $('#'+'add_boitier_new').removeClass();
            $('#'+'add_boitier_new').addClass('fas fa-plus');
            this.count_box_new++;
        }
    }


    displayBoitierOnLoad(post_imeiBox){
        this.count_car = 0;
        this.count_boitiers = 0;
        if(post_imeiBox == "0" || post_imeiBox == null) {
            this.display_boitiers();
        }
    }

    displaySimOnLoad(post_imeiCarte){
        this.count_sim = 0;
        if(post_imeiCarte == "0" || post_imeiCarte == null) {
            this.display_Sim();
        }
    }

}
