///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild, ɵEMPTY_ARRAY} from '@angular/core';
import {Costumer} from "./costumer";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import {CostumerService} from "./costumer.service";
import {ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {ToastyService, ToastOptions, ToastData} from 'ng2-toasty';


declare const $: any;

@Component({
  selector: 'app-costumer',
  templateUrl: './costumer.component.html',
  styleUrls: ['./costumer.component.scss']
})
export class CostumerComponent {


  /* pagination Info */
  pageSize = 5;
  pageNumber = 1;

  costumerData:any;
  costumer: Costumer[];
  costumerPost : Costumer;

  title = 'app';
  position = 'bottom-right';
  msg: string;
  showClose = true;
  res :any;
  timeout = 5000;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  myform: FormGroup;
  myformUpdate: FormGroup;

  id:FormControl;
  name:FormControl;
  contact:FormControl;
  types:FormControl;
  phone_number:FormControl;
  mail:FormControl;
  city:FormControl;
  departement:FormControl;
  address:FormControl;


  rowData: any;
  rowDatas: Observable<any>;

  closeResult: string;


  constructor(private costumerService: CostumerService,private http: HttpClient,private modalService: NgbModal,private toastyService: ToastyService) {

  }


  resizepage(){

    this.pageSize= this.costumerData.length;

  }

  ngOnInit() {

    this.getCostumer();
    this.createFormControls();
    this.createForm();
    this.createFormControlsUpdate();
    this.createFormUpdate();

    $('.table-filters input').on('input', function () {


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

  getCostumer():void{
    this.costumerService.getCostumer().subscribe(costumer => this.costumerData=costumer);

    console.log(this.costumerData);
  }



  pageChanged(pN: number): void {

    this.pageNumber = pN;
  }




  createFormControls() {
    this.name = new FormControl('');
    this.contact = new FormControl('');
    this.types = new FormControl('');
    this.phone_number = new FormControl('');
    this.mail = new FormControl('');
    this.city = new FormControl('');
    this.departement = new FormControl('');
    this.address = new FormControl('');


  }
  createFormControlsUpdate() {
    this.id = new FormControl('');
    this.name = new FormControl('');
    this.contact = new FormControl('');
    this.types = new FormControl('');
    this.phone_number = new FormControl('');
    this.mail = new FormControl('');
    this.city = new FormControl('');
    this.departement = new FormControl('');
    this.address = new FormControl('');

  }


  createForm() {
    this.myform = new FormGroup({
      name:this.name,
      contact:this.contact,
      types:this.types,
      phone_number:this.phone_number,
      mail:this.mail,
      city:this.city,
      departement:this.departement,
      address:this.address,
    });
  }


  createFormUpdate() {
    this.myformUpdate = new FormGroup({
      id:this.id,
      name:this.name,
      contact:this.contact,
      types:this.types,
      phone_number:this.phone_number,
      mail:this.mail,
      city:this.city,
      departement:this.departement,
      address:this.address,
    });
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



  onSubmit() {
    if (this.myform.valid) {
      this.addToast({title:'Please Waiting your Customer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
      this.costumerPost=  new Costumer();
      this.costumerPost.name = this.myform.value['name'];
      this.costumerPost.contact = this.myform.value['contact'];
      this.costumerPost.types = this.myform.value['types'];
      this.costumerPost.phone_number = this.myform.value['phone_number'];
      this.costumerPost.mail =this.myform.value['mail'];
      this.costumerPost.city = this.myform.value['city'];
      this.costumerPost.departement = this.myform.value['departement'];
      this.costumerPost.address=this.myform.value['address'];

      this.costumerService.addCostumer( this.costumerPost ).subscribe(costumerPostconsole=>{
          try {
            if(typeof costumerPostconsole.name!='undefined'){

              this.addToast({title:'notifications Waiting your Customer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
              this.myform.reset();
              setTimeout(() => {this.ngOnInit();}, 1000);
            }

          }catch (e) {

            console.log(e);
            this.addToast({title:'notifications Waiting your Customer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
          }







        }
      );



    }
  }


  onUpdate(id,name,contact,types,phone_number,mail,city,departement,address){

    if (this.myformUpdate.valid) {
      this.addToast({title:'Please Waiting your Customer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout:1000, theme:'bootstrap', position:'top-right', type:'wait'});
      this.costumerPost=  new Costumer();
      this.costumerPost.id = id;
      this.costumerPost.name = this.myformUpdate.value['name'] ? this.myformUpdate.value['name']:name;
      this.costumerPost.contact = this.myformUpdate.value['contact'] ? this.myformUpdate.value['contact']:contact;
      this.costumerPost.types = this.myformUpdate.value['types'] ? this.myformUpdate.value['types']:types;
      this.costumerPost.phone_number = this.myformUpdate.value['phone_number'] ? this.myformUpdate.value['phone_number']:phone_number;
      this.costumerPost.mail = this.myformUpdate.value['mail'] ? this.myformUpdate.value['mail']:mail;
      this.costumerPost.city = this.myformUpdate.value['city'] ? this.myformUpdate.value['city']:city;
      this.costumerPost.departement = this.myformUpdate.value['departement'] ? this.myformUpdate.value['departement']:departement;
      this.costumerPost.address = this.myformUpdate.value['address'] ? this.myformUpdate.value['address']:address;

      this.costumerService.updateCostumer( this.costumerPost ).subscribe(costumerPostconsole=>{
          try {
            console.log(costumerPostconsole.name);
            if(typeof costumerPostconsole.name=='undefined'){
              this.addToast({title:'notifications Waiting your Customer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'success'});
              this.myform.reset();
              setTimeout(() => {this.ngOnInit();}, 1000);
            }
          }catch (e) {

            this.addToast({title:'notifications Waiting your Customer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 6000, theme:'bootstrap', position:'top-right', type:'error'});
          }







        }
      );

    }


  }
  delete(costumer:Costumer):void{

    this.addToast({title:'notifications Waiting your Customer', msg:'waiting please delete operating system '+ costumer.name, timeout: 2000, theme:'bootstrap', position:'top-right', type:'wait'});
    this.costumerService.deleteCostumer(costumer).subscribe(costumerPostconsole=>{

      try {

        if(typeof costumerPostconsole.name=='undefined'){
          this.addToast({title:'notifications Waiting your Customer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'success'});
          this.myform.reset();
          setTimeout(() => {this.ngOnInit();}, 1000);

        }

      }catch (e) {

        console.log(e);
        this.addToast({title:'notifications Waiting your Customer', msg:'Turning standard Bootstrap alerts into awesome notifications', timeout: 2000, theme:'bootstrap', position:'top-right', type:'error'});
      }
    });
    setTimeout(() => {this.ngOnInit();}, 1000);
  }






}
