import { Component, OnInit } from '@angular/core';
import { VehiculeModule } from "./vehicule.module";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {ToastData, ToastOptions, ToastyService} from "ng2-toasty";
import { VehiculeService } from "./vehicule.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Vehicule} from "./vehicule";
import {Costumer} from "../costumer/Costumer";
import {Observable} from "rxjs/Observable";
import {Provider} from "../provider/Provider";

declare const $: any;

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.scss']
})
export class VehiculeComponent implements OnInit {


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

    vehiculeData:any;
    vehicule: Vehicule[];
    vehiculePost : Vehicule;
    costumers:Costumer[];


    closeResult: string;
    myform: FormGroup;
    myformUpdate: FormGroup;

    id: FormControl;
    imei:FormControl;
    marque:FormControl;
    model:FormControl;
    costumer_id:FormControl;
    user_id:FormControl;

  constructor(private vehiculeService: VehiculeService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) { }

    getCostumers(): void {
        this.vehiculeService.getCostumers()
            .subscribe(costumers => this.costumers = costumers);
    }

    createFormUpdate() {
        this.myformUpdate = new FormGroup({
            id:this.id,
            imei:this.imei,
            marque:this.marque,
            model:this.model,
            costumer_id:this.costumer_id
        });
    }

    createFormControlsUpdate() {
        this.id = new FormControl('');
        this.imei = new FormControl('');
        this.marque = new FormControl('');
        this.model = new FormControl('');
        this.costumer_id = new FormControl('');

    }

    ngOnInit() {

        this.createFormControls();
        this.createForm();
        this.createFormControlsUpdate();
        this.createFormUpdate();

        this.getVehicles();

           this.getCostumers();
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

    pageChanged(pN: number): void {

        this.pageNumber = pN;
    }


    createFormControls() {
        this.id = new FormControl('');
        this.imei = new FormControl('');
        this.marque = new FormControl('');
        this.model = new FormControl('');
        this.costumer_id = new FormControl('');
        this.user_id = new FormControl('');
    }

    createForm() {
        this.myform = new FormGroup({
            id:this.id,
            imei:this.imei,
            marque:this.marque,
            model:this.model,
            costumer_id:this.costumer_id,
            user_id:this.user_id
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


    onUpdate(id,imei,marque,model,costumer_id){

        if (this.myformUpdate.valid) {
            this.addToast({title:'Please Waiting your Vehicle', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.vehiculePost=  new Vehicule();
            this.vehiculePost.id = id;
            this.vehiculePost.imei = this.myformUpdate.value['imei'] ? this.myformUpdate.value['imei']:imei;
            this.vehiculePost.marque= this.myformUpdate.value['marque'] ? this.myformUpdate.value['marque']:marque;
            this.vehiculePost.model = this.myformUpdate.value['model'] ? this.myformUpdate.value['model']:model;
            this.vehiculePost.costumer_id = this.myformUpdate.value['costumer_id'] ? this.myformUpdate.value['costumer_id']:costumer_id;
            this.vehiculeService.updateVehicle( this.vehiculePost ).subscribe(vehiclePostconsole=>{
                    try {

                            this.addToast({title:'notifications Waiting your Provider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            //this.myform.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);

                    }catch (e) {

                        this.addToast({title:'notifications Waiting your Provider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
    }

    onSubmit() {
        if (this.myform.valid) {
            this.addToast({title:'Please Waiting your Provider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
            this.vehiculePost=  new Vehicule();
            this.vehiculePost.imei = this.myform.value['imei'];
            this.vehiculePost.marque = this.myform.value['marque'];
            this.vehiculePost.model = this.myform.value['model'];
            this.vehiculePost.costumer_id = this.myform.value['costumer_id'];
            this.vehiculePost.user_id = 1;
            console.log(this.vehiculePost.user_id);


            this.vehiculeService.addVehicule( this.vehiculePost ).subscribe(vehiclePostconsole=>{
                    try {

                            this.addToast({title:'notifications Waiting your Vehicule', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
                            this.myform.reset();
                            setTimeout(() => {this.ngOnInit();}, 1000);
                        console.log(this.vehiculePost.imei);
                    }catch (e) {

                        console.log(e);
                        this.addToast({title:'notifications Waiting your Vehicule', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
                    }
                }
            );
        }
    }


    getVehicles():void{
        this.vehiculeService.getVehicles().subscribe(vehicle => this.vehiculeData=vehicle);
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




    delete(vehicule:Vehicule):void{

        this.addToast({title:'notifications Waiting your Provider', msg:'waiting please delete operating system '+ vehicule.id, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
        this.vehiculeService.deleteVehicule(vehicule).subscribe(vehiculePostconsole=>{

            try {

              //  if(typeof vehiculePostconsole.name=='undefined'){
                    this.addToast({title:'notifications Waiting your Provider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
                    //this.myform.reset();
                    setTimeout(() => {this.ngOnInit();}, 1000);

                //}

            }catch (e) {

                console.log(e);
                this.addToast({title:'notifications Waiting your Provider', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
            }
        });
        setTimeout(() => {this.ngOnInit();}, 1000);
    }

}
