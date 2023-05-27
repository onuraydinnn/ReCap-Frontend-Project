import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44347/api/Rentals/";
  

  constructor(private httpClient:HttpClient) { }


  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath:string = this.apiUrl+"getrentaldetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalByCarId(): Observable<Rental> {
    let newPath:string = this.apiUrl+"getbycarid";
    return this.httpClient.get<Rental>(newPath);
  }

}
