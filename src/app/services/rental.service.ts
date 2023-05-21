import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RentalResponseModel } from '../models/rentalResponseModel';
import { RentalDetailResponseModel } from '../models/rentalDetailResponseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44347/api/Rentals/getall";
  apiUrlRentalDetails = "https://localhost:44347/api/Rentals/getrentaldetails";

  constructor(private httpClient:HttpClient) { }

  getProducts(): Observable<RentalResponseModel> {
    return this.httpClient.get<RentalResponseModel>(this.apiUrl);
  }

  getRentalDetails(): Observable<RentalDetailResponseModel> {
    return this.httpClient.get<RentalDetailResponseModel>(this.apiUrlRentalDetails);
  }

}
