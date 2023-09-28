import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  paymentForm:FormGroup;

  constructor(private paymentService:PaymentService,
    private toastrService:ToastrService,
    private router: Router,
    private formBuilder:FormBuilder){}

  getResponse:boolean = false;
  months: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
  years: number[] = Array.from({ length: 31 }, (_, index) => 2020 + index);

  ngOnInit(): void {
    this.createPaymentForm() 
    
  }

 
  createPaymentForm(){
    this.paymentForm=this.formBuilder.group({
      fullName:["", Validators.required],
      cardNumber:["", Validators.required],
      month:["", Validators.required],
      year:["", Validators.required],
      cvv:["", Validators.required]
    })}
  
    pay(){
      if(this.paymentForm.valid){
        let paymentModel = Object.assign({},this.paymentForm.value);
        this.paymentService.pay(paymentModel).subscribe(response=>{
          this.toastrService.success("Araç kiralandı, ana sayfaya gidiliyor", "Success");
          this.processPaymentResponse();
          this.getResponse=true; //To make button invisable
        },responseError=>{
          if(responseError.error.Errors.length>0){
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası");
            }
          }
        })
      }
      else{
        this.toastrService.error("Formunuz eksik", "Error");
      }
    }

  processPaymentResponse(){
      setTimeout(() => {
        this.router.navigate([""]);
      }, 3000);
  }


}
