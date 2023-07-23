import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = "https://localhost:44347/api/Payments/";
  
  constructor(private httpClient:HttpClient) { }


  checkPayment(payment:Payment): Observable<ResponseModel> {
    let newPath:string = this.apiUrl+"pay";
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }

}
