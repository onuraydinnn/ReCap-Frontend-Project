import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = "https://localhost:44347/api/Customers/";

  constructor(private httpClient:HttpClient) { }

  getCustomers(): Observable<ListResponseModel<Customer>> {
    let newPath:string = this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
