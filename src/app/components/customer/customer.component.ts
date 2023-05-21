import { Component } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  constructor(private customerService: CustomerService) {}

  customers: Customer[] = [];
  dataLoaded:boolean = false;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.customerService.getProducts().subscribe(response=>{
      this.customers=response.data;
      this.dataLoaded=true;
    })
  }
}
