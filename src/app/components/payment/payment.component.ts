import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(private paymentService:PaymentService,
    private toastrService:ToastrService,
    private router: Router){}

  getResponse:boolean = false;
  paymentForm:Payment={id:0,fullName:"",cardNumber:"",cvv:"",month:0,year:0};
  months: number[] = Array.from({ length: 12 }, (_, index) => index + 1);
  years: number[] = Array.from({ length: 31 }, (_, index) => 2020 + index);

  ngOnInit(): void {
    
    
    
  }

 
  
  checkPayment(){
    this.paymentService.checkPayment(this.paymentForm).subscribe((response) => {
      this.getResponse = response.success;
      this.processPaymentResponse();
    });
  }

  control(){
    if(this.paymentForm.fullName==""){
      this.toastrService.error("Adınızı giriniz","Error")
    }
    else if(this.paymentForm.cardNumber.length!=16){
      this.toastrService.error("Kart numaranız 16 haneli olmalı","Error")
    }
    else if(this.paymentForm.month==0){
      this.toastrService.error("Ay giriniz","Error")
    }
    else if(this.paymentForm.year==0){
      this.toastrService.error("Yıl giriniz","Error")
    }
    else if(this.paymentForm.cvv==""){
      this.toastrService.error("Güvenlik numarasını giriniz","Error")
    }
    else{
      this.checkPayment()
    }
  }

  processPaymentResponse(){
    if (this.getResponse) {
      this.toastrService.success("Araç kiralandı, ana sayfaya gidiliyor", "Success");
      setTimeout(() => {
        this.router.navigate([""]);
      }, 3000);
    } else {
      this.toastrService.error("Hatalı giriş", "Error");
    }
  }


}
